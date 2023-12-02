import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

// actions
import { updateProfile, USER_PROFILE_CLEAR_ERRORS } from '../stores/authActions';
import { listDepartments } from '../stores/departmentActions';
import { listCommunities } from '../stores/communityActions';
import { listEstablishments } from '../stores/establishmentActions';
import { listMunicipalities } from '../stores/municipalityActions';

// components
import { IconButton } from '../components';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { FormInput, TextButton, FormSelect, FormDate } from '../components';
import { constants } from '../constants';

const UpdateProfile = ({
  navigation,
  userLogin,
  updateProfile,
  appTheme,
  community: communityStore,
  establishment: establishmentStore,
  listCommunities,
  listEstablishments,
  municipality: municipalityStore,
  listMunicipalities,
  listDepartments,
  department: departmentStore
}) => {
  const dispatch = useDispatch();

  // store
  const { userInfo, loading: loadingUser, errors, updateSuccess } = userLogin
  const { establishments, loading: loadingEstablishment } = establishmentStore
  const { communities, loading: loadingCommunity } = communityStore
  const { municipalities, loading: loadingMunicipality } = municipalityStore
  const { departments, loading: loadingDepartment } = departmentStore

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('0');
  const [openGender, setOpenGender] = useState(false);
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [department, setDepartment] = useState('0');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentOptionsList, setDepartmentOptionsList] = useState([
    {
      value: '0',
      label: 'Seleccionar',
    }
  ])
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
  const [isLoadingDataCompleted, setIsLoadingDataCompleted] = useState(false)
  const [isTimerForActive, setIsTimerForActive] = useState(true)

  useEffect(() => {
    listDepartments()

    return () => {
      dispatch({ type: USER_PROFILE_CLEAR_ERRORS })
    }
  }, [])

  // Optional Waiting 1 seg for enable buttons
  useEffect(() => {
    if (userInfo && isTimerForActive && (establishments || communities)) {
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoadingDataCompleted(true)
      })()
      setIsTimerForActive(false)
    }
  }, [userInfo, isTimerForActive, establishments, communities])

  useEffect(() => {
    if (userInfo?.profile && !isLoadingDataCompleted) {
      setName(userInfo.profile.name || '')
      setLastName(userInfo.profile.lastName || '')
      setGender(userInfo.profile.gender || '0')
      setDateOfBirth(new Date(userInfo.profile.dateOfBirth) || new Date())
      setPhone(userInfo.profile.phone?.value || '')
      setDepartment(userInfo.profile.department?._id || '0')
      setMunicipality(userInfo.profile.municipality?._id || '0')
      setProtectionMechanism(userInfo.profile.protectionMechanism || '0')
      setEstablishment(userInfo.profile.establishment || '0')
      setCommunity(userInfo.profile?.community || '0')
    }
  }, [userInfo, departments, municipalities, establishments, communities])

  // Load departments options list
  useEffect(() => {
    if (!loadingDepartment && departments) {
      const items = departments.map((item) => ({
        _id: item._id,
        value: item._id,
        label: `${item.name}`
      }));
      setDepartmentOptionsList([
        {
          _id: '0',
          value: '0',
          label: 'Seleccionar'
        },
        ...items
      ]);
    }
  }, [loadingDepartment, departments]);

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
          label: 'Seleccionar'
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
          label: 'Seleccionar'
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
          label: 'Seleccionar'
        },
        ...items
      ]);
    }
  }, [loadingCommunity, communities]);

  // Update profile success then return to initial screen
  useEffect(() => {
    if (updateSuccess) {
      navigation.goBack();
    }
  }, [updateSuccess])

  function isEnableRegister() {
    return name !== '' &&
      lastName !== '' &&
      dateOfBirth !== '' &&
      municipality !== '0' &&
      gender !== '0' &&
      phone !== '' &&
      protectionMechanism !== '0' &&
      (protectionMechanism === 'Unidad Educativa' && establishment !== '0') ||
      (protectionMechanism === 'Comunidad' && community !== '0') &&
      department !== '0';
  }

  function handleDepartment(value) {
    // Default municipality establishment and community initial data
    listMunicipalities(value)
    setMunicipality('0');
    setOpenMunicipality(false)
    setProtectionMechanism('0')
    setOpenProtectionMechanism(false)
    setEstablishment('0');
    setOpenEstablishment(false)
    setCommunity('0');
    setOpenCommunity(false)
  }

  function handleMunicipality() {
    // Default establishment and community initial data
    setEstablishment('0');
    setOpenEstablishment(false)
    setCommunity('0');
    setOpenCommunity(false)
  }

  function handleProtectionMechanism(value) {
    if (value === 'Comunidad') {
      listCommunities(department, municipality)
    }

    if (value === 'Unidad Educativa') {
      listEstablishments(department, municipality)
    }

    // Reset establishment and community
    setEstablishment('0')
    setOpenEstablishment(false)
    setCommunity('0')
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
    // set open options false
    setOpenGender(false)
    setOpenDateOfBirth(false)
    setOpenDepartment(false)
    setOpenMunicipality(false)
    setOpenProtectionMechanism(false)
    setOpenEstablishment(false)
    setOpenCommunity(false)

    const formData = {
      name: name,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      phone: {
        codeCountry: '+591',
        value: phone
      },
      department: department !== '0' ? department : '',
      municipality: municipality !== '0' ? municipality : '',
      protectionMechanism: protectionMechanism !== '0' ? protectionMechanism : '',
      community: community !== '0' ? community : '',
      establishment: establishment !== '0' ? establishment : ''
    };
    await updateProfile(formData);
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

          {/* Title */}
          <Text
            style={{
              ...FONTS.h1,
              marginLeft: SIZES.radius,
              color: appTheme?.textColor,
            }}
          >
            Actualizar Perfil
          </Text>
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
          errorMsg={errors?.name}
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
          errorMsg={errors?.lastName}
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
          errorMsg={errors?.gender}
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
            errorMsg={errors?.phone}
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
          errorMsg={errors?.dateOfBirth}
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

        {/* Department */}
        <FormSelect
          containerStyle={{
            marginTop: SIZES.radius
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          label="Departmento"
          errorMsg={errors?.department}
          open={openDepartment}
          value={department}
          items={departmentOptionsList}
          setOpen={setOpenDepartment}
          setValue={setDepartment}
          onChangeValue={(value) => handleDepartment(value)}
          zIndex={4000}
          zIndexInverse={4000}
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
          errorMsg={errors?.municipality}
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
          errorMsg={errors?.protectionMechanism}
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
            errorMsg={errors?.community}
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
            errorMsg={errors?.establishment}
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
        <TextButton
          label="Actualizar"
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
            color: COLORS.white
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
    department: state.department,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (formData) => dispatch(updateProfile(formData)),
    listDepartments: () => dispatch(listDepartments()),
    listCommunities: (departmentId, municipalityId) => dispatch(listCommunities(departmentId, municipalityId)),
    listEstablishments: (departmentId, municipalityId) => dispatch(listEstablishments(departmentId, municipalityId)),
    listMunicipalities: (departmentId, municipalityId) => dispatch(listMunicipalities(departmentId, municipalityId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);