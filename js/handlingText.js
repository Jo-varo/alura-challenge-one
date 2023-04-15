import { showNotification } from './notification.js';

const textStatus = {
  valid: 'valid-text',
  invalid: 'invalid-text',
  empty: 'empty-text',
};

const textStates = {
  'valid-text': {
    value: true,
    userMsg: 'Texto valido',
  },
  'invalid-text': {
    value: false,
    userMsg: 'Escribe texto válido cumpliendo las condiciones',
  },
  'empty-text': {
    value: false,
    userMsg: 'Escribe algunas palabras para encriptarlas',
  },
};

// Functions managing texts
const checkText = (text = '') => {
  //Avoid "catastrophic backtracking"
  if (!text) return textStatus['empty'];
  const newText = cleanText(text);
  if (!newText) return textStatus['empty'];
  const myRegex = /^[a-z]+$/;
  const words = newText.split(/\s+/);
  for (const word of words) {
    if (word && !myRegex.test(word)) return textStatus['invalid'];
  }
  return textStatus['valid'];
};

const cleanText = (text = '') => {
  let newText = text.split(/\s+/).filter((elm) => elm != '');
  return newText.join(' ');
};

export const getText = () => {
  const text = document.querySelector('textarea').value;
  const resultCheckText = checkText(text);
  const isValidText = textStates[resultCheckText].value;
  if (isValidText) {
    return cleanText(text);
  } else {
    const errorMsg = textStates[resultCheckText].userMsg;
    if (resultCheckText === textStatus['invalid']) {
      showNotification('info', errorMsg);
    }
    if (resultCheckText === textStatus['empty']) {
      showNotification('error', errorMsg);
    }
    return false;
  }
};
