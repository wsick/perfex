module perfex {
    var timings: ITiming[] = [];
    export interface ITiming {
        tag: string;
        phase: IPhase;
        start: number;
        duration: number;
    }

    var markers: IMarker[] = [];
    interface IMarker {
        tag: string;
        start: number;
    }

    export class timer {
        static get all () {
            return timings.slice(0);
        }

        static reset () {
            timings.length = 0;
        }

        static start (tag: string) {
            markers.push({
                tag: tag,
                start: performance.now()
            });
        }

        static stop () {
            var marker = markers.pop();
            timings.push({
                tag: marker.tag,
                phase: phases.current,
                start: marker.start,
                duration: performance.now() - marker.start
            });
        }
    }
}