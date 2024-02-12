import {useEffect} from "preact/hooks";
import {usePerformanceStore} from "../stores/performancesStore.ts";
import {useForceRender} from "../hooks/useForceRender.ts";
import {useFps} from "../hooks/useFps.ts";

export default function Profiler() {

    const forceRender = useForceRender();
    useFps(forceRender, 10);

    const timeToCompute = usePerformanceStore.getState().timeToCompute.toFixed(2);
    const nMaxCompute = usePerformanceStore.getState().nMaxCompute;
    const mustBeUnder = (1000/240).toFixed(2);

    const timeToRender = usePerformanceStore.getState().timeToRender.toFixed(2);
    const renderMustBeUnder = (1000/60).toFixed(2);

    const timeToRenderVideo = usePerformanceStore.getState().timeToRenderVideo.toFixed(2);

    useEffect(() => {

        let i = setInterval(() => {
            usePerformanceStore.getState().setNMaxCompute(usePerformanceStore.getState().nCompute);
            usePerformanceStore.getState().setNCompute(0);
        }, 1000);

        return () => {
            clearInterval(i);
        }

    }, []);

    return (
        <div>
            <div>time to compute: {timeToCompute}ms ({nMaxCompute} times) ({mustBeUnder} max)</div>
            <div>time to render: {timeToRender}ms ({renderMustBeUnder} max) </div>
            <div>time to render video: {timeToRenderVideo}ms</div>
        </div>
    )


}
