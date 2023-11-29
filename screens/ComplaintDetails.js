import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import moment from 'moment'
import { USER_ROLE_INTERMEDIARY } from '@env';
import { useToast } from 'react-native-toast-notifications';
import { useIsFocused } from '@react-navigation/native';

import { deliverToInstance } from '../stores/complaintActions';
import { listUsersWithRoleInstance } from '../stores/userActions';
import { IconButton, ComplaintValue, LineDivider, ComplaintTextArea, TextButton, FormInputArea, FormSelect } from '../components';
import { SIZES, FONTS, COLORS, icons, constants } from '../constants';

const ComplaintDetails = ({
  appTheme,
  navigation,
  route,
  userLogin,
  deliverToInstance,
  complaint,
  listUsersWithRoleInstance,
  user: userStore
}) => {
  const { complaintSelected } = route.params
  const { userInfo } = userLogin
  const { errors, loading: loadingComplaint, updateSuccess } = complaint
  const { users, loading: loadingUser } = userStore

  // Form input
  const toast = useToast();
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
      toast.show('Denuncia actualizado exitosamente', {
        type: 'success',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
      navigation.goBack()
    }
  }, [updateSuccess, isFocused])

  // Toast error
  useEffect(() => {
    if (errors && isFocused) {
      toast.show('¡Ups! Algo salió mal', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [errors, isFocused])

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
          label: 'Seleccione una opción'
        },
        ...items
      ]);
    }
  }, [loadingUser, users]);

  function clearFormInput() {
    setStatus('0')
    setOpenStatus(false)
    setUser('0')
    setOpenUser(false)
    setDescription('')
    // Clear store
    // TODO: Complete clear store 
  }

  async function handleGPSLocation() {
    let url = `https://www.google.com/maps/search/?api=1&query=${complaintSelected.location.latitude},${complaintSelected.location.longitude}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }

  function isEnableSend() {
    return status !== '0' && user !== '0'
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

  async function onSubmit() {
    // hide open list display form
    setOpenStatus(false)
    const formData = {
      status,
      user,
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
            value={complaintSelected.typeSent}
          />
          <LineDivider />

          {/* Location */}
          <ComplaintValue
            label="Localización"
            value={'Ver ubicación en Mapa'}
            enableOnPress={true}
            icon={icons.near_me}
            onPress={handleGPSLocation}
          />
          <LineDivider />

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
            value={`${complaintSelected.user?.profile?.name} ${complaintSelected.user?.profile?.lastName}`}
          />
          <LineDivider />

          {/* Phone */}
          <ComplaintValue
            label="Nº Celular"
            value={`${complaintSelected.user?.profile?.phone?.codeCountry}${complaintSelected.user?.profile?.phone?.value}`}
          />
          <LineDivider />

          {/* Email */}
          <ComplaintValue
            label="Email"
            value={complaintSelected.user?.email}
          />
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
          Acción del Instancia
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
          zIndexInverse={3000}
        />

        {/* Status */}
        <FormSelect
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

        {/* Error Message */}
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
            color: appTheme?.name === 'dark' ? COLORS.black : COLORS.white,
          }}
          onPress={handleSentToDeliver}
        />
      </View>
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
    listUsersWithRoleInstance: () => dispatch(listUsersWithRoleInstance())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails)