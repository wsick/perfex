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

        static get all (): IPhase[] {
            return phaseTimings.slice(0);
        }

        static start (tag: string) {
            var cur = phases.current;
            if (cur) {
                cur.duration = performance.now() - cur.start;
            }
            phaseTimings.push({
                tag: tag,
                start: performance.now(),
                duration: NaN
            });
        }
    }
}