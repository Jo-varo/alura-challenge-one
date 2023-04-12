export const encrypter = (text = '') => {
  if (text.length === 0) return;
  const letterValues = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
  };
  const words = text.split(' ');

  let newText = words.map((word) =>
    word
      .split('')
      .map((letter) => (letterValues[letter] ? letterValues[letter] : letter))
      .join('')
  );

  return newText.join(' ');
};

export const decrypter = (text = '') => {
  if (text.length === 0) return;
  const words = text.split(' ');

  let newText = words.map((word) => decryptWord(word));

  return newText.join(' ');
};

const decryptWord = (word = '') => {
  const skipIndex = {
    a: 2,
    e: 5,
    i: 4,
    o: 4,
    u: 4,
  };

  let result = [];

  for (let i = 0; i < word.length; i) {
    const letter = word[i];
    if (skipIndex[letter]) {
      result.push(letter);
      i += skipIndex[letter];
    } else {
      result.push(letter);
      i++;
    }
  }
  return result.join('');
};
