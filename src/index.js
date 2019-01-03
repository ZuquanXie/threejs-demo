import './index.css';
import textureCanvas from './texture-canvas';

window.onload = function() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    textureCanvas(winWidth, winHeight, document.body);
};
