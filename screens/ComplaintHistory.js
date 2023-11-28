import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import moment from 'moment'

import { getMyComplaints } from '../stores/complaintActions';
import { IconButton, Loading, TextButton } from '../components';
import { SIZES, FONTS, COLORS, icons, constants, dummyData } from '../constants';

const ComplaintItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginTop: SIZES.radius,
        height: 60,
      }}
      onPress={() => navigation.navigate('ComplaintDetails', {
        complaintSelected: item
      })}>

      {/* Name, UID, Date */}
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
      </View>

      {/* Status */}
      <View
        style={{
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextButton
          label={item.status}
          contentContainerStyle={{
            height: 30,
            width: 80,
            backgroundColor:
              item.status === constants.statusComplaint.success ? COLORS.secondary3
                : item.status === constants.statusComplaint.inProgress ? COLORS.primary3
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
      </View>
    </TouchableOpacity>
  )
}

const ComplaintHistory = ({
  appTheme,
  navigation,
  complaint,
  getMyComplaints
}) => {
  // store
  const { complaints, errors, loading } = complaint

  // const { complaints } = dummyData
  const [refreshing, setRefreshing] = useState(false);

  // Fetch my complaints
  useEffect(() => {
    getMyComplaints()
  }, [])

  // Reload action scroll
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Fetch data complaints
    getMyComplaints()

    setRefreshing(false);
  }, []);

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
            color: appTheme.textColor,
            ...FONTS.body3,
          }}
        >
          Listado de denuncias enviadas
        </Text>

        {complaints?.length > 0 && (
          <Text
            style={{
              marginTop: SIZES.radius,
              color: appTheme.textColor,
              ...FONTS.body4,
            }}
          >
            Selecciona una denuncia para ver mas infomación y proceso en donde se encuentra
          </Text>
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
          ItemSeparatorComponent={() => (
            <View style={{ height: 20 }} />
          )}
          scrollEventThrottle={16}
          keyboardDismissMode="on-drag"
          keyExtractor={(item, index) => `${item._id}`}
          renderItem={({ item, index }) => {
            return (
              <ComplaintItem
                navigation={navigation}
                title={item.type}
                item={item}
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
    complaint: state.complaint,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyComplaints: () => dispatch(getMyComplaints())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintHistory)