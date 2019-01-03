import {
    Vector3,
    Color,
    Group,
    ArrowHelper
} from 'three';

/**
 * 创建箭头辅助对象
 * @param size{Number|Array} 箭头的长度
 * @return Object3D
 */
export default function createArrowHelper(size) {
    if (typeof size === 'number') {
        size = [size, size, size];
    }
    const helper = new Group();
    const origin = new Vector3(0, 0, 0);
    for (let i = 0, l = size.length; i < l; i++) {
        let tempArr = [0, 0, 0];
        tempArr[i] = 1;
        const direction = new Vector3(tempArr[0], tempArr[1], tempArr[2]);
        const color = new Color(tempArr[0], tempArr[1], tempArr[2]);
        direction.normalize();
        helper.add( new ArrowHelper(direction, origin, size[i], color.getHex()) );
    }
    return helper;
}