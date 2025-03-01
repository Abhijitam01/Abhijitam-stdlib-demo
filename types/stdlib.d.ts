declare module "@stdlib/plot/*" {
  export class Plot {
    constructor(options: {
      x: any[];
      y: any[];
      type?: string;
      title?: string;
      xLabel?: string;
      yLabel?: string;
      [key: string]: any;
    });
    render(): string;
  }
}

declare module "@stdlib/stats/base/mean" {
  function mean(N: number, x: number[], stride: number): number;
  export default mean;
}

declare module "dotenv" {
  export function config(): { parsed: { [key: string]: string } };
}
