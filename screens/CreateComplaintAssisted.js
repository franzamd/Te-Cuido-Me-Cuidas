import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { createComplaintAssisted, COMPLAINT_RESET } from '../stores/complaintActions';
import { FormSelect, FormInputArea, TextButton, FormInput, IconButton } from '../components';
import { SIZES, FONTS, COLORS, constants, icons } from '../constants';

const CreateComplaintAssisted = ({
  appTheme,
  navigation,
  complaint,
  createComplaintAssisted,
}) => {
  // store
  const { errors, loading, createSuccess } = complaint

  const dispatch = useDispatch();
  const [typeComplaint, setTypeComplaint] = useState('0');
  const [assistedPerson, setAssistedPerson] = useState('');
  const [description, setDescription] = useState('');
  const [openTypeComplaint, setOpenTypeComplaint] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      dispatch({ type: COMPLAINT_RESET })
    }
  }, [])

  // Toast success
  useEffect(() => {
    if (createSuccess && isFocused) {
      navigation.goBack()
    }
  }, [createSuccess, isFocused])

  function isEnableSend() {
    return typeComplaint !== '0' && assistedPerson !== ''
  }

  async function onSubmit() {
    // hide open list display form
    setOpenTypeComplaint(false)

    const formData = {
      type: typeComplaint,
      description,
      location: null,
      methodSent: constants.methodSentComplaint.form,
      assistedPerson,
    }
    await createComplaintAssisted(formData)
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
            Crear Denuncia
          </Text>
        </View>
      </View>
    );
  }

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
          Crea una nueva denuncia asistida
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

        {/* Assisted Person */}
        <FormInput
          value={assistedPerson}
          label="Víctima"
          onChange={(value) => setAssistedPerson(value)}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={errors?.assistedPerson}
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
            color: COLORS.white
          }}
          onPress={onSubmit}
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
        }}
      >
        {/* Complaint Form */}
        {renderFormComplaint()}
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
    createComplaintAssisted: (formData) => dispatch(createComplaintAssisted(formData))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateComplaintAssisted)