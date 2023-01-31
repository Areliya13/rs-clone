import './style.scss';

const header = document.createElement('h2');
header.textContent = 'Test!';
document.body.append(header);

setTimeout(() => {
  header.textContent = 'WOW';
}, 1500);

setTimeout(() => {
  header.textContent = 'Once more!';
}, 3000);