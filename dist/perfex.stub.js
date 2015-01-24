if (!perfex.timer) {
    perfex.timer = {
        all: [],
        reset: function () {
        },
        start: function (tag) {
        },
        stop: function () {
        }
    };
}
if (!perfex.phases) {
    perfex.phases = {
        current: null,
        all: [],
        start: function (tag) {
        }
    };
}