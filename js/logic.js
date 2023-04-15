import { encrypter, decrypter } from './helpers.js';
import { getText } from './handlingText.js';

const stopSubmit = () => {
  const form = document.querySelector('form');
  form.onsubmit = (e) => e.preventDefault();
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

  startResult.classList.add('hide-start-result');

  setTimeout(() => {
    startResult.classList.add('d-none');
    result.classList.remove('d-none');
  }, 500);

  setTimeout(() => {
    result.classList.add('show-result');
  }, 750);
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
  btnCopy.classList.add('copied');

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
