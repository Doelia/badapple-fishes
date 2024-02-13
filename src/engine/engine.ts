import {Entities, MapRef} from "../objects/types.ts";
import {Fish} from "../objects/Fish.ts";
import {useParametersStore} from "../stores/parametersStore.ts";
import {usePerformanceStore} from "../stores/performancesStore.ts";
import {HEIGHT, WIDTH} from "../globals.ts";


let interval: number;

let tick = () => {};

export function initEngine({entities, map}: {entities: Entities, map: MapRef}) {

    tick = () => {

        let start = performance.now();

        const n_ants_intended = useParametersStore.getState().population;
        for (let i = 0; i < n_ants_intended - entities.ref.fishes.length; i++) {
            entities.ref.fishes.push(new Fish(Math.random() * WIDTH, Math.random() * HEIGHT, Math.random()*360));
        }
        if (entities.ref.fishes.length > n_ants_intended) {
            entities.ref.fishes = entities.ref.fishes.slice(0, n_ants_intended);
        }

        for (let t of entities.ref.fishes) {
            t.tick(map);
        }

        let end = performance.now();

        usePerformanceStore.getState().setTimeToCompute(end - start);
        usePerformanceStore.getState().setNCompute(usePerformanceStore.getState().nCompute + 1);

    }

    play();
}

function play() {
    if (!interval) {
        interval = setInterval(tick, 1000/120);
    }
}

export function playPause() {
    if (interval) {
        clearInterval(interval);
        interval = 0;
    } else {
        interval = setInterval(tick, 1000/120);
    }
}
