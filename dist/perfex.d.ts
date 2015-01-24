declare module perfex {
    interface IPhase {
        tag: string;
        start: number;
        duration: number;
    }
    class phases {
        static current: IPhase;
        static start(tag: string): void;
    }
}
declare module perfex {
    interface ITiming {
        tag: string;
        phase: IPhase;
        start: number;
        duration: number;
    }
    class timer {
        static getTimings(): ITiming[];
        static reset(): void;
        static start(tag: string): void;
        static stop(): void;
    }
}
