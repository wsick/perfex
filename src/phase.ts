module perfex {
    var phaseTimings: IPhase[] = [];
    export interface IPhase {
        tag: string;
        start: number;
        duration: number;
    }

    export class phases {
        static get current (): IPhase {
            return phaseTimings[phaseTimings.length - 1];
        }

        static start (tag: string) {
            phaseTimings.push({
                tag: tag,
                start: performance.now(),
                duration: NaN
            });
        }
    }
}