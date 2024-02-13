import {Entities} from "./objects/types.ts";
import {initEngine} from "./engine/engine.ts";
import TurtleCanvas from "./components/TurtleCanvas.tsx";
import {SceneMap} from "./objects/SceneMap.ts";
import Video from "./components/Video.tsx";
import Params from "./components/Params.tsx";
import {useParametersStore} from "./stores/parametersStore.ts";
import {HEIGHT, WIDTH, ZOOM} from "./globals.ts";

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
    <>
        <div id="background_white" style={{width: WIDTH, height: HEIGHT, zoom: ZOOM, position: 'fixed', top: 0, left: 0, background: 'white'}}></div>
        { renderTurtles && <TurtleCanvas  entities={entities} map={map} /> }
        <div id="video_container" style={{width: WIDTH, height: HEIGHT, zoom: ZOOM, position: 'fixed', top: 0, left: 0 }}>
            <Video map={map}></Video>
        </div>
        <Params></Params>
    </>
  )
}
