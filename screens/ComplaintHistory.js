import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Modal, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import moment from 'moment'

import { getMyComplaints, getComplaintsFromUserIntermediary } from '../stores/complaintActions';
import { IconButton, Loading, TextButton, FormSelect } from '../components';
import { SIZES, FONTS, COLORS, icons, constants, config } from '../constants';

const { USER_ROLE_DEFAULT, USER_ROLE_INTERMEDIARY } = config

const ComplaintItem = ({ appTheme, navigation, item, userRole }) => {
  const statusChangedByUser = (item.instanceAction?.status === 'Aceptado' || item.instanceAction?.status === 'Rechazado') ? 'por Instancia' : (item.intermediaryAction?.status === 'Aceptado' || item.intermediaryAction?.status === 'Rechazado') ? 'por Intermediario' : ''

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
            color: appTheme?.textColor2,
            ...FONTS.body5,
          }}>
          Código {item.uid}
        </Text>
        <Text
          style={{
            color: appTheme?.textColor3,
            ...FONTS.body5,
          }}>
          Enviado el {moment(item.createdAt).format('DD/MM/YYYY, HH:mm a').toString()}
        </Text>

        {/* Success or rejected */}
        {(item.status === 'Aceptado' || item.status === 'Rechazado') ? (
          <Text
            style={{
              color: appTheme?.textColor3,
              ...FONTS.body5,
            }}>
            {`${item.status} ${statusChangedByUser}`}
          </Text>
        ) : (
          <Text
            style={{
              color: appTheme?.textColor3,
              ...FONTS.body5,
            }}>
            {item.statusUserAction === 'Completado'
              ? 'Completado'
              : `Acción en espera de ${item.statusUserAction}`
            }
          </Text>
        )}
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
            label={item.status}
            contentContainerStyle={{
              height: 30,
              width: 80,
              backgroundColor:
                (item.methodSent === constants.methodSentComplaint.button && item.status !== constants.statusComplaint.success)
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
              justifyContent: 'center',
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
              color: appTheme?.textColor2,
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
  getComplaintsFromUserIntermediary,
}) => {
  // store
  const { complaints, errors, loading } = complaint
  const { userInfo } = userLogin

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('statusInWaitingIntermediaryAction');
  const [openFilter, setOpenFilter] = useState(false);

  // Reload action scroll
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Fetch data complaints
    if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
      getComplaintsFromUserIntermediary(filter)
    }
    if (userInfo?.role === USER_ROLE_DEFAULT) {
      getMyComplaints()
    }

    setRefreshing(false);
  }, [userInfo, filter]);


  // Call if screen is display again or return from other screen
  useEffect(() => {
    if (isFocused && !modalVisible) {
      if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
        getComplaintsFromUserIntermediary(filter)
      }
      if (userInfo?.role === USER_ROLE_DEFAULT) {
        getMyComplaints()
      }
    }
  }, [isFocused, filter, modalVisible]);

  function onBtnReload() {
    if (userInfo?.role === USER_ROLE_INTERMEDIARY) {
      getComplaintsFromUserIntermediary(filter)
    }
    if (userInfo?.role === USER_ROLE_DEFAULT) {
      getMyComplaints()
    }
  }

  function onCloseModal() {
    setModalVisible(!modalVisible)
    setOpenFilter(false)
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
            Historial de Denuncias
          </Text>
        </View>

        <IconButton
          icon={icons.reload}
          iconStyle={{
            width: 30,
            height: 30,
            tintColor: appTheme?.tintColor,
          }}
          onPress={onBtnReload}
        />
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
              marginBottom: SIZES.radius
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
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            userInfo?.role === USER_ROLE_INTERMEDIARY && (
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
                  onPress={() => setModalVisible(true)}
                />
              </View>
            )

          }
          keyExtractor={(item, index) => `${item._id}`}
          renderItem={({ item, index }) => {
            return (
              <ComplaintItem
                navigation={navigation}
                title={item.type}
                item={item}
                userRole={userInfo?.role}
                appTheme={appTheme}
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
                  marginTop: SIZES.radius,
                }}>
                <Text
                  style={{
                    color: appTheme?.textColor3,
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

  function renderFilterModal() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {
            backgroundColor: appTheme?.backgroundColor2
          }]}>
            {/* Type */}
            <FormSelect
              containerStyle={{
                marginTop: SIZES.radius
              }}
              labelStyle={{
                color: appTheme?.textColor,
              }}
              label="Filtro"
              open={openFilter}
              value={filter}
              items={constants.complaintFilterOptionsList}
              setOpen={setOpenFilter}
              setValue={setFilter}
              zIndex={1000}
              zIndexInverse={1000}
            />

            <TextButton
              label="Cerrar"
              contentContainerStyle={{
                height: 50,
                width: "100%",
                alignItems: 'center',
                marginTop: 60,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary2
              }}
              labelStyle={{
                color: COLORS.white,
              }}
              onPress={onCloseModal}
            />
          </View>
        </View>
      </Modal >
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

      {/* Filter Modal */}
      {userInfo?.role === USER_ROLE_INTERMEDIARY && (
        renderFilterModal()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentDarkGray
  },
  modalView: {
    width: 300,
    margin: SIZES.padding,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

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
    getComplaintsFromUserIntermediary: (keyword) => dispatch(getComplaintsFromUserIntermediary(keyword)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ComplaintHistory)