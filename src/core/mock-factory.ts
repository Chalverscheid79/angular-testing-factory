/**
 * @fileoverview Core Mock Factory System
 *
 * @description
 * Universal mock factory für alle Angular Services mit TypeScript satisfies
 * operator für compile-time mock drift prevention.
 */

import { Provider } from '@angular/core';

/**
 * Erstellt typsichere Mock-Objekte für beliebige Angular Services.
 *
 * @template T Der Service-Typ der gemockt werden soll
 * @param defaultMocks Standard-Mock-Implementierungen für Service-Methoden
 * @param overrides Optionale Überschreibungen für spezifische Methoden
 * @returns Vollständig typisiertes Mock-Objekt mit Mock Drift Prevention
 *
 * @example
 * ```typescript
 * const mockService = createMockService<MyService>({
 *   getData: jest.fn(() => of([])),
 *   saveData: jest.fn(() => Promise.resolve())
 * }, {
 *   getData: jest.fn(() => of([customData]))
 * });
 * ```
 */
export const createMockService = <T>(
  defaultMocks: Partial<jest.Mocked<T>>,
  overrides: Partial<jest.Mocked<T>> = {}
): Partial<jest.Mocked<T>> => {
  return {
    ...defaultMocks,
    ...overrides
  } satisfies Partial<jest.Mocked<T>>;
};

/**
 * Erstellt Angular Provider für beliebige Mock-Services.
 *
 * @template T Der Service-Typ
 * @param token Der Angular Injection Token
 * @param mockService Das Mock-Service-Objekt
 * @returns Angular Provider für TestBed-Konfiguration
 *
 * @example
 * ```typescript
 * const provider = createMockProvider(MyService, mockMyService);
 * TestBed.configureTestingModule({ providers: [provider] });
 * ```
 */
export const createMockProvider = <T>(
  token: unknown, 
  mockService: Partial<jest.Mocked<T>>
): Provider => {
  return { provide: token, useValue: mockService };
};
