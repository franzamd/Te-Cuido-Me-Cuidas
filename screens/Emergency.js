import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { connect } from 'react-redux';

import { createComplaint, COMPLAINT_RESET } from '../stores/complaintActions';
import { IconButton, ButtonCard } from '../components';
import { SIZES, FONTS, COLORS, icons, images, constants } from '../constants';

const Emergency = ({
  appTheme,
  navigation,
  complaint,
  createComplaint,
  isFocusedComponent
}) => {
  // store
  const { errors, loading, createSuccess } = complaint
  // const [buttonsDisabled, setButtonsDisabled] = useState(false)

  const toast = useToast();
  const dispatch = useDispatch();

  // Toast success
  useEffect(() => {
    if (createSuccess && isFocusedComponent) {
      toast.show('Denuncia enviada exitosamente', {
        type: 'success',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [createSuccess, isFocusedComponent])

  // Toast error
  useEffect(() => {
    if (errors && isFocusedComponent) {
      toast.show('¡Ups! Algo salió mal', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [errors, isFocusedComponent])

  async function handleBtnTypeSexual() {
    const formData = {
      type: constants.typeComplaint.sexual,
      location: {
        latitude: -21.541209974609348,
        longitude: -64.71459756970413
      },
      methodSent: constants.methodSentComplaint.button
    }
    await createComplaint(formData)
  }

  async function handleBtnTypePhysical() {
    const formData = {
      type: constants.typeComplaint.physical,
      location: {
        latitude: -21.541209974609348,
        longitude: -64.71459756970413
      },
      methodSent: constants.methodSentComplaint.button
    }
    await createComplaint(formData)
  }

  async function handleBtnTypePsychological() {
    const formData = {
      type: constants.typeComplaint.psychological,
      location: {
        latitude: -21.541209974609348,
        longitude: -64.71459756970413
      },
      methodSent: constants.methodSentComplaint.button
    }
    await createComplaint(formData)
  }

  function clearFormInput() {
    dispatch({ type: COMPLAINT_RESET })
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

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <IconButton
            icon={icons.help}
            iconStyle={{
              width: 30,
              height: 30,
              tintColor: appTheme?.tintColor,
            }}
            onPress={() => navigation.navigate('HelpComplaint')}
          />
        </View>
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
          disabled={loading}
          onPress={handleBtnTypeSexual}
        />

        {/* Button Emergency Type Physical */}
        <ButtonCard
          infoItem={{
            image: images.button_violence_sexual,
            title: 'Violencia Física',
            description: 'Pulsa el botón para enviar una denuncia violencia física'
          }}
          disabled={false}
          onPress={handleBtnTypePhysical}
        />

        {/* Button Emergency Type Psychological */}
        <ButtonCard
          infoItem={{
            image: images.button_violence_sexual,
            title: 'Violencia Psicológica',
            description: 'Pulsa el botón para enviar una denuncia violencia psicológica'
          }}
          disabled={false}
          onPress={handleBtnTypePsychological}
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