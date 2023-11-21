import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';

import { CustomButton } from '../components';
import { images, COLORS, SIZES, FONTS } from '../constants';

const Onboarding = () => {
  const navigation = useNavigation();

  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}
      >
        <ImageBackground
          source={images.onboarding_bg}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}
            >
              Te Cuido Me Cuidas
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetails() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Description */}
        <Text
          style={{
            marginTop: SIZES.radius,
            color: COLORS.white,
            ...FONTS.body3,
          }}
        >
          La aplicación que te permite denunciar de manera rápida y sencilla, juntos podemos hacer la diferencia.
        </Text>

        {/* Buttons */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* Onboarding */}
          <CustomButton
            buttonText="Iniciar Sesión"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.primary2, COLORS.primary4]}
            onPress={() => navigation.navigate('SignIn')}
          />

          {/* Sign Up */}
          <CustomButton
            buttonText="Registrarse"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkBlue,
              borderWidth: 1,
            }}
            colors={[]}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Detail */}
      {renderDetails()}
    </View>
  );
};

export default Onboarding;
