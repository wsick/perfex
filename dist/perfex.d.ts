declare module perfex {
    var version: string;
}
declare module perfex {
    interface IPhase {
        tag: string;
        start: number;
        duration: number;
    }
    class phases {
        static current: IPhase;
        static all: IPhase[];
        static getUniqueTags(): string[];
        static start(tag: string): void;
    }
}
declare module perfex {
    interface ITiming {
        tag: string;
        context: any;
        phase: IPhase;
        start: number;
        duration: number;
    }
    class timer {
        static all: ITiming[];
        static get(tag?: string, phase?: string): ITiming[];
        static getUniqueTags(): string[];
        static reset(): void;
        static start(tag: string, context: any): void;
        static stop(): void;
    }
}
interface Console {
    table(data: any[]): any;
}
declare module perfex {
    function table(): void;
}
declare module perfex {
    function total(tag: string, phase?: string): number;
}
