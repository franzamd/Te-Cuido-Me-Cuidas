import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import moment from 'moment'
import { USER_ROLE_DEFAULT, USER_ROLE_INTERMEDIARY } from '@env';

import { getMyComplaints, getComplaintsFromUserIntermediary } from '../stores/complaintActions';
import { IconButton, Loading, TextButton } from '../components';
import { SIZES, FONTS, COLORS, icons, constants } from '../constants';

const ComplaintItem = ({ navigation, item, userRole }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        padding: SIZES.radius,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20,
      }}
      onPress={() => navigation.navigate('ComplaintDetails', {
        complaintSelected: item
      })}>

      {/* Name, UID, Date, Method Sent */}
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary2,
          }}>
          {item.type}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.gray80,
            ...FONTS.body5,
          }}>
          Código {item.uid}
        </Text>
        <Text
          style={{
            color: COLORS.gray60,
            ...FONTS.body5,
          }}>
          Enviado el {moment(item.createdAt).format('DD/MM/YYYY, HH:mm a').toString()}
        </Text>
        <Text
          style={{
            color: COLORS.gray60,
            ...FONTS.body5,
          }}>
          Metodo {item.methodSent}
        </Text>
      </View>

      {/* Status */}
      <View
        style={{
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {userRole === USER_ROLE_INTERMEDIARY ? (
          // User intermediary
          <TextButton
            label={item.intermediaryAction.status}
            contentContainerStyle={{
              height: 30,
              width: 80,
              backgroundColor:
                (item.methodSent === constants.methodSentComplaint.button && item.instanceAction.status !== constants.statusComplaint.success)
                  ? COLORS.blue
                  : item.intermediaryAction.status === constants.statusComplaint.success
                    ? COLORS.secondary3
                    : item.intermediaryAction.status === constants.statusComplaint.inWaiting
                      ? COLORS.primary3
                      : COLORS.primary,
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.body5
            }}
            onPress={null}
          />
        ) : (
          // Default user
          <TextButton
            label={item.status}
            contentContainerStyle={{
              height: 30,
              width: 80,
              backgroundColor:
                (item.methodSent === constants.methodSentComplaint.button && item.instanceAction.status !== constants.statusComplaint.success)
                  ? COLORS.blue
                  : item.status === constants.statusComplaint.success
                    ? COLORS.secondary3
                    : item.status === constants.statusComplaint.inProgress
                      ? COLORS.primary3
                      : COLORS.primary,
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.body5
            }}
            onPress={null}
          />
        )}

        {item.methodSent === constants.methodSentComplaint.button && (
          <Text
            style={{
              color: COLORS.gray60,
              fontWeight: 'bold',
              ...FONTS.body5,
            }}>
            Urgente
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const ComplaintHistory = ({
  appTheme,
  navigation,
  complaint,
  userLogin,
  getMyComplaints,
  getComplaintsFromUserIntermediary
}) => {
  // store
  const { complaints, errors, loading } = complaint
  const { userInfo } = userLogin

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch my complaints
  // TODO: Delete this example for get initial data then using isFocused for get data
  // useEffect(() => {
  //   if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
  //     getComplaintsFromUserIntermediary()
  //   }
  //   if (userInfo?.role === USER_ROLE_DEFAULT) {
  //     getMyComplaints()
  //   }
  // }, [userInfo])

  // Reload action scroll
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Fetch data complaints
    if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
      getComplaintsFromUserIntermediary()
    }
    if (userInfo?.role === USER_ROLE_DEFAULT) {
      getMyComplaints()
    }

    setRefreshing(false);
  }, [userInfo]);

  // Call if screen is display again or return from other screen
  useEffect(() => {
    if (isFocused) {
      if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
        getComplaintsFromUserIntermediary()
      }
      if (userInfo?.role === USER_ROLE_DEFAULT) {
        getMyComplaints()
      }
    }
  }, [isFocused]);


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
            Historial de Denuncias
          </Text>
        </View>
      </View>
    );
  }

  function renderComplaintsList() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          marginBottom: 50
        }}
      >

        <Text
          style={{
            color: appTheme?.textColor,
            ...FONTS.body3,
          }}
        >
          Listado de denuncias
        </Text>

        {complaints?.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                flex: 1,
                marginTop: SIZES.radius,
                color: appTheme?.textColor,
                ...FONTS.body4,
              }}
            >
              Selecciona una denuncia para obtener información detallada y conocer su estado
            </Text>
          </View>
        )}

        <FlatList
          refreshControl={
            <RefreshControl
              style={{ display: 'none' }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          data={complaints}
          scrollEventThrottle={16}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.body4,
                  color: appTheme?.textColor,
                }}>
                {complaints?.length} Resultados encontrados
              </Text>

              {/* Filter Button */}
              <IconButton
                icon={icons.filter}
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
                containerStyle={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: COLORS.primary2,
                }}
                onPress={() => null}
              />
            </View>
          }
          keyExtractor={(item, index) => `${item._id}`}
          renderItem={({ item, index }) => {
            return (
              <ComplaintItem
                navigation={navigation}
                title={item.type}
                item={item}
                userRole={userInfo?.role}
              />
            )
          }}
          ListEmptyComponent={
            loading ?
              <View style={{ flex: 1 }}>
                <View style={{ marginTop: SIZES.padding * 2 }}>
                  <Loading />
                </View>
              </View>
              :
              <View
                style={{
                  marginTop: SIZES.base,
                }}>
                <Text
                  style={{
                    color: COLORS.gray60,
                    ...FONTS.body4,
                  }}>
                  Lo sentimos no se encontraron denuncias registrados
                </Text>
              </View>
          }
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

      {/* Complaints List */}
      {renderComplaintsList()}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
    complaint: state.complaint,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyComplaints: () => dispatch(getMyComplaints()),
    getComplaintsFromUserIntermediary: () => dispatch(getComplaintsFromUserIntermediary()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintHistory)