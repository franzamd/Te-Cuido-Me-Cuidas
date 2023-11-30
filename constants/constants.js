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

const typeComplaintOptionsList = [
  { label: 'Seleccionar', value: '0' },
  { label: 'Violencia Sexual', value: 'Violencia Sexual' },
  { label: 'Violencia Física', value: 'Violencia Física' },
  { label: 'Violencia Psicológica', value: 'Violencia Psicológica' }
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
    screen: 'CreateComplaint'
  },
  {
    id: 1,
    name: 'Historial de Denuncias',
    image: images.stop_violence_2,
    screen: 'ComplaintHistory'
  },
  // {
  //   id: 2,
  //   name: 'Auxiliar Denuncia',
  //   image: images.stop_violence_3,
  //   screen: 'CreateComplaint'
  // }
];

const offline = {
  title: 'Require conexión a internet',
  description: 'Por favor habilite su conexión a internet para continuar.',
};

const alertMsg = {
  title: 'Confirmar Acción'
}

const typeComplaint = {
  sexual: 'Violencia Sexual',
  physical: 'Violencia Física',
  psychological: 'Violencia Psicológica'
}

const methodSentComplaint = {
  form: 'Formulario',
  button: 'Botón de Emergencia'
}

const statusComplaint = {
  success: 'Aceptado',
  rejected: 'Rechazado',
  inProgress: 'En Proceso',
  inWaiting: 'En espera'
}

const statusOptionsList = [
  { label: 'Seleccionar', value: '0' },
  { label: 'Aceptado', value: 'Aceptado' },
  { label: 'Rechazado', value: 'Rechazado' },
]

export default {
  gendersOptionList,
  protectionMechanismOptionsList,
  screens,
  bottom_tabs,
  offline,
  cardMenus,
  typeComplaintOptionsList,
  alertMsg,
  typeComplaint,
  methodSentComplaint,
  statusComplaint,
  statusOptionsList,
};
