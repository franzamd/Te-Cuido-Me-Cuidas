import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import { createComplaint, COMPLAINT_CLEAR_ERROR } from '../stores/complaintActions';
import { ButtonCard } from '../components';
import { SIZES, FONTS, COLORS, images, constants } from '../constants';

const Emergency = ({
  appTheme,
  complaint,
  createComplaint,
  isFocusedComponent,
  isDisabledButtonsPress,
  setIsDisabledButtonsPress
}) => {
  // store
  const { errors, createSuccess } = complaint

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocusedComponent) {
      checkPermissionGPS()
    }
  }, [isFocusedComponent])

  // Toast success
  useEffect(() => {
    if (createSuccess && isFocusedComponent) {
      dispatch({ type: COMPLAINT_CLEAR_ERROR })
      setIsDisabledButtonsPress(false)
    }
  }, [createSuccess, isFocusedComponent])

  // Toast error
  useEffect(() => {
    if (errors && isFocusedComponent) {
      setIsDisabledButtonsPress(false)
    }
  }, [errors, isFocusedComponent])

  const checkPermissionGPS = async () => {
    try {
      // Ask enable precise or approximate location
      Geolocation.requestAuthorization(
        success => { },
        error => { }
      )
    } catch (err) { }
  };

  async function handleBtnTypeSexual() {
    setIsDisabledButtonsPress(true)

    const formData = {
      type: constants.typeComplaint.sexual,
      methodSent: constants.methodSentComplaint.button
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

  async function handleBtnTypePhysical() {
    setIsDisabledButtonsPress(true)

    const formData = {
      type: constants.typeComplaint.physical,
      methodSent: constants.methodSentComplaint.button
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

  async function handleBtnTypePsychological() {
    setIsDisabledButtonsPress(true)

    const formData = {
      type: constants.typeComplaint.psychological,
      methodSent: constants.methodSentComplaint.button
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
        {/* Title */}
        <Text
          style={{
            ...FONTS.h1,
            color: appTheme?.textColor,
          }}
        >
          Emergencia
        </Text>
      </View>
    );
  }

  function renderButtonsAction() {
    return (
      <View
        style={{
          flex: 1,
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
            Envía una denuncia rápida a la situación que estás enfrentando
          </Text>
        </View>

        {/* Button Emergency Type Sexual */}
        <ButtonCard
          infoItem={{
            image: images.button_violence_sexual,
            title: 'Violencia Sexual',
            description: 'Pulsa el botón para enviar una denuncia de violencia sexual'
          }}
          disabled={isDisabledButtonsPress}
          onPress={handleBtnTypeSexual}
        />

        {/* Button Emergency Type Physical */}
        <ButtonCard
          infoItem={{
            image: images.button_violence_physical,
            title: 'Violencia Física',
            description: 'Pulsa el botón para enviar una denuncia violencia física'
          }}
          disabled={isDisabledButtonsPress}
          onPress={handleBtnTypePhysical}
        />

        {/* Button Emergency Type Psychological */}
        <ButtonCard
          infoItem={{
            image: images.button_violence_psychological,
            title: 'Violencia Psicológica',
            description: 'Pulsa el botón para enviar una denuncia violencia psicológica'
          }}
          disabled={isDisabledButtonsPress}
          onPress={handleBtnTypePsychological}
        />

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
              {errors.error}
            </Text>
          </View>
        )}
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
        }}
      >
        {/* Buttons */}
        {renderButtonsAction()}

      </ScrollView>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Emergency);