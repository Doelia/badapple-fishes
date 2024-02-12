import {useEffect, useRef} from "preact/hooks";
import {toRadians} from "../engine/fnTrigo.ts";
import {HEIGHT, WIDTH, ZOOM} from "../globals.ts";
import beeBlack from "../assets/fish.png";
import beeWhite from "../assets/fish_white.png";
import {Entities, MapRef} from "../types.ts";
import {usePerformanceStore} from "../stores/performancesStore.ts";
import {useParametersStore} from "../stores/parametersStore.ts";
import {useNextFrame} from "../hooks/useNextFrame.ts";

export default function TurtleCanvas({entities, map}: {entities: Entities, map: MapRef}) {

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refContext = useRef<CanvasRenderingContext2D | null>(null);

    const beeWhiteRef = useRef(null);
    const beeBlackRef = useRef(null);

    useEffect(() => {

        const canvas = refCanvas.current;
        if (!canvas) return;

        refContext.current = canvas.getContext("2d");

        function setCanvasSize() {
            canvas.width = WIDTH * ZOOM;
            canvas.height = HEIGHT * ZOOM;
        }

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize()

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        }

    }, []);

    function render() {

        const start = performance.now();

        const canvas = refCanvas.current;
        const ctx = refContext.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        let size = useParametersStore.getState().turtleSize;
        for (let t of entities.ref.fishes) {
            let dot = map.ref.project(t);
            let img = (dot && dot.livable) ? beeBlackRef.current : beeWhiteRef.current;
            rotateAndPaintImage(ctx, img, toRadians(t.angle), t.x*ZOOM, t.y*ZOOM, size, size);
        }

        const end = performance.now();
        usePerformanceStore.getState().setTimeToRender(end - start);
    }

    useNextFrame(render);

    return (
        <>
            <div id="mapcanvas">
            <div id="canvas_assets" style={{display: 'none'}}>
                <img src={beeBlack} alt="" ref={beeBlackRef} />
                <img src={beeWhite} alt="" ref={beeWhiteRef} />
            </div>
            <canvas ref={refCanvas}></canvas>
            </div>
        </>
    )
}

function rotateAndPaintImage(context: CanvasRenderingContext2D, image: CanvasImageSource, angleInRad: number, positionX: number, positionY: number, width: number, height: number) {
    context.translate(positionX, positionY);
    context.rotate( angleInRad);
    context.drawImage( image, -width/2, -height/2, width, height);
    context.rotate(-angleInRad);
    context.translate(-positionX, -positionY);
}


