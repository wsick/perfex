var perfex;
(function (perfex) {
    var phaseTimings = [];
    var phases = (function () {
        function phases() {
        }
        Object.defineProperty(phases, "current", {
            get: function () {
                return phaseTimings[phaseTimings.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        phases.start = function (tag) {
            phaseTimings.push({
                tag: tag,
                start: performance.now(),
                duration: NaN
            });
        };
        return phases;
    })();
    perfex.phases = phases;
})(perfex || (perfex = {}));
var perfex;
(function (perfex) {
    var timings = [];
    var markers = [];
    var timer = (function () {
        function timer() {
        }
        timer.getTimings = function () {
            return timings.slice(0);
        };
        timer.reset = function () {
            timings.length = 0;
        };
        timer.start = function (tag) {
            markers.push({
                tag: tag,
                start: performance.now()
            });
        };
        timer.stop = function () {
            var marker = markers.pop();
            timings.push({
                tag: marker.tag,
                phase: perfex.phases.current,
                start: marker.start,
                duration: performance.now() - marker.start
            });
        };
        return timer;
    })();
    perfex.timer = timer;
})(perfex || (perfex = {}));
//# sourceMappingURL=perfex.js.map