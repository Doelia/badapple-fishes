import {useEffect, useRef} from "preact/hooks";
import {MapRef} from "../types.ts";
import {HEIGHT, WIDTH, ZOOM} from "../globals.ts";
import {useParametersStore} from "../stores/parametersStore.ts";
import {usePerformanceStore} from "../stores/performancesStore.ts";
import {useFps} from "../hooks/useFps.ts";

export default function Video({map}: {map: MapRef}) {

    const refVideo = useRef<HTMLVideoElement>(null);
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refContext = useRef<CanvasRenderingContext2D | null>(null);

    const videoPosition = useParametersStore(state => state.videoPosition);

    let style = {};
    switch (videoPosition) {
        case 'corner':
            style = {position: 'fixed', bottom: 0, right: 0, zoom: .5 };
            break;
        case 'background':
            style = {position: 'fixed', top: 0, left: 0, zoom: ZOOM, opacity: .1};
            break;
        case 'live':
            let zoom = .2;
            style = {position: 'absolute', right: 3, bottom: 3, borderRadius: 5, height: HEIGHT * zoom, width: WIDTH*zoom };
            break;
    }

    useEffect(() => {
        const canvas = refCanvas.current;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        refContext.current = canvas.getContext("2d", {});
    }, []);

    useFps(() => {
        let start = performance.now();
        const video = refVideo.current;
        if (!video.paused && !video.ended) {
            const ctx = refContext.current;
            ctx.drawImage(video, 0, 0);
            const image = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            map.ref.loadFromImage(image);
        }
        let end = performance.now();
        usePerformanceStore.getState().setTimeToRenderVideo(end - start);
    }, 30);

    return (
        <>
            <video id="video" src="/badapple.mp4" controls ref={refVideo} autoplay={true} style={style}></video>
            <canvas ref={refCanvas} style={{opacity: 0, background: 'white', display: 'none'}}></canvas>
        </>
    )
}
