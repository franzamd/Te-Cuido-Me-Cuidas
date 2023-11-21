function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == '') {
    setEmailError('');
  } else if (isValidEmail(value)) {
    setEmailError('');
  } else {
    setEmailError('Email inválido');
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 6) {
    setPasswordError('Contraseña debe tener 6 carácteres');
  } else {
    setPasswordError('');
  }
}

function validateString(value, setStringError, label) {
  if (value.length > 50) {
    setStringError(`${label} no debe superar los 50 carácteres`);
  } else if (value.length < 2) {
    setStringError(`${label} debe tener 2 carácteres`);
  } else {
    setStringError('');
  }
}

function validatePhone(value, setValueError, label) {
  const regex = /^[0-9]+$/;

  if (!regex.test(value)) {
    setValueError(`${label} solo permite números`);
  } else if (value.length > 25) {
    setValueError(`${label} no debe superar los 25 carácteres`);
  } else {
    setValueError('');
  }
}

function calculateAngle(coordinates) {
  let startLat = coordinates[0]['latitude'];
  let startLng = coordinates[0]['longitude'];
  let endLat = coordinates[1]['latitude'];
  let endLng = coordinates[1]['longitude'];
  let dx = endLat - startLat;
  let dy = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateString,
  validatePhone,
  calculateAngle,
};

export default utils;
