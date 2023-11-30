import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { useIsFocused } from '@react-navigation/native';

import { createComplaint, COMPLAINT_RESET } from '../stores/complaintActions';
import { MenuCard, FormSelect, FormInputArea, TextButton } from '../components';
import { SIZES, FONTS, COLORS, constants, images } from '../constants';

const CreateComplaint = ({
  appTheme,
  navigation,
  complaint,
  createComplaint,
  isFocusedComponent
}) => {
  // store
  const { errors, loading, createSuccess } = complaint

  const toast = useToast();
  const dispatch = useDispatch();
  const [typeComplaint, setTypeComplaint] = useState('0');
  const [description, setDescription] = useState('');
  const [openTypeComplaint, setOpenTypeComplaint] = useState(false);
  const isFocused = useIsFocused();

  // Toast success
  useEffect(() => {
    if (createSuccess && isFocusedComponent && isFocused) {
      toast.show('Denuncia enviada exitosamente', {
        type: 'success',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [createSuccess, isFocusedComponent, isFocused])

  // Toast error
  useEffect(() => {
    if (errors && isFocusedComponent && isFocused) {
      toast.show('¡Ups! Algo salió mal', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [errors, isFocusedComponent, isFocused])

  function clearFormInput() {
    setTypeComplaint('0')
    setOpenTypeComplaint(false)
    setDescription('')
    dispatch({ type: COMPLAINT_RESET })
  }

  function isEnableSend() {
    return typeComplaint !== '0'
  }

  async function onSubmit() {
    // hide open list display form
    setOpenTypeComplaint(false)

    const formData = {
      type: typeComplaint,
      description,
      // TODO: Add location gps
      location: {
        latitude: -21.541209974609348,
        longitude: -64.71459756970413
      },
      methodSent: constants.methodSentComplaint.form
    }
    await createComplaint(formData)
  }

  // Render
  function renderFormComplaint() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150, // add for screen large
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

          <TextButton
            label="Enviar Denuncia"
            disabled={loading || (isEnableSend() ? false : true)}
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
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
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
      {/* Complaint Form */}
      {renderFormComplaint()}

      {/* Complaints History */}
      {renderMenuCard()}
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