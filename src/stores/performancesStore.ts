import {create, StoreApi, UseBoundStore} from "zustand";

export type PerformanceStore = {
    timeToCompute: number,
    setTimeToCompute: (v: number) => void,

    nCompute: number,
    setNCompute: (v: number) => void,
    nMaxCompute: number,
    setNMaxCompute: (v: number) => void,

    timeToRender: number,
    setTimeToRender: (v: number) => void,

    timeToRenderVideo: number,
    setTimeToRenderVideo: (v: number) => void,
}

export const usePerformanceStore: UseBoundStore<StoreApi<PerformanceStore>> = create((set): PerformanceStore => ({
    timeToCompute: 0,
    setTimeToCompute: (timeToCompute: number) => set(() => ({ timeToCompute })),

    nCompute: 0,
    setNCompute: (nCompute: number) => set(() => ({ nCompute })),
    nMaxCompute: 0,
    setNMaxCompute: (nMaxCompute: number) => set(() => ({ nMaxCompute })),

    timeToRender: 0,
    setTimeToRender: (timeToRender: number) => set(() => ({ timeToRender })),

    timeToRenderVideo: 0,
    setTimeToRenderVideo: (timeToRenderVideo: number) => set(() => ({ timeToRenderVideo })),
}))
