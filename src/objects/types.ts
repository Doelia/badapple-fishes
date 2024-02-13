import {Fish} from "./Fish.ts";

export interface Entities {
    ref: {
        fishes: Fish[]
    }
}

export interface MapInterface {
    getDot(point : Point): DotMap;
    filterLivable(points: DotMap[], livable: boolean): DotMap[];
    project({x, y}: Point): DotMap|null;
    loadFromImage(image: ImageData): void;
    getImage(): HTMLVideoElement;
}

export interface MapRef {
    ref: MapInterface
}

export interface Point {
    x: number;
    y: number;
}

export interface DotMap extends Point {
    livable: boolean;
}
