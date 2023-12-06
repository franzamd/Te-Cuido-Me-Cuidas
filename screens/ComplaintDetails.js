import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native';

import { deliverToInstance, deleteComplaint } from '../stores/complaintActions';
import { listUsersWithRoleInstance } from '../stores/userActions';
import { IconButton, ComplaintValue, LineDivider, ComplaintTextArea, TextButton, FormInputArea, FormSelect } from '../components';
import { SIZES, FONTS, COLORS, icons, constants, config } from '../constants';

const { USER_ROLE_INTERMEDIARY, USER_ROLE_DEFAULT } = config

const ComplaintDetails = ({
  appTheme,
  navigation,
  route,
  userLogin,
  deliverToInstance,
  complaint,
  listUsersWithRoleInstance,
  user: userStore,
  deleteComplaint
}) => {
  const { complaintSelected } = route.params
  const { userInfo } = userLogin
  const { errors, loading: loadingComplaint, updateSuccess, deleteSuccess } = complaint
  const { users, loading: loadingUser } = userStore

  // Form input
  const [status, setStatus] = useState('0');
  const [openStatus, setOpenStatus] = useState(false);
  const [user, setUser] = useState('0');
  const [openUser, setOpenUser] = useState(false);
  const [userOptionsList, setUserOptionsList] = useState([
    {
      value: '0',
      label: 'Seleccionar',
    }
  ])
  const [description, setDescription] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
      listUsersWithRoleInstance()
    }

  }, [userInfo])

  // Toast success
  useEffect(() => {
    if (updateSuccess && isFocused) {
      navigation.goBack()
    }
  }, [updateSuccess, isFocused])

  // Toast delete success
  useEffect(() => {
    if (deleteSuccess && isFocused) {
      navigation.goBack()
    }
  }, [isFocused, deleteSuccess])

  // Load users options list
  useEffect(() => {
    if (!loadingUser && users) {
      const items = users.map((item) => ({
        _id: item._id,
        value: item._id,
        label: item.profile ? `${item.profile.institutionName} | Municipio ${item.profile.municipality.name}` : '-'
      }));
      setUserOptionsList([
        {
          _id: '0',
          value: '0',
          label: 'Seleccionar'
        },
        ...items
      ]);
    }
  }, [loadingUser, users]);

  function handleChangeStatus(value) {
    // reset user selected
    setUser('0')
  }

  async function handleGPSLocation() {
    let url = `https://www.google.com/maps/search/?api=1&query=${complaintSelected.location.latitude},${complaintSelected.location.longitude}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }

  async function handleWhatsApp() {
    const codeCountry = complaintSelected.user?.profile?.phone?.codeCountry || ''
    const number = complaintSelected.user?.profile?.phone?.value || ''

    let url = `https://wa.me/${codeCountry}${number}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }


  function isEnableSend() {
    return status !== '0' && (user !== '0' || status === 'Rechazado')
  }

  function handleSentToDeliver() {
    Alert.alert(
      constants.alertMsg.title,
      '¿Estás seguro de guardar los datos de la denuncia y enviar a Instancia?',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Enviar',
          onPress: () => onSubmit()
        },
      ]
    );
  }

  function handleDeleteComplaint() {
    Alert.alert(
      constants.alertMsg.title,
      '¿Estás seguro de eliminar la denuncia de forma permanente?',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => deleteComplaint(complaintSelected._id)
        },
      ]
    );
  }

  async function onSubmit() {
    // hide open list display form
    setOpenStatus(false)
    const formData = {
      status,
      user: user !== '0' ? user : '',
      description
    }
    await deliverToInstance(complaintSelected._id, formData)
  }


  // Render
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <IconButton
            icon={icons.back}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
            containerStyle={{
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}
          />

          {/* Title */}
          <Text
            style={{
              ...FONTS.h1,
              marginLeft: SIZES.radius,
              color: appTheme?.textColor,
            }}
          >
            Información de la Denuncia
          </Text>
        </View>
      </View>
    );
  }

  function renderComplaintInformation() {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        {/* Subtitle */}
        <Text
          style={{
            color: COLORS.primary2, // appTheme?.textColor
            ...FONTS.body3,
          }}
        >
          Acción de la Víctima
        </Text>

        <View style={styles.profileSectionContainer}>
          {/* Code */}
          <ComplaintValue
            label="Código"
            value={complaintSelected.uid}
          />
          <LineDivider />

          {/* Date */}
          <ComplaintValue
            label="Fecha"
            value={moment(complaintSelected.createdAt).format('DD/MM/YYYY, HH:mm a').toString()}
          />
          <LineDivider />

          {/* Type */}
          <ComplaintValue
            label="Tipo de Violencia"
            value={complaintSelected.type}
          />
          <LineDivider />

          {/* Complaint Assisted */}
          <ComplaintValue
            label="Denuncia Asistida"
            value={complaintSelected.assistedPerson || '-'}
          />
          <LineDivider />

          {/* Protection Mechanism */}
          <ComplaintValue
            label="Mecanismo de Protección"
            value={complaintSelected.protectionMechanism}
          />
          <LineDivider />

          {/* Community */}
          <ComplaintValue
            label="Comunidad"
            value={complaintSelected.community?.name || '-'}
          />
          <LineDivider />

          {/* Establishment */}
          <ComplaintValue
            label="Unidad Educativa"
            value={complaintSelected.establishment?.name || ''}
          />
          <LineDivider />

          {/* Type Sent */}
          <ComplaintValue
            label="Tipo de Envío de Denuncia"
            value={complaintSelected.methodSent}
          />
          <LineDivider />

          {/* Location */}
          {complaintSelected.location && (
            <React.Fragment>
              <ComplaintValue
                label="Localización"
                value={'Ver ubicación en Mapa'}
                enableOnPress={true}
                icon={icons.near_me}
                onPress={handleGPSLocation}
              />
              <LineDivider />
            </React.Fragment>
          )}

          {/* Status User Action */}
          <ComplaintValue
            label="Estado de derivación"
            value={complaintSelected.statusUserAction}
          />
          <LineDivider />

          {/* Status */}
          <ComplaintValue
            label="Estado de la Denuncia"
            value={complaintSelected.status}
            textStyle={{
              color: complaintSelected.status === constants.statusComplaint.success ? COLORS.secondary3
                : complaintSelected.status === constants.statusComplaint.inProgress ? COLORS.primary3
                  : COLORS.primary,
            }}
          />
          <LineDivider />

          {/* Department */}
          <ComplaintValue
            label="Departamento"
            value={complaintSelected.department?.name || '-'}
          />
          <LineDivider />

          {/* Municipality */}
          <ComplaintValue
            label="Municipio"
            value={complaintSelected.municipality?.name || '-'}
          />
          <LineDivider />

          {/* Description */}
          <ComplaintTextArea
            label="Descripción"
            value={complaintSelected.description}
          />
          <LineDivider />

          {/* User */}
          <ComplaintValue
            label="Víctima"
            value={
              complaintSelected.isComplaintAssisted
                ? complaintSelected.assistedPerson
                : `${complaintSelected.user?.profile?.name} ${complaintSelected.user?.profile?.lastName}`
            }
          />
          <LineDivider />

          {/* Phone */}
          <ComplaintValue
            label="Nº Celular"
            value={`${complaintSelected.user?.profile?.phone?.codeCountry}${complaintSelected.user?.profile?.phone?.value}`}
            enableOnPress={true}
            icon={icons.whatsapp}
            onPress={handleWhatsApp}
          />
          <LineDivider />

          {/* Email */}
          <ComplaintValue
            label="Email"
            value={complaintSelected.user?.email}
          />
          <LineDivider />

          {/* isAssisted */}
          <ComplaintValue
            label="Es Denuncia Asistida"
            value={complaintSelected.isComplaintAssisted ? 'Si' : 'No'}
          />
          <LineDivider />

          {/* assistedPerson */}
          {complaintSelected.isComplaintAssisted && (
            <ComplaintValue
              label="Denuncia Asistida por"
              value={`${complaintSelected.user?.profile?.name} ${complaintSelected.user?.profile?.lastName}`}
            />
          )}
        </View>
      </View>
    );
  }

  function renderComplaintIntermediaryInfo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        {/* Subtitle */}
        <Text
          style={{
            color: COLORS.primary2, // appTheme?.textColor
            ...FONTS.body3,
          }}
        >
          Acción del Intermediario
        </Text>

        <View style={styles.profileSectionContainer}>
          {/* Date */}
          <ComplaintValue
            label="Fecha de Acción"
            value={
              complaintSelected.intermediaryAction?.actionDate
                ? moment(complaintSelected.intermediaryAction?.actionDate).format('DD/MM/YYYY, HH:mm a').toString()
                : '-'
            }
          />
          <LineDivider />

          {/* Status */}
          <ComplaintValue
            label="Estado"
            value={complaintSelected.intermediaryAction?.status || '-'}
            textStyle={{
              color: complaintSelected.intermediaryAction?.status === constants.statusComplaint.success ? COLORS.secondary3
                : complaintSelected.intermediaryAction?.status === constants.statusComplaint.inProgress ? COLORS.primary3
                  : complaintSelected.intermediaryAction?.status === constants.statusComplaint.rejected
                    ? COLORS.primary : appTheme?.textColor,
            }}
          />
          <LineDivider />

          {/* Description */}
          <ComplaintTextArea
            label="Descripción"
            value={complaintSelected.intermediaryAction?.description || '-'}
          />
          <LineDivider />

          {/* User */}
          <ComplaintValue
            label="Usuario"
            value={
              complaintSelected.intermediaryAction?.user?.profile
                ? `${complaintSelected.intermediaryAction.user.profile.name} ${complaintSelected.intermediaryAction.user.profile.lastName}`
                : '-'}
          />
          <LineDivider />

          {/* User */}
          <ComplaintValue
            label="Instancia Enviado"
            value={complaintSelected.intermediaryAction?.sentToUser?.profile?.institutionName || '-'}
          />
        </View>
      </View>
    );
  }

  function renderComplaintInstanceInfo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        {/* Subtitle */}
        <Text
          style={{
            color: COLORS.primary2, // appTheme?.textColor
            ...FONTS.body3,
          }}
        >
          Acción de la Instancia
        </Text>

        <View style={styles.profileSectionContainer}>
          {/* Date */}
          <ComplaintValue
            label="Fecha de Acción"
            value={
              complaintSelected.instanceAction?.actionDate
                ? moment(complaintSelected.instanceAction?.actionDate).format('DD/MM/YYYY, HH:mm a').toString()
                : '-'
            }
          />
          <LineDivider />

          {/* Status */}
          <ComplaintValue
            label="Estado"
            value={complaintSelected.instanceAction?.status || '-'}
            textStyle={{
              color: complaintSelected.instanceAction?.status === constants.statusComplaint.success ? COLORS.secondary3
                : complaintSelected.instanceAction?.status === constants.statusComplaint.inProgress ? COLORS.primary3
                  : complaintSelected.instanceAction?.status === constants.statusComplaint.rejected
                    ? COLORS.primary : appTheme?.textColor,
            }}
          />
          <LineDivider />

          {/* Description */}
          <ComplaintTextArea
            label="Descripción"
            value={complaintSelected.instanceAction?.description || '-'}
          />
          <LineDivider />

          {/* User */}
          <ComplaintValue
            label="Instutición"
            value={complaintSelected.instanceAction?.user?.profile?.institutionName || '-'}
          />
        </View>
      </View>
    );
  }

  function renderBtnDeliverToInstance() {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        <Text
          style={{
            marginTop: SIZES.radius,
            color: appTheme?.textColor,
            ...FONTS.body3,
          }}
        >
          Deriva la denuncia a Instancia
        </Text>

        {/* Status */}
        <FormSelect
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Estado"
          errorMsg={errors?.status}
          open={openStatus}
          value={status}
          items={constants.statusOptionsList}
          setOpen={setOpenStatus}
          setValue={setStatus}
          zIndex={3000}
          onChangeValue={value => handleChangeStatus(value)}
          zIndexInverse={3000}
        />

        {/* Status */}
        <FormSelect
          disabled={status === 'Rechazado'}
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Instancia"
          errorMsg={errors?.user}
          open={openUser}
          value={user}
          items={userOptionsList}
          setOpen={setOpenUser}
          setValue={setUser}
          zIndex={2000}
          zIndexInverse={2000}
        />

        {/* Description */}
        <FormInputArea
          value={description}
          label="Descripción"
          onChange={(value) => setDescription(value)}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={errors?.description}
        />

        {/* Send Btn */}
        <TextButton
          label="Derivar a Instancia"
          disabled={loadingComplaint || (isEnableSend() ? false : true)}
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSend()
              ? COLORS.primary2
              : COLORS.transparentPrimary,
          }}
          labelStyle={{
            color: COLORS.white
          }}
          onPress={handleSentToDeliver}
        />
      </View>
    )
  }

  function renderBtnDeleteComplaint() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        {/* Subtitle */}
        <Text
          style={{
            marginTop: SIZES.radius,
            color: appTheme?.textColor,
            ...FONTS.body3,
          }}
        >
          Elimina la denuncia de forma permanente
        </Text>

        {/* Delete */}
        <TextButton
          label="Eliminar Denuncia"
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error
          }}
          labelStyle={{
            color: COLORS.white
          }}
          onPress={handleDeleteComplaint}
        />
      </View >
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1,
      }}
    >
      {/* Header */}
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150, // add for screen large
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Compliant information */}
        {renderComplaintInformation()}

        {/* Intermediary action information */}
        {renderComplaintIntermediaryInfo()}

        {/* Instance action information */}
        {renderComplaintInstanceInfo()}

        {/* Deliver to Instance */}
        {userInfo?.role === USER_ROLE_INTERMEDIARY && !complaintSelected.intermediaryAction.user && (
          renderBtnDeliverToInstance()
        )}

        {/* Delete Complaint if user created was user role intermediary */}
        {(
          (userInfo?.role === USER_ROLE_INTERMEDIARY && complaintSelected.user?._id.toString() === userInfo?._id.toString() && complaintSelected.statusUserAction === constants.statusUserAction.intermediary)
          || (userInfo?.role === USER_ROLE_DEFAULT && complaintSelected.intermediaryAction.status === constants.statusComplaint.inWaiting && complaintSelected.user?._id === userInfo?._id)
        ) && (
            renderBtnDeleteComplaint()
          )}

        {/* Error Message  */}
        {Boolean(errors?.error) && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'center'
            }}>
            <Text
              style={{
                color: COLORS.error,
                ...FONTS.body4
              }}>
              {errors?.error}
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10
  },
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
})

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
    complaint: state.complaint,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deliverToInstance: (complaintId, formData) => dispatch(deliverToInstance(complaintId, formData)),
    listUsersWithRoleInstance: () => dispatch(listUsersWithRoleInstance()),
    deleteComplaint: (id) => dispatch(deleteComplaint(id)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails)