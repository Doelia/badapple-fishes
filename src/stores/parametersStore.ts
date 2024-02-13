import {create, StoreApi, UseBoundStore} from 'zustand'

export type ParametersStore = {

    wiggle: number;
    setWiggle: (v: number) => void;

    turtleSize: number;
    setTurtleSize: (v: number) => void;

    population: number;
    setPopulation: (v: number) => void;

    speed: number,
    setSpeed: (v: number) => void,

    white_vision_distance: number,
    setWhiteVisionDistance: (v: number) => void,

    black_vision_distance: number,
    setBlackVisionDistance: (v: number) => void,

    videoPosition: 'separate' | 'background' | 'live',
    setVideoPosition: (v: 'separate' | 'background' | 'live') => void,

    renderTurtles: boolean,
    toggleRenderTurtles: () => void,

    renderDebugMode: boolean,
    toggleRenderDebugMode: () => void,
}

export const useParametersStore: UseBoundStore<StoreApi<ParametersStore>> = create((set): ParametersStore => ({

    wiggle: 10,
    setWiggle: (wiggle: number) => set(() => ({ wiggle })),

    speed: 4,
    setSpeed: (speed: number) => set(() => ({ speed })),

    turtleSize: 10,
    setTurtleSize: (turtleSize: number) => set(() => ({ turtleSize })),

    population: 2000,
    setPopulation: (population: number) => set(() => ({ population })),

    white_vision_distance: 30,
    setWhiteVisionDistance: (white_vision_distance: number) => set(() => ({ white_vision_distance })),

    black_vision_distance: 5,
    setBlackVisionDistance: (black_vision_distance: number) => set(() => ({ black_vision_distance })),

    videoPosition: 'separate',
    setVideoPosition: (videoPosition: 'separate' | 'background' | 'live') => set(() => ({ videoPosition })),

    renderTurtles: true,
    toggleRenderTurtles: () => set(({ renderTurtles }) => ({ renderTurtles: !renderTurtles })),

    renderDebugMode: false,
    toggleRenderDebugMode: () => set(({ renderDebugMode }) => ({ renderDebugMode: !renderDebugMode })),

}))

