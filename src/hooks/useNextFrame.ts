import {useEffect, useRef} from "preact/hooks";

export function useNextFrame(fn: Function) {

    const requestRef = useRef<number>();

    function render() {
        fn();
        requestRef.current = requestAnimationFrame(render);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(render);
        return () => { cancelAnimationFrame(requestRef.current) };
    }, []);

}
