import {cos, sin, substrateAngles} from "../engine/fnTrigo.ts";
import {useParametersStore} from "../stores/parametersStore.ts";

export class Turtle {

    constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    x;
    y;
    angle = 0;
    speed = 1;

    reguleSpeed() {
        if (this.speed > .9 && this.speed < 1.1) {
            return this.speed = 1;
        }

        if (this.speed > 1) {
            this.decrSpeed();
        } else {
            this.incrSpeed();
        }
    }

    incrSpeed() {
        this.speed *= 1.05;
    }

    decrSpeed() {
        this.speed /= 1.005;
    }

    normalizeSpeed() {
        if (this.speed > 2) {
            this.speed = 2;
        }
        if (this.speed < .5) {
            this.speed = .5;
        }
    }

    wiggle(max_angle: number) {
        this.angle += Math.random() * max_angle;
        this.angle -= Math.random() * max_angle;
    }

    moveToAngleAtMost(angleTarget: number, max=360): void {
        let sub = substrateAngles(angleTarget, this.angle);
        this.turnAtMost(sub, max);
    }

    turnAtMost(turn: number, max: number =360): void {
        this.angle =  Math.abs(turn) > max ? this.angle + (turn > 0 ? max : -max) : this.angle + turn;
    }

    getAngleAvoidingWalls(width: number, height: number) {
        if (this.x <= 0) {
            return 0;
        }
        if (this.x >= width) {
            return 180;
        }
        if (this.y <= 0) {
            return 90;
        }
        if (this.y >= height) {
            return 270;
        }
        return null;
    }

    forward(speed: number = 1) {
        const dist = useParametersStore.getState().speed / 4 * speed;
        this.x = this.x + cos(this.angle) * dist;
        this.y = this.y + sin(this.angle) * dist;
    }

}
