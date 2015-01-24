module perfex {
    export function total (tag: string, phase?: string): number {
        return timer.get(tag, phase)
            .reduce((agg, m) => agg + (m.duration || 0), 0);
    }
}