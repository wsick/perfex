var perfex;
(function (perfex) {
    perfex.version = '0.1.2';
})(perfex || (perfex = {}));
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
        Object.defineProperty(phases, "all", {
            get: function () {
                return phaseTimings.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        phases.getUniqueTags = function () {
            return phases.all.map(function (t) { return t.tag; }).reduce(function (agg, cur) {
                if (agg.indexOf(cur) > -1)
                    return agg;
                return agg.concat([cur]);
            }, []);
        };
        phases.start = function (tag) {
            var cur = phases.current;
            if (cur) {
                cur.duration = performance.now() - cur.start;
            }
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
        Object.defineProperty(timer, "all", {
            get: function () {
                return timings.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        timer.get = function (tag, phase) {
            return timer.all.filter(function (m) { return tag == null || m.tag === tag; }).filter(function (m) { return phase == null || m.phase.tag === phase; });
        };
        timer.getUniqueTags = function () {
            return timer.all.map(function (t) { return t.tag; }).reduce(function (agg, cur) {
                if (agg.indexOf(cur) > -1)
                    return agg;
                return agg.concat([cur]);
            }, []);
        };
        timer.reset = function () {
            timings.length = 0;
        };
        timer.start = function (tag, context) {
            markers.push({
                tag: tag,
                context: context,
                start: performance.now()
            });
        };
        timer.stop = function () {
            var marker = markers.pop();
            timings.push({
                tag: marker.tag,
                context: marker.context,
                phase: perfex.phases.current,
                start: marker.start,
                duration: performance.now() - marker.start
            });
        };
        return timer;
    })();
    perfex.timer = timer;
})(perfex || (perfex = {}));
var perfex;
(function (perfex) {
    function table() {
        var tags = perfex.timer.getUniqueTags();
        var phases = perfex.phases.getUniqueTags();
        var records = tags.map(function (tag) {
            return phases.map(function (phase) { return new TimingRecord(tag, phase); }).concat([new TimingRecord(tag, null)]);
        });
        //Totals Record
        var totals = phases.map(function (phase) { return new TimingRecord(null, phase); }).concat([new TimingRecord(null, null)]);
        var data = records.concat([totals]).map(function (rec) {
            var mk = rec[0].timerTag;
            var obj = { "(marker)": mk || "Total" };
            rec.filter(function (tr) { return !isNaN(tr.percentage); }).forEach(function (tr) { return tr.mapOnto(obj); });
            return obj;
        }).filter(function (datum) { return datum['[Total](ms)'] > 0; });
        console.table(data);
    }
    perfex.table = table;
    var TimingRecord = (function () {
        function TimingRecord(timerTag, phaseTag) {
            this.timerTag = timerTag;
            this.phaseTag = phaseTag;
            this.total = perfex.total(this.timerTag, this.phaseTag);
            this.percentage = this.total / perfex.total(null, this.phaseTag) * 100;
        }
        TimingRecord.prototype.mapOnto = function (obj) {
            var phaseName = this.phaseTag || "[Total]";
            obj[phaseName + '(ms)'] = round(this.total, 2);
            obj[phaseName + '(%)'] = round(this.percentage, 2);
        };
        return TimingRecord;
    })();
    function round(num, digits) {
        var factor = Math.pow(10, digits);
        return Math.round(num * factor) / factor;
    }
})(perfex || (perfex = {}));
var perfex;
(function (perfex) {
    function total(tag, phase) {
        return perfex.timer.get(tag, phase).sort(function (a, b) { return (a.start === b.start) ? 0 : (a.start < b.start ? -1 : 1); }).reduce(function (agg, cur) {
            if (timingsContain(agg, cur))
                return agg;
            return agg.concat([cur]);
        }, []).reduce(function (agg, m) { return agg + (m.duration || 0); }, 0);
    }
    perfex.total = total;
    function timingsContain(timings, test) {
        return timings.some(function (timing) { return timing.tag === test.tag && timingContains(timing, test); });
    }
    function timingContains(timing, test) {
        return (timing.start < test.start) && ((timing.start + timing.duration) > (test.start + test.duration));
    }
})(perfex || (perfex = {}));
//# sourceMappingURL=perfex.js.map