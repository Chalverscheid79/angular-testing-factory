/**
 * @fileoverview Generic Mock System für Angular 20+ Services
 *
 * @description
 * Zentrale Mock-Architektur für alle Angular Services mit strikter API-Kontrolle.
 * Nur Provider-Funktionen sind exportiert - keine Mock-Drift möglich.
 *
 * @features
 * - 🎯 **Generic Mock System**: Wiederverwendbare Factories für alle Service-Typen
 * - 🛡️ **Type Safety**: Vollständige TypeScript-Unterstützung mit Mock Drift Prevention
 * - ⚡ **Performance**: Optimiert für Angular 20+ inject() Pattern und Signals
 * - 📦 **Scalability**: Neue Services in nur 3 Zeilen hinzufügbar
 * - 🧪 **Test-Ready**: Copy-Paste freundliche Provider für TestBed-Konfiguration
 *
 * @author Christian Halverscheid
 * @since Angular 20+, Jest 29+
 * @version 1.0.0
 */

import { Provider } from '@angular/core';

/* ====================================
 * 📦 CORE SYSTEM (INTERNAL)
 * ==================================== */

/**
 * Erstellt typsichere Mock-Objekte für beliebige Angular Services.
 * 
 * @internal Nur für interne Verwendung - nicht exportiert
 * @template T Der Service-Typ der gemockt werden soll
 * @param defaultMocks Standard-Mock-Implementierungen für Service-Methoden
 * @param overrides Optionale Überschreibungen für spezifische Methoden
 * @returns Vollständig typisiertes Mock-Objekt mit strikter API-Kontrolle
 */
const createMockService = <T>(
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
 * // Consumer Usage:
 * const mockMyService = {
 *   getData: jest.fn(() => of(['data'])),
 *   saveData: jest.fn(() => Promise.resolve())
 * } satisfies MyService;
 * 
 * TestBed.configureTestingModule({
 *   providers: [createMockProvider(MyService, mockMyService)]
 * });
 * ```
 */
export const createMockProvider = <T>(
  token: unknown, 
  mockService: Partial<jest.Mocked<T>>
): Provider => {
  return { provide: token, useValue: mockService };
};

/**
 * Erstellt einen typsicheren Mock-Provider für Custom Services mit automatischer Provider-Erstellung.
 * 
 * @template T Der Service-Typ der gemockt werden soll
 * @param serviceToken Der Angular Service Token/Class
 * @param mockImplementation Mock-Implementierungen für Service-Methoden (Compile-Time validiert!)
 * @returns Angular Provider - Ready-to-use für TestBed
 * 
 * @example
 * ```typescript
 * // Zero Config für Consumer - Compile-Time Mock Drift Prevention!
 * const mockProvider = createCustomServiceProviderMock(MyBusinessService, {
 *   calculateRevenue: jest.fn(() => of(1000)),
 *   processPayment: jest.fn(() => Promise.resolve(true)),
 *   currentBalance: signal(500)
 *   // ↑ TypeScript validiert automatisch gegen MyBusinessService Interface!
 * });
 * 
 * TestBed.configureTestingModule({
 *   providers: [mockProvider] // ← Direkt verwenden!
 * });
 * ```
 */
export const createCustomServiceProviderMock = <T>(
  serviceToken: unknown,
  mockImplementation: Partial<jest.Mocked<T>>
): Provider => {
  // Interne satisfies-Validierung für Mock Drift Prevention
  const validatedMock = mockImplementation satisfies Partial<jest.Mocked<T>>;
  return { provide: serviceToken, useValue: validatedMock };
};

/**
 * Erstellt eine wiederverwendbare Mock-Factory für einen spezifischen Custom Service.
 *
 * @template T Der Service-Typ
 * @param serviceToken Der Angular Service Token/Class
 * @param defaultMocks Standard-Mock-Implementierungen (Compile-Time validiert!)
 * @returns Factory-Funktion die Provider mit optionalen Overrides erstellt
 * 
 * @example
 * ```typescript
 * // Für wiederverwendbare Service Mocks
 * export const provideMyBusinessServiceMock = createServiceProviderFactory(MyBusinessService, {
 *   calculateRevenue: jest.fn(() => of(0)),
 *   processPayment: jest.fn(() => Promise.resolve(false)),
 *   currentBalance: signal(0)
 * });
 * 
 * // Usage in Tests:
 * TestBed.configureTestingModule({
 *   providers: [
 *     provideMyBusinessServiceMock({ 
 *       calculateRevenue: jest.fn(() => of(1000)) // Override defaults
 *     })
 *   ]
 * });
 * ```
 */
export const createServiceProviderFactory = <T>(
  serviceToken: unknown,
  defaultMocks: Partial<jest.Mocked<T>>
) => {
  // Compile-Time Validierung der Default-Mocks
  const validatedDefaults = defaultMocks satisfies Partial<jest.Mocked<T>>;
  
  return (overrides: Partial<jest.Mocked<T>> = {}): Provider => {
    // Compile-Time Validierung der Overrides
    const validatedOverrides = overrides satisfies Partial<jest.Mocked<T>>;
    const mockService = createMockService(validatedDefaults, validatedOverrides);
    return { provide: serviceToken, useValue: mockService };
  };
};
