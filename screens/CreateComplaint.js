import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

import { createComplaint, COMPLAINT_CLEAR_ERROR } from '../stores/complaintActions';
import { MenuCard, FormSelect, FormInputArea, TextButton } from '../components';
import { SIZES, FONTS, COLORS, constants, images } from '../constants';

const CreateComplaint = ({
  appTheme,
  navigation,
  complaint,
  createComplaint,
  isFocusedComponent,
  isDisabledButtonsPress,
  setIsDisabledButtonsPress
}) => {
  // store
  const { errors, createSuccess } = complaint

  const dispatch = useDispatch();
  const [typeComplaint, setTypeComplaint] = useState('0');
  const [description, setDescription] = useState('');
  const [openTypeComplaint, setOpenTypeComplaint] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocusedComponent) {
      checkPermissionGPS()
    }
  }, [isFocusedComponent])

  // clear form
  useEffect(() => {
    if (createSuccess && isFocusedComponent && isFocused) {
      clearFormInput()
    }
  }, [createSuccess, isFocusedComponent, isFocused])

  // Toast error
  useEffect(() => {
    if (errors && isFocusedComponent && isFocused) {
      clearFormInput()
    }
  }, [errors, isFocusedComponent, isFocused])

  // Optional Waiting 10 seg for enable buttons
  // useEffect(() => {
  //   if (isDisabledButtonsPress) {
  //     (async () => {
  //       await new Promise(resolve => setTimeout(resolve, 10000));
  //       setIsDisabledButtonsPress(false)
  //     })()
  //   }
  // }, [isDisabledButtonsPress])

  const checkPermissionGPS = async () => {
    try {
      // Ask enable precise or approximate location
      Geolocation.requestAuthorization(
        success => { },
        error => { }
      )
    } catch (err) { }
  };

  function clearFormInput() {
    setTypeComplaint('0')
    setOpenTypeComplaint(false)
    setDescription('')
    dispatch({ type: COMPLAINT_CLEAR_ERROR })
    setIsDisabledButtonsPress(false)
  }

  function isEnableSend() {
    return typeComplaint !== '0'
  }

  async function onSubmit() {
    // hide open list display form
    setOpenTypeComplaint(false)

    setIsDisabledButtonsPress(true)

    const formData = {
      type: typeComplaint,
      description,
      methodSent: constants.methodSentComplaint.form
    }

    // Ask and get precise location
    Geolocation.getCurrentPosition(
      async position => {
        // With location
        formData.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        await createComplaint(formData)
      },
      async error => {
        // Permission precise location denied
        // Optional Send alert system to enable gps
        // Send formData without location
        formData.location = null
        await createComplaint(formData)
      },
      {
        enableHighAccuracy: true, // gps
        maximumAge: 0, // get gps no cache
        timeout: 10000, // 10 seg
      }
    )
  }

  // Render
  function renderFormComplaint() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginTop: SIZES.radius,
            color: appTheme?.textColor,
            ...FONTS.body3,
          }}
        >
          Crea una nueva denuncia
        </Text>
        {/* Type */}
        <FormSelect
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Tipo de Violencia"
          errorMsg={errors?.type}
          open={openTypeComplaint}
          value={typeComplaint}
          items={constants.typeComplaintOptionsList}
          setOpen={setOpenTypeComplaint}
          setValue={setTypeComplaint}
          zIndex={3000}
          zIndexInverse={3000}
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

        <TextButton
          label="Enviar Denuncia"
          disabled={
            isDisabledButtonsPress
              ? true :
              isEnableSend() ? false : true
          }
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              isDisabledButtonsPress
                ? COLORS.transparentPrimary
                : isEnableSend()
                  ? COLORS.primary2
                  : COLORS.transparentPrimary,
          }}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={onSubmit}
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

        {/* Status send */}
        {isDisabledButtonsPress && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'center'
            }}>
            <Text
              style={{
                color: appTheme?.textColor,
                ...FONTS.body4
              }}>
              Enviando espere por favor..
            </Text>
          </View>
        )}
      </View>
    )
  }

  function renderMenuCard() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <View
          style={{
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text
            style={{
              marginTop: SIZES.radius,
              color: appTheme?.textColor,
              ...FONTS.body3,
            }}
          >
            Realiza seguimiento a tus denuncias
          </Text>
        </View>

        {/* History */}
        <MenuCard
          disabled={isDisabledButtonsPress}
          infoItem={{
            image: images.stop_violence_1,
            name: 'Historial de Denuncias'
          }}
          onPress={() => navigation.navigate('ComplaintHistory')}
        />
      </View>
    )
  }

  return (
    <React.Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150, // add for screen large
        }}
      >
        {/* Complaint Form */}
        {renderFormComplaint()}

        {/* Complaints History */}
        {renderMenuCard()}
      </ScrollView>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    complaint: state.complaint,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createComplaint: (formData) => dispatch(createComplaint(formData))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateComplaint)