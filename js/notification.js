/* Developed by Jo-Varo */

const createElement = (element = '', styles = {}, content = '') => {
  const newElement = document.createElement(element);
  Object.keys(styles).map((style) => {
    newElement.style[style] = styles[style];
  });
  if (content) newElement.innerText = content;

  return { newElement };
};

const render = (parent, child) => {
  parent.appendChild(child);
};

const deleteElement = (element) => {
  element.remove();
};

export const showNotification = (variant = '', text = '') =>{
  let color = 'skyblue';

  const colorValues = { error: '#FA9884', info: 'moccasin' };
  if (variant) {
    color = colorValues[variant];
  }

  const root = document.querySelector('html');
  const { newElement: myDiv } = createElement('div', {
    position: 'fixed',
    margin: '0 auto',
    top: '10px',
    left: '0',
    right: '0',
    backgroundColor: color,
    padding: '10px 20px',
    width: '300px',
    borderRadius: '10px',
    opacity: '1',
    transition: 'opacity 0.5s',
  });
  const { newElement: myP } = createElement(
    'p',
    {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      textAlign: 'center',
    },
    text
  );

  render(root, myDiv);
  render(myDiv, myP);

  setTimeout(() => {
    myDiv.style.opacity = '0';
    setTimeout(() => {
      deleteElement(myDiv);
    }, 500);
  }, 1500);
}
