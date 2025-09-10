/**
 * @fileoverview Type Definitions
 *
 * @description
 * Central type definitions für das Testing Framework
 */

/**
 * Mock-Return-Type Helper für bessere Typisierung
 */
export type MockReturnType<T, K extends keyof T> = T[K] extends (...args: any[]) => infer R ? R : never;

/**
 * Observable Mock Helper
 */
export type ObservableMock<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? 
    jest.Mock<R, any[]> : T[K];
};

/**
 * Service Mock Configuration
 */
export interface ServiceMockConfig<T = any> {
  token: any;
  mockFactory: () => Partial<jest.Mocked<T>>;
}
