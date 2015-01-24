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
        static get all (): ITiming[] {
            return timings.slice(0);
        }

        static get (tag?: string, phase?: string) {
            return timer.all
                .filter(m => tag == null || m.tag === tag)
                .filter(m => phase == null || m.phase.tag === phase);
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