// Mock for Angular Core
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

export interface Provider {
  provide: unknown;
  useValue?: unknown;
  useClass?: new (...args: unknown[]) => unknown;
  useFactory?: (...args: unknown[]) => unknown;
  deps?: unknown[];
}

export class InjectionToken<T = unknown> {
  constructor(public description: string) {}
  
  toString(): string {
    return `InjectionToken ${this.description}`;
  }
}

export interface ElementRef<T = any> {
  nativeElement: T;
}
