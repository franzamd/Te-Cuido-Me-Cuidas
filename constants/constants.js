import images from './images';

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
  emergency: 'Emergencia',
  settings: 'Ajustes',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.emergency,
  },
  {
    id: 2,
    label: screens.settings,
  },
];

const cardMenus = [
  {
    id: 0,
    name: 'Realizar Denuncia',
    image: images.stop_violence_1,
    description:
      'Realizar una denuncia y envialo a las autoridades',
  },
  {
    id: 1,
    name: 'Historial de Denuncias',
    image: images.stop_violence_2,
    description:
      'Revisa el estado de las denuncias enviadas a las autoridades',
  },
  {
    id: 2,
    name: 'Auxiliar Denuncia',
    image: images.stop_violence_3,
    description:
      'Apoya a un estudiante realizando la denuncia por ella(el) y envialo a las autoridades',
  },
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
  cardMenus,
};