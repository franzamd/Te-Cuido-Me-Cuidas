import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

import { createComplaint, COMPLAINT_RESET } from '../stores/complaintActions';
import { MenuCard, FormSelect, FormInputArea, TextButton } from '../components';
import { SIZES, FONTS, COLORS, constants, images } from '../constants';

const ComplaintScreenUser = ({ appTheme, navigation, complaint, createComplaint }) => {
  const { errors, loading, createSuccess } = complaint
  const toast = useToast();
  const dispatch = useDispatch();
  const [typeComplaint, setTypeComplaint] = useState('0');
  const [description, setDescription] = useState('');
  const [openTypeComplaint, setOpenTypeComplaint] = useState(false);

  useEffect(() => {
    if (createSuccess) {
      toast.show('Denuncia enviada exitosamente', {
        type: 'success',
        placement: 'top',
        duration: 5000,
        animationType: 'slide-in',
      });
      clearFormInput()
    }
  }, [createSuccess])

  function clearFormInput() {
    setTypeComplaint('0')
    setDescription('')
    setOpenTypeComplaint('')
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
      location: {
        latitude: -21.541209974609348,
        longitude: -64.71459756970413
      }
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
              color: appTheme.textColor,
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
            // placeholder="Ingrese información sobre la violencia sufrida"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            errorMsg={errors?.description}
          />

          {/* Errors */}
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
              color: appTheme.name === 'dark' ? COLORS.black : COLORS.white,
            }}
            onPress={() => onSubmit()}
          />
        </View>

        {/* Menu Card */}
        {renderMenuCard()}

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
              color: appTheme.textColor,
              ...FONTS.body3,
            }}
          >
            Realiza seguimiento a tus denuncias enviadas
          </Text>
        </View>
        <MenuCard
          infoItem={{
            image: images.stop_violence_1,
            name: 'Historial de Denuncias'
          }}
          onPress={() => null}
        />
      </View>
    )
  }

  return (
    <View style={{
      marginTop: SIZES.radius,
    }}>
      {/* Render Complaint Form */}
      {renderFormComplaint()}
    </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintScreenUser)