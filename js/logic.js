import { encrypter, decrypter } from './helpers.js';


//TODO: delete logs to console

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

const stopSubmit = () => {
  const form = document.querySelector('form');
  form.onsubmit = (e) => e.preventDefault();
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

const getText = () => {
  const text = document.querySelector('textarea').value;
  const resultCheckText = checkText(text);
  const isValidText = textStates[resultCheckText].value;
  if (isValidText) {
    return cleanText(text);
  } else {
    if (resultCheckText === textStatus['invalid']) {
      alert(textStates[resultCheckText].userMsg);
    }
    if (resultCheckText === textStatus['empty']) {
      alert(textStates[resultCheckText].userMsg);
    }
    return false;
  }
};

// Interacting with DOM elements

const getButtons = () => {
  const allButtons = document.querySelectorAll('button');
  let btnEncrypt, btnDecrypt, btnCopy;

  for (let button of allButtons) {
    const btnText = button.innerText;
    const myButtons = ['Encriptar', 'Desencriptar', 'Copiar'];
    if (myButtons.includes(btnText)) {
      const secondClass = button.classList[1];
      if (secondClass.includes('encrypt')) {
        btnEncrypt = button;
      }
      if (secondClass.includes('decrypt')) {
        btnDecrypt = button;
      }
      if (secondClass.includes('copy')) {
        btnCopy = button;
      }
    }
  }
  return { btnEncrypt, btnDecrypt, btnCopy };
};

const getParagraphResult = () => {
  return document.getElementsByClassName('result-text')[0].children[0];
};

const writeResult = (elementP, text = '') => {
  elementP.innerText = text;
};

const hideStartResult = () => {
  const startResult = document.getElementById('start-result');
  const result = document.getElementById('result');

  startResult.classList = ['d-none'];
  result.classList = [''];
  // console.log(startResult.classList);
  // console.log(result.classList);
};

// Button events
const btnsCryptLogic = () => {
  const text = getText();
  if (!text) return;
  hideStartResult();
  const paragraphResult = getParagraphResult();
  return { text, paragraphResult };
};

const clickBtnEncrypt = (e) => {
  const objResult = btnsCryptLogic();
  if (!objResult) return;

  const { text, paragraphResult } = objResult;
  const result = encrypter(text);
  writeResult(paragraphResult, result);
};

const clickBtnDecrypt = (e) => {
  const objResult = btnsCryptLogic();
  if (!objResult) return;

  const { text, paragraphResult } = objResult;
  const result = decrypter(text);
  writeResult(paragraphResult, result);
};

const clickBtnCopy = (e) => {
  const paragraphResult = getParagraphResult();
  const result = paragraphResult.textContent;
  navigator.clipboard.writeText(result);
  const { btnCopy } = getButtons();

  btnCopy.innerText = 'Copiado';
  btnCopy.disabled = true;
  btnCopy.classList.add('copied')

  setTimeout(() => {
    btnCopy.innerText = 'Copiar';
    btnCopy.disabled = false;
    btnCopy.classList.remove('copied');
  }, 1500);
};

const addButtonEvents = () => {
  const { btnEncrypt, btnDecrypt, btnCopy } = getButtons();
  btnEncrypt.onclick = clickBtnEncrypt;
  btnDecrypt.onclick = clickBtnDecrypt;
  btnCopy.onclick = clickBtnCopy;
};

// textarea enter event
const enterTextarea = () => {
  const textarea = document.querySelector('textarea');
  const { btnEncrypt } = getButtons();

  textarea.onkeydown = (e) => {
    if (e.key === 'Enter') {
      btnEncrypt.click();
      e.preventDefault();
    }
  };
};

(function start() {
  stopSubmit();
  addButtonEvents();
  enterTextarea();
})();
