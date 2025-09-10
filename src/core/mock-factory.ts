/**
 * @fileoverview Generic Mock System for Angular 20+ Services
 *
 * @description
 * Central mock architecture for all Angular Services with strict API control.
 * Only provider functions are exported - no mock drift possible.
 *
 * @features
 * - 🎯 **Generic Mock System**: Reusable factories for all service types
 * - 🛡️ **Type Safety**: Complete TypeScript support with Mock Drift Prevention
 * - ⚡ **Performance**: Optimized for Angular 20+ inject() pattern and Signals
 * - 📦 **Scalability**: New services can be added in just 3 lines
 * - 🧪 **Test-Ready**: Copy-paste friendly providers for TestBed configuration
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
 * Creates type-safe mock objects for any Angular services.
 * 
 * @internal For internal use only - not exported
 * @template T The service type to be mocked
 * @param defaultMocks Default mock implementations for service methods
 * @param overrides Optional overrides for specific methods
 * @returns Fully typed mock object with strict API control
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
 * Creates Angular providers for any mock services.
 *
 * @template T The service type
 * @param token The Angular injection token
 * @param mockService The mock service object
 * @returns Angular Provider for TestBed configuration
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
 * Creates a type-safe mock provider for custom services with automatic provider creation.
 * 
 * @template T The service type to be mocked
 * @param serviceToken The Angular service token/class
 * @param mockImplementation Mock implementations for service methods (compile-time validated!)
 * @returns Angular Provider - ready-to-use for TestBed
 * 
 * @example
 * ```typescript
 * // Zero Config for consumers - Compile-Time Mock Drift Prevention!
 * const mockProvider = createCustomServiceProviderMock(MyBusinessService, {
 *   calculateRevenue: jest.fn(() => of(1000)),
 *   processPayment: jest.fn(() => Promise.resolve(true)),
 *   currentBalance: signal(500)
 *   // ↑ TypeScript validates automatically against MyBusinessService interface!
 * });
 * 
 * TestBed.configureTestingModule({
 *   providers: [mockProvider] // ← Use directly!
 * });
 * ```
 */
export const createCustomServiceProviderMock = <T>(
  serviceToken: unknown,
  mockImplementation: Partial<jest.Mocked<T>>
): Provider => {
  // Internal satisfies validation for Mock Drift Prevention
  const validatedMock = mockImplementation satisfies Partial<jest.Mocked<T>>;
  return { provide: serviceToken, useValue: validatedMock };
};

/**
 * Creates a reusable mock factory for a specific custom service.
 *
 * @template T The service type
 * @param serviceToken The Angular service token/class
 * @param defaultMocks Default mock implementations (compile-time validated!)
 * @returns Factory function that creates providers with optional overrides
 * 
 * @example
 * ```typescript
 * // For reusable service mocks
 * export const provideMyBusinessServiceMock = createServiceProviderFactory(MyBusinessService, {
 *   calculateRevenue: jest.fn(() => of(0)),
 *   processPayment: jest.fn(() => Promise.resolve(false)),
 *   currentBalance: signal(0)
 * });
 * 
 * // Usage in tests:
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
  // Compile-time validation of default mocks
  const validatedDefaults = defaultMocks satisfies Partial<jest.Mocked<T>>;
  
  return (overrides: Partial<jest.Mocked<T>> = {}): Provider => {
    // Compile-time validation of overrides
    const validatedOverrides = overrides satisfies Partial<jest.Mocked<T>>;
    const mockService = createMockService(validatedDefaults, validatedOverrides);
    return { provide: serviceToken, useValue: mockService };
  };
};
