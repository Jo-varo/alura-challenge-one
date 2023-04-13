import { encrypter, decrypter } from './helpers.js';

const stopSubmit = () => {
  const form = document.querySelector('form');
  form.onsubmit = (e) => e.preventDefault();
};

// Functines managing texts
const checkText = (text = '') => {
  // TODO: "ERROR: INGRESA TEXTO"  "ERROR: INGRESA TEXTO CON LAS CONDICIONES"
  //Avoid "catastrophic backtracking"
  if (!text) return false;
  const myRegex = /^[a-z]+$/;
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word && !myRegex.test(word)) return false;
  }
  return true;
};

const cleanText = (text = '') => {
  let newText = text.split(/\s+/);
  if (newText[newText.length - 1] === '') newText.pop();
  return newText.join(' ');
};

const getText = () => {
  const text = document.querySelector('textarea').value;
  if (checkText(text)) {
    return cleanText(text);
  } else {
    alert('Texto invalido');
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

const hideStartResult = () => {
  //TODO: Probar ingresando el estilo al html .style.display
  const startResult = document.getElementById('start-result');
  const result = document.getElementById('result');

  startResult.classList = ['d-none'];
  result.classList = [''];
  // console.log(startResult.classList);
  // console.log(result.classList);
};

// Button events
const btnFunctions = () => {
  const text = getText();
  if (!text) return;
  hideStartResult();
  const paragraphResult = getParagraphResult();
  return { text, paragraphResult };
};

const writeResult = (elementP, text = '') => {
  elementP.innerText = text;
};

const clickBtnEncrypt = (e) => {
  //TODO: FIX ERROR at click empty text
  const { text, paragraphResult } = btnFunctions();
  const result = encrypter(text);
  writeResult(paragraphResult, result);
};

const clickBtnDecrypt = (e) => {
  const { text, paragraphResult } = btnFunctions();
  const result = decrypter(text);
  writeResult(paragraphResult, result);
};

const clickBtnCopy = (e) => {
  const paragraphResult = getParagraphResult();
  const result = paragraphResult.textContent;
  navigator.clipboard.writeText(result);
  alert('texto copiado');
};

const addButtonEvents = () => {
  const { btnEncrypt, btnDecrypt, btnCopy } = getButtons();
  btnEncrypt.onclick = clickBtnEncrypt;
  btnDecrypt.onclick = clickBtnDecrypt;
  btnCopy.onclick = clickBtnCopy;
};

const enterTextarea = () => {
  const textarea = document.querySelector('textarea');
  const { btnEncrypt } = getButtons();
  textarea.onkeyup = (e) => {
    if (e.key === 'Enter') {
      //TODO: PREVENT NEW LINE BREAK
      // e.preventDefault()
      console.log(e);
      btnEncrypt.click();
    }
  };
};

(function start() {
  stopSubmit();
  addButtonEvents();
  enterTextarea();
})();
