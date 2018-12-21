import './index.css';

window.onload = function() {
    const container = document.createElement('div');
    container.setAttribute('id', 'mainContainer');
    document.body.appendChild(container);
    const a = { a: 1, b: 2 };
    const b = { ...a };
    console.log(b)
};
