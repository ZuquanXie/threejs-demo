import { QuadraticBezierCurve3, Vector3 } from 'three';

export function createCurveLine (sp, tp, h) {
    const dx = tp[0] - sp[0];
    return new QuadraticBezierCurve3(
        new Vector3(sp[0], sp[1], sp[2]),
        new Vector3(sp[0] + dx / 2, h, 0),
        new Vector3(tp[0], tp[1], tp[2])
    );
}