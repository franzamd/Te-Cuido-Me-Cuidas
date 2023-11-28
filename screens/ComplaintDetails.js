import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import moment from 'moment'

import { IconButton, ComplaintValue, LineDivider, ComplaintTextArea } from '../components';
import { getComplaintDetails } from '../stores/complaintActions';
import { SIZES, FONTS, COLORS, icons, constants, dummyData, images } from '../constants';

const ComplaintDetails = ({
  appTheme,
  navigation,
  route,
}) => {
  const { complaintSelected } = route.params

  async function handleGPSLocation() {
    let url = `https://www.google.com/maps/search/?api=1&query=${complaintSelected.location.latitude},${complaintSelected.location.longitude}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
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
            color: appTheme.textColor,
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
            color: appTheme.textColor,
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
          {complaintSelected.intermediaryAction?.status ? (
            <ComplaintValue
              label="Estado"
              value={complaintSelected.intermediaryAction?.status || '-'}
              textStyle={{
                color: complaintSelected.intermediaryAction?.status === constants.statusComplaint.success ? COLORS.secondary3
                  : complaintSelected.intermediaryAction?.status === constants.statusComplaint.inProgress ? COLORS.primary3
                    : COLORS.primary,
              }}
            />
          ) : (
            <ComplaintValue
              label="Estado"
              value={'En espera'}
            />
          )}
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
            label="Instancia de Envío"
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
            color: appTheme.textColor,
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
          {complaintSelected.instanceAction?.status ? (
            <ComplaintValue
              label="Estado"
              value={complaintSelected.instanceAction?.status || '-'}
              textStyle={{
                color: complaintSelected.instanceAction?.status === constants.statusComplaint.success ? COLORS.secondary3
                  : complaintSelected.instanceAction?.status === constants.statusComplaint.inProgress ? COLORS.primary3
                    : COLORS.primary,
              }}
            />
          ) : (
            <ComplaintValue
              label="Estado"
              value={'En espera'}
            />
          )}
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

  console.log(complaintSelected.intermediaryAction);

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
    complaint: state.complaint,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails)