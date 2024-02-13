import {Entities} from "./objects/types.ts";
import {initEngine} from "./engine/engine.ts";
import TurtleCanvas from "./components/TurtleCanvas.tsx";
import {SceneMap} from "./objects/SceneMap.ts";
import Video from "./components/Video.tsx";
import Params from "./components/Params.tsx";
import {useParametersStore} from "./stores/parametersStore.ts";
import {HEIGHT, WIDTH, ZOOM} from "./globals.ts";
import Profiler from "./components/Profiler.tsx";

const entities: Entities = {
  ref: {
    fishes: [],
  }
};

const map = {
  ref: new SceneMap(WIDTH, HEIGHT)
}

initEngine({entities, map});

export function App() {

  const renderTurtles = useParametersStore().renderTurtles;

  return (
    <div className="container py-2 rounded mt-3" style={{background: '#ebebeb', maxWidth: WIDTH * ZOOM + 20}}>

        <div id="canvas_container" class="" style={{width: WIDTH * ZOOM, height: HEIGHT * ZOOM, background: 'white', margin: 'auto'}}>
            { renderTurtles && <TurtleCanvas  entities={entities} map={map} /> }
        </div>

        <div className="d-flex mt-4 gap-5">
            <div className="col">
                <h2 className="fs-5 text-uppercase">Parameters</h2>
                <Params></Params>
                <hr/>
                <Profiler></Profiler>
            </div>
            <div class="">
                <h2 className="fs-5 text-uppercase">Reference video</h2>
                <div id="video_container" style={{}}>
                    <Video map={map}></Video>
                </div>
            </div>
        </div>

        <div className="d-flex gap-3 justify-content-end border-top mt-3 pt-2">
            <span className="opacity-75 text-uppercase fw-bold">Bad Apple!! But its 5.000 fishes.</span>
            <span class="opacity-50">© 2024</span>
            <a href="https://www.youtube.com/watch?v=bKs2jukK-ME&ab_channel=St%C3%A9phaneWouters">Youtube video</a>
            <a href="https://github.com/Doelia/badapple-fishes">Github</a>
            <a href="https://stephanewouters.fr/">Stéphane W.</a>
        </div>


    </div>
  )
}
