import {Point} from "../objects/types.ts";

export function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

export function cos(degrees: number) {
    return Math.cos(toRadians(degrees));
}

export function sin(degrees: number) {
    return Math.sin(toRadians(degrees));
}

export const toDegrees = (radians: number): number  => radians * 180 / Math.PI;

export const angleTo = (from: Point, to: Point): number => toDegrees(Math.atan2(to.y - from.y, to.x - from.x));

export const substrateAngles = (h1: number, h2: number) => {
    if (h1 < 0 || h1 >= 360) {
        h1 = (h1 % 360 + 360) % 360;
    }
    if (h2 < 0 || h2 >= 360) {
        h2 = (h2 % 360 + 360) % 360;
    }
    const diff = h1 - h2;
    if (diff > -180 && diff <= 180) {
        return diff;
    } else if (diff > 0) {
        return diff - 360;
    } else {
        return diff + 360;
    }
}
