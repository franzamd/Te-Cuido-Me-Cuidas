import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { DEPARTMENT_LA_PAZ_ID } from '@env';

// actions
import { register, USER_CLEAR_ERRORS } from '../stores/authActions';
import { listCommunities, COMMUNITY_RESET } from '../stores/communityActions';
import { listEstablishments, ESTABLISHMENT_RESET } from '../stores/establishmentActions';
import { listMunicipalities, MUNICIPALITY_RESET } from '../stores/municipalityActions';

// components
import { IconButton } from '../components';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { utils } from '../utils';
import { FormInput, TextButton, FormSelect, FormDate } from '../components';
import { constants } from '../constants';

const SingUp = ({
  navigation,
  userLogin,
  register,
  appTheme,
  community: communityStore,
  establishment: establishmentStore,
  listCommunities,
  listEstablishments,
  municipality: municipalityStore,
  listMunicipalities
}) => {
  const dispatch = useDispatch();

  // store
  const { userInfo, loading: loadingUser, errors } = userLogin
  const { establishments, loading: loadingEstablishment } = establishmentStore
  const { communities, loading: loadingCommunity } = communityStore
  const { municipalities, loading: loadingMunicipality } = municipalityStore

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('0');
  const [openGender, setOpenGender] = useState(false);
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [municipality, setMunicipality] = useState('0');
  const [openMunicipality, setOpenMunicipality] = useState(false);
  const [municipalityOptionsList, setMunicipalityOptionsList] = useState([
    {
      value: '0',
      label: 'Seleccionar',
    }
  ])
  const [protectionMechanism, setProtectionMechanism] = useState('0');
  const [openProtectionMechanism, setOpenProtectionMechanism] = useState(false);
  const [establishment, setEstablishment] = useState('0');
  const [openEstablishment, setOpenEstablishment] = useState(false);
  const [establishmentOptionsList, setEstablishmentOptionsList] = useState([
    {
      value: '0',
      label: 'Seleccionar',
    }
  ])
  const [community, setCommunity] = useState('0');
  const [openCommunity, setOpenCommunity] = useState(false);
  const [communityOptionsList, setCommunityOptionsList] = useState([
    {
      value: '0',
      label: 'Seleccionar',
    }
  ])

  useEffect(() => {
    listMunicipalities(DEPARTMENT_LA_PAZ_ID)
    return () => {
      dispatch({ type: USER_CLEAR_ERRORS })
      dispatch({ type: COMMUNITY_RESET })
      dispatch({ type: ESTABLISHMENT_RESET })
      dispatch({ type: MUNICIPALITY_RESET })
    }
  }, [])

  // Load municipalities options list
  useEffect(() => {
    if (!loadingMunicipality && municipalities) {
      const items = municipalities.map((item) => ({
        _id: item._id,
        value: item._id,
        label: `${item.name}`
      }));
      setMunicipalityOptionsList([
        {
          _id: '0',
          value: '0',
          label: 'Seleccione una opción'
        },
        ...items
      ]);
    }
  }, [loadingMunicipality, municipalities]);

  // Load establishments options list
  useEffect(() => {
    if (!loadingEstablishment && establishments) {
      const items = establishments.map((item) => ({
        _id: item._id,
        value: item._id,
        label: `${item.name}`
      }));
      setEstablishmentOptionsList([
        {
          _id: '0',
          value: '0',
          label: 'Seleccione una opción'
        },
        ...items
      ]);
    }
  }, [loadingEstablishment, establishments]);

  // Load communities options list
  useEffect(() => {
    if (!loadingCommunity && communities) {
      const items = communities.map((item) => ({
        _id: item._id,
        value: item._id,
        label: `${item.name}`
      }));
      setCommunityOptionsList([
        {
          _id: '0',
          value: '0',
          label: 'Seleccione una opción'
        },
        ...items
      ]);
    }
  }, [loadingCommunity, communities]);

  // Register user success then return to initial screen
  useEffect(() => {
    if (userInfo && !loadingUser) {
      navigation.popToTop();
    }
  }, [userInfo, loadingUser])

  function isEnableRegister() {
    return email != '' &&
      password != '' &&
      emailError == '' &&
      name !== '' &&
      lastName !== '' &&
      dateOfBirth !== '' &&
      municipality !== '0' &&
      gender !== '0' &&
      phone !== '' &&
      protectionMechanism !== '0' &&
      (protectionMechanism === 'Unidad Educativa' && establishment !== '0') ||
      (protectionMechanism === 'Comunidad' && community !== '0');
  }

  function handleProtectionMechanism(value) {
    if (value === 'Comunidad') {
      listCommunities(DEPARTMENT_LA_PAZ_ID, municipality)
    }

    if (value === 'Unidad Educativa') {
      listEstablishments(DEPARTMENT_LA_PAZ_ID, municipality)
    }

    // Reset establishment and community
    setEstablishment('0')
    setOpenEstablishment(false)
    setCommunity('0')
    setOpenCommunity(false)
  }

  function handleMunicipality() {
    // Default establishment and community initial data
    setEstablishment('0');
    setOpenEstablishment(false)
    setCommunity('0');
    setOpenCommunity(false)
  }

  function handleCommunity() {
    // Default establishment initial data
    setEstablishment('0');
    setOpenEstablishment(false)
  }

  function handleEstablishment() {
    // Default community initial data
    setCommunity('0');
    setOpenCommunity(false)
  }

  async function onSubmit() {
    const formData = {
      email: email,
      password: password,
      password2: password,
      role: 'usuario',
      profile: {
        name: name,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        gender: gender,
        phone: {
          codeCountry: '+591',
          value: phone
        },
        municipality: municipality !== '0' ? municipality : '',
        protectionMechanism: protectionMechanism !== '0' ? protectionMechanism : '',
        community: community !== '0' ? community : '',
        establishment: establishment !== '0' ? establishment : ''
      }
    };
    await register(formData);
  }

  // Render
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
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
        </View>
      </View>
    );
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
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150, // add for screen large
        }}
      >
        {/* Title & Subtitle */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: appTheme?.textColor,
              marginTop: SIZES.base,
              ...FONTS.body4,
            }}
          >
            Complete el formulario con sus datos para continuar
          </Text>
        </View>

        {/* Email */}
        <FormInput
          label="Email"
          value={email}
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          errorMsg={emailError}
        />

        {/* Password */}
        <FormInput
          label="Contraseña"
          value={password}
          errorMsg={errors?.password}
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          onChange={value => setPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray50,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Name */}
        <FormInput
          value={name}
          label="Nombres"
          onChange={(value) => setName(value)}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={errors?.profile?.name}
        />

        {/* LastName */}
        <FormInput
          value={lastName}
          label="Apellidos"
          onChange={(value) => setLastName(value)}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={errors?.profile?.lastName}
        />

        {/* Gender */}
        <FormSelect
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Género"
          errorMsg={errors?.profile?.gender}
          open={openGender}
          value={gender}
          items={constants.gendersOptionList}
          setOpen={setOpenGender}
          setValue={setGender}
          zIndex={3000}
          zIndexInverse={3000}
        />

        {/* Phone */}
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10
          }}>
          <FormInput
            editable={false}
            label="Código"
            onChange={null}
            value={'+591'}
            labelStyle={{
              color: appTheme?.textColor,
            }}
            containerStyle={{
              flex: 1,
            }}
          />
          <FormInput
            value={phone}
            label="Nº Celular"
            onChange={(value) => setPhone(value)}
            labelStyle={{
              color: appTheme?.textColor,
            }}
            containerStyle={{
              flex: 2,
            }}
            errorMsg={errors?.profile?.phone}
          />
        </View>

        {/* Date of Birth */}
        <FormDate
          containerStyle={{
            marginTop: SIZES.radius,
            flex: 1,
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Fecha de Nacimiento"
          errorMsg={errors?.profile?.dateOfBirth}
          value={dateOfBirth}
          onChange={value => {
            setOpenDateOfBirth(false);
            setDateOfBirth(value);
          }}
          open={openDateOfBirth}
          onCancel={() => {
            setOpenDateOfBirth(false);
          }}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setOpenDateOfBirth(!openDateOfBirth)}>
              <Image
                source={icons.calendar}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray50,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Municipality */}
        <FormSelect
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Municipio"
          errorMsg={errors?.profile?.municipality}
          open={openMunicipality}
          value={municipality}
          items={municipalityOptionsList}
          setOpen={setOpenMunicipality}
          setValue={setMunicipality}
          onChangeValue={(value) => handleMunicipality(value)}
          zIndex={3000}
          zIndexInverse={3000}
        />

        {/* Protection Mechanism */}
        <FormSelect
          disabled={municipality === '0'}
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Mecanismo de Protección"
          errorMsg={errors?.profile?.protectionMechanism}
          open={openProtectionMechanism}
          value={protectionMechanism}
          items={constants.protectionMechanismOptionsList}
          setOpen={setOpenProtectionMechanism}
          setValue={setProtectionMechanism}
          onChangeValue={handleProtectionMechanism}
          zIndex={2000}
          zIndexInverse={2000}
        />

        {/* Community */}
        {protectionMechanism === 'Comunidad' && (
          <FormSelect
            disabled={protectionMechanism !== 'Comunidad'}
            containerStyle={{
              marginTop: SIZES.radius
            }}
            labelStyle={{
              color: appTheme?.textColor,
            }}
            label="Comunidad"
            errorMsg={errors?.profile?.community}
            open={openCommunity}
            value={community}
            items={communityOptionsList}
            setOpen={setOpenCommunity}
            setValue={setCommunity}
            onChangeValue={handleCommunity}
            zIndex={1000}
            zIndexInverse={1000}
          />
        )}

        {/* Establishment */}
        {protectionMechanism === 'Unidad Educativa' && (
          <FormSelect
            disabled={protectionMechanism !== 'Unidad Educativa'}
            containerStyle={{
              marginTop: SIZES.radius
            }}
            labelStyle={{
              color: appTheme?.textColor,
            }}
            label="Unidad Educativa"
            errorMsg={errors?.profile?.establishment}
            open={openEstablishment}
            value={establishment}
            items={establishmentOptionsList}
            setOpen={setOpenEstablishment}
            setValue={setEstablishment}
            onChangeValue={handleEstablishment}
            zIndex={1000}
            zIndexInverse={1000}
          />
        )}

        {/* Errors */}
        {Boolean(errors?.error || errors?.password) && (
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
              {errors?.error || errors?.password}
            </Text>
          </View>
        )}

        <TextButton
          label="Ingresar"
          disabled={loadingUser || (isEnableRegister() ? false : true)}
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableRegister()
              ? COLORS.primary2
              : COLORS.transparentPrimary,
          }}
          labelStyle={{
            color: appTheme.name === 'dark' ? COLORS.black : COLORS.white,
          }}
          onPress={() => onSubmit()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
    community: state.community,
    establishment: state.establishment,
    municipality: state.municipality,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (formData) => dispatch(register(formData)),
    listCommunities: (departmentId, municipalityId) => dispatch(listCommunities(departmentId, municipalityId)),
    listEstablishments: (departmentId, municipalityId) => dispatch(listEstablishments(departmentId, municipalityId)),
    listMunicipalities: (departmentId, municipalityId) => dispatch(listMunicipalities(departmentId, municipalityId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);