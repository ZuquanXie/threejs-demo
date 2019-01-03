import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Vector3,
    Color,
    Float32BufferAttribute,
    AxesHelper,
    QuadraticBezierCurve3,
    BufferGeometry,
    LineBasicMaterial,
    MeshBasicMaterial,
    Line
} from 'three';
import createArrowHelper from '../tools/arrowHelper';
import {
    createCurveLine
} from './tools';

const renderer = new WebGLRenderer({ antialias: true });
const scene = new Scene();
let camera, animationState;

const animationList = [];

function render() {
    renderer.render(scene, camera);
}

function animate() {
    if (animationState === 1) {
        for (let i = 0, l = animationList.length; i < l; i++) {
            animationList[i].update();
        }
        render();
    }
    requestAnimationFrame(animate);
}

function addAnimation(name, update) {
    animationList.push({ name, update });
}

function removeAnimation(name) {
    let newLength;
    let newList = [];
    for (let i = 0, l = animationList.length; i < l; i++) {
        if (animationList[i].name !== name) {
            newList.push(animationList[i]);
        }
    }
    newLength = newList.length;
    animationList.length = newLength;
    for (let i = 0; i < newLength; i++) {
        animationList[i] = newList[i];
    }
}

function createDrawLineAnimation (points, circleTime = 1) {
    const pointNum = points.length;
    let drawLength = 0;

    const geometry = new BufferGeometry();
    const material = new LineBasicMaterial({ color: 0x0000ff });

    scene.add(new Line(geometry, material));

    const update = () => {
        const positions = [];
        for (let i = 0, l = pointNum * drawLength; i < l; i++) {
            positions.push(points[i].x);
            positions.push(points[i].y);
            positions.push(points[i].z);
        }
        geometry.addAttribute('position', new Float32BufferAttribute(positions, 3));
        if (drawLength >= 1) {
            drawLength = 0;
        } else {
            drawLength += 0.01;
        }
    };

    addAnimation('drawLine', update);
}

export default (width, height, container) => {
    renderer.setSize(width, height);

    camera = new PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 100);

    scene.background = new Color(0xffffff);

    // helper
    //scene.add( createArrowHelper(40) );
    scene.add( new AxesHelper(1000) );

    const curve = createCurveLine([-100, 0, 0], [100, 0, 0], 100);
    const curvePoints = curve.getPoints(100);
    createDrawLineAnimation(curvePoints);

    container.appendChild(renderer.domElement);

    animationState = 1;
    animate();
};
