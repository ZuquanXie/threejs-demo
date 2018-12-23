import './index.css';
import demo1 from './demo1';

window.onload = function() {
    const winWidth = document.documentElement.clientWidth;
    const winHeight = document.documentElement.clientHeight;

    demo1(winWidth, winHeight, document.body);
};
