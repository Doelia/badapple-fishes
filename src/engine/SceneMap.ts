import {DotMap, MapInterface, Point} from "../types.ts";
import {HEIGHT, WIDTH} from "../globals.ts";

export class SceneMap implements MapInterface {

    private dots: DotMap[][] = [];
    public image: HTMLVideoElement;

    constructor(width: number, height: number) {
        for (let x = 0; x < width; x++) {
            this.dots[x] = [];
            for (let y = 0; y < height; y++) {
                this.dots[x][y] = {
                    x, y,
                    livable: x > 200 && x < 300 && y > 200 && y < 300
                };
            }
        }
    }

    getImage() {
        return this.image;
    }

    loadFromImage(image: ImageData) {
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                const i = (y * WIDTH + x) * 4;
                const isWhite = image.data[i] > 50;
                this.dots[x][y].livable = !isWhite;
            }
        }
    }

    filterLivable(points: DotMap[], vivable: boolean): DotMap[] {
        return points.filter(d => d && d.livable === vivable);
    }

    getDot({x,y}: Point): DotMap|null {
        return this.dots[x][y];
    }

    project({x, y}: Point): DotMap|null {
        const dimX = this.dots[Math.round(x)];
        if (!dimX) {
            // console.error(Math.round(x), Math.round(y));
            return null;
        }
        return dimX[Math.round(y)];
    }

}
