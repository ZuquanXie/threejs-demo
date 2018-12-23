import {
    Scene, PerspectiveCamera, WebGLRenderer,
    Vector3, BufferGeometry, BoxBufferGeometry, CubicBezierCurve3,
    MeshBasicMaterial, LineDashedMaterial,
    Mesh, Line,
    Group
} from 'three';

function getCurveLine(material, points, num) {
    const newPoints = new Array(num);
    let i = 0;
    while(i < num) {
        newPoints[i] = points[i];
        i++;
    }
    const geometry = new BufferGeometry().setFromPoints(newPoints);
    return new Line(geometry, material);
}

export default (width, height, container) => {
    // scene
    const scene = new Scene();

    // camera
    const camera = new PerspectiveCamera(100, width / height, 1, 2000);
    camera.position.set(0, 0, 100);

    // renderer
    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // elements group
    const group = new Group();

    // create box
    const boxGeometry = new BoxBufferGeometry(100, 70, 0);
    const boxMaterial = new MeshBasicMaterial({ color: 0x0066aa });
    const box = new Mesh(boxGeometry, boxMaterial);
    group.add(box);

    // create curve lines
    const curve = new CubicBezierCurve3(
        new Vector3(-50, -35, 0),
        new Vector3(-50, -35, 60),
        new Vector3(50, 35, 60),
        new Vector3(50, 35, 0)
    );
    const points = curve.getPoints(100);
    const curveMaterial = new LineDashedMaterial({
        color: 0xeeffff,
        dashSize: 8,
        gapSize: 0.5
    });
    let curveObj = getCurveLine(curveMaterial, points, 0);
    group.add(curveObj);

    // add elements to scene
    group.rotateX(-45 / 180 * Math.PI);
    scene.add(group);

    // animate
    let current = 0;
    function animate() {
        let pointNum = Math.floor(current);
        if (pointNum <= 100) {
            group.remove(curveObj);
            curveObj = getCurveLine(curveMaterial, points, pointNum);
            group.add(curveObj);
            current += 1;
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    }
    animate();
};
