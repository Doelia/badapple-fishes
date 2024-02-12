import {Entities} from "../types.ts";
import {initEngine} from "../engine/Engine.ts";
import TurtleCanvas from "./TurtleCanvas.tsx";
import {SceneMap} from "../engine/SceneMap.ts";
import Video from "./Video.tsx";
import Params from "./Params.tsx";
import {useParametersStore} from "../stores/parametersStore.ts";
import {HEIGHT, WIDTH, ZOOM} from "../globals.ts";

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
        {/*<MapCanvas map={map} />*/}
        <div id="background_white" style={{width: WIDTH, height: HEIGHT, zoom: ZOOM, position: 'fixed', top: 0, left: 0, background: 'white'}}></div>
        { renderTurtles && <TurtleCanvas  entities={entities} map={map} /> }
        <div id="video_container" style={{width: WIDTH, height: HEIGHT, zoom: ZOOM, position: 'fixed', top: 0, left: 0 }}>
            <Video map={map}></Video>
        </div>
        <Params></Params>
    </>
  )
}
