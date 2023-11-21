const gendersOptionList = [
  { label: 'Seleccionar', value: '0' },
  { label: 'Mujer', value: 'Mujer' },
  { label: 'Hombre', value: 'Hombre' },
  { label: 'Otro', value: 'Otro' },
];

const protectionMechanismOptionsList = [
  { label: 'Seleccionar', value: '0' },
  { label: 'Unidad Educativa', value: 'Unidad Educativa' },
  { label: 'Comunidad', value: 'Comunidad' }
];


const screens = {
  home: 'Inicio',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.help,
    icon: require('../assets/icons/home_principal.png'),
  }
];

const offline = {
  title: 'Require conexión a internet',
  description: 'Por favor habilite su conexión a internet para continuar.',
};

export default {
  gendersOptionList,
  protectionMechanismOptionsList,
  screens,
  bottom_tabs,
  offline,
};
