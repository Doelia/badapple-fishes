import {useEffect, useRef} from "preact/hooks";

export function useFps(fn: Function, fps = 60) {

    const interval = useRef<number>();

    function render() {
        fn();
    }

    useEffect(() => {
        interval.current = setInterval(render, 1000/fps);
        return () => { clearInterval(interval.current) };
    }, []);


}
