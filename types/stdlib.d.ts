declare module "@stdlib/plot/ctor" {
  export class Plot {
    constructor(options: { x?: any[]; y?: any[]; [key: string]: any });
    render(): string;
  }
}

declare module "@stdlib/stats/mean" {
  function mean(x: number[]): number;
  export = mean;
}
