import {useId} from "react";
import {useParametersStore} from "../stores/parametersStore.ts";
import {pause, play} from "../engine/Engine.ts";
import Profiler from "./Profiler.tsx";


export default function Params() {

    const store = useParametersStore();

    return (
        <div style={{position: 'fixed', bottom: 0, left: 0}}>
            <div>
                <button onClick={pause}>pause</button>
                <button onClick={play}>play</button>
            </div>
            <Profiler></Profiler>
            <ParameterSlider title="speed" min={1} max={10} value={store.speed} setValue={store.setSpeed} />
            <ParameterSlider title="white vision distance" min={1} max={100} value={store.white_vision_distance} setValue={store.setWhiteVisionDistance} />
            <ParameterSlider title="black vision distance" min={1} max={30} value={store.black_vision_distance} setValue={store.setBlackVisionDistance} />
            <ParameterSlider title="population" min={1} max={10000} value={store.population} setValue={store.setPopulation} />
            <ParameterSlider title="wiggle" min={0} max={45} value={store.wiggle} setValue={store.setWiggle} />
            <ParameterSlider title="turtle size" min={1} max={30} value={store.turtleSize} setValue={store.setTurtleSize} />

            <div>
                <label htmlFor="videoPosition">Video position</label>
                <select value={store.videoPosition} onChange={(e: any) => store.setVideoPosition(e.target.value as any)}>
                    <option value="corner">corner</option>
                    <option value="background">background</option>
                    <option value="live">live</option>
                </select>
            </div>
            <div>
                <input type="checkbox" checked={store.renderTurtles} onChange={() => store.toggleRenderTurtles()} /> Render turtles
            </div>
        </div>
    );
}

type ParameterSliderPropsType = {
    min: number,
    max: number,
    value: number,
    setValue: (n: number) => void,
    disabled?: boolean,
    title: string,
}

function ParameterSlider({title, min, max, value, setValue, disabled=false}: ParameterSliderPropsType) {

    const id = useId();

    return (
        <div id="params" style={{display: 'flex'}}>
            <input disabled={disabled} className="me-3" type="range" min={min} max={max} value={value} id={id} onChange={(e: any) => setValue(e.target.value)} />
            {title}:
            {value}
        </div>
    )

}
