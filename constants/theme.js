import { Dimensions, Appearance } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#E5554F',
  primary2: '#F87C56',
  primary3: '#FFC658',
  primary4: '#FEAD77',
  secondary: '#006776',
  secondary2: '#009681',
  secondary3: '#6CB690',
  secondary4: '#372E26',
  error: '#E5554F',
  gray10: '#E5E5E5',
  gray20: '#CCCCCC',
  gray30: '#A1A1A1',
  gray40: '#999999',
  gray50: '#7F7F7F',
  gray60: '#666666',
  gray70: '#4C4C4C',
  gray80: '#333333',
  gray85: '#242526',
  gray90: '#191919',
  lightGray1: '#DDDDDD',

  additionalColor4: '#C3C3C3',
  additionalColor9: '#F3F3F3',
  additionalColor11: '#F0FFFB',
  additionalColor13: '#EBF3EF',

  white: '#FFFFFF',
  black: '#000000',

  transparent: 'transparent',
  transparentPrimary: 'rgba(248, 124, 86, 0.4)',
  transparentWhite1: 'rgba(255, 255, 255, 0.1)',
  transparentDarkGray: 'rgba(20,20,20, 0.4)',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 38,
  h1: 24,
  h2: 20,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 24,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

// TODO: Add fonts
export const FONTS = {
  largeTitle: { fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22 },
  body1: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22 },
};

export const darkTheme = {
  name: 'dark',
  backgroundColor1: COLORS.gray85,
  backgroundColor2: COLORS.gray90,
  backgroundColor3: COLORS.gray90,
  backgroundColor4: COLORS.primary,
  backgroundColor5: COLORS.gray85,
  backgroundColor6: COLORS.black,
  backgroundColor7: COLORS.gray90,
  backgroundColor8: COLORS.gray70,
  lineDivider: COLORS.gray70,
  borderColor1: COLORS.gray70,
  borderColor2: COLORS.gray70,
  inputText: COLORS.black,
  textColor: COLORS.white,
  textColor2: COLORS.white,
  textColor3: COLORS.gray40,
  textColor4: COLORS.white,
  textColor5: COLORS.gray30,
  textColor6: COLORS.gray30,
  textColor7: COLORS.gray40,
  textColor8: COLORS.white,
  textColor9: COLORS.white,
  tintColor: COLORS.white,
  dotColor1: COLORS.white,
  dotColor2: COLORS.primary,
};

export const lightTheme = {
  name: 'light',
  backgroundColor1: COLORS.gray10,
  backgroundColor2: COLORS.primary3,
  backgroundColor3: COLORS.additionalColor11,
  backgroundColor4: COLORS.white,
  backgroundColor5: COLORS.additionalColor13,
  backgroundColor6: COLORS.primary3,
  backgroundColor7: COLORS.white,
  backgroundColor8: COLORS.gray10,
  lineDivider: COLORS.gray20,
  borderColor1: COLORS.white,
  borderColor2: COLORS.black,
  inputText: COLORS.black,
  textColor: COLORS.black,
  textColor2: COLORS.primary,
  textColor3: COLORS.gray80,
  textColor4: COLORS.white,
  textColor5: COLORS.black,
  textColor6: COLORS.gray,
  textColor7: COLORS.black,
  textColor8: COLORS.gray50,
  textColor9: COLORS.gray70,
  tintColor: COLORS.black,
  dotColor1: COLORS.gray20,
  dotColor2: COLORS.primary3,
};

export const selectedTheme =
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

const appTheme = { COLORS, SIZES, FONTS, darkTheme, lightTheme };

export default appTheme;
