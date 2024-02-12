import {Turtle} from "./Turtle.ts";
import {HEIGHT, WIDTH} from "../globals.ts";
import {MapRef} from "../types.ts";
import {angleTo, cos, sin} from "./fnTrigo.ts";
import {useParametersStore} from "../stores/parametersStore.ts";

export class Fish extends Turtle {

    tick(map: MapRef) {

        const wiggle = useParametersStore.getState().wiggle;

        let getAngleAvoidingWalls = this.getAngleAvoidingWalls(WIDTH, HEIGHT);
        if (getAngleAvoidingWalls !== null) {
            this.angle = getAngleAvoidingWalls;
            this.forward();
            return;
        }

        const myDot = map.ref.project(this);

        if (!myDot) {
            this.forward();
            return;
        }

        const isInBlack = myDot.livable;

        let speed = 1;


        const around = this.getAroundPositions(isInBlack)
            .map(p => map.ref.project(p))
            .filter(d => !!d);

        if (myDot.livable) { // Je suis dans le noir
            const whites = map.ref.filterLivable(around, false);
            if (whites.length) {
                speed = .5;
                let angle = angleTo(whites[0], this);
                this.moveToAngleAtMost(angle, 80);
            } else {
                this.wiggle(wiggle);
            }
        } else { // je suis dans le blanc
            this.wiggle(wiggle);
            const blacks = map.ref.filterLivable(around, true);
            if (blacks.length) {
                speed = 2;
                let angle = angleTo(this, blacks[0]);
                this.moveToAngleAtMost(angle, 360);
            } else {
                this.wiggle(wiggle);
            }
        }

        this.forward(speed);
    }

    getAroundPositions(isInBlack: boolean) {

        let VISION_DISTANCE = 0;
        if (isInBlack) {
            VISION_DISTANCE = useParametersStore.getState().black_vision_distance
        } else {
            VISION_DISTANCE = useParametersStore.getState().white_vision_distance
        }

        return [{
            x: this.x + cos(this.angle) * VISION_DISTANCE,
            y: this.y + sin(this.angle) * VISION_DISTANCE,
            angle: 0,
        }, {
            x: this.x + cos(this.angle + 45) * VISION_DISTANCE,
            y: this.y + sin(this.angle + 45) * VISION_DISTANCE,
            angle: 45,
        }, {
            x: this.x + cos(this.angle - 45) * VISION_DISTANCE,
            y: this.y + sin(this.angle - 45) * VISION_DISTANCE,
            angle: -45
        }]
        .filter(v => v.x >= 0 && v.x < WIDTH && v.y >= 0 && v.y < HEIGHT);
    }
}
