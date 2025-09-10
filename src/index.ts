/**
 * @fileoverview Angular Testing Factory - Public API
 * 
 * @description
 * Modern, type-safe Angular service mocking library for Angular 20+.
 * Provides zero mock drift guarantee through TypeScript satisfies operator.
 *
 * @author Christian Halverscheid
 * @version 1.0.0
 *
 * @example
 * ```typescript
 * import { provideHttpClientMock, provideRouterMock } from '@christianh/angular-testing-factory';
 * 
 * TestBed.configureTestingModule({
 *   providers: [
 *     provideHttpClientMock(),
 *     provideRouterMock()
 *   ]
 * });
 * ```
 */

// Core System
export { createMockService, createMockProvider } from './core/mock-factory';

// Presets für häufige Angular Services
export * from './presets/angular-common';
export * from './presets/angular-material';

// Types
export * from './types';

// Utilities
export * from './utils/test-helpers';
