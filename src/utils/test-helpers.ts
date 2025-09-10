/**
 * @fileoverview Test Helper Utilities
 *
 * @description
 * Utility-Funktionen für bessere Test-Experience
 */

import { of, throwError } from 'rxjs';

/**
 * Erstellt Observable Mock mit Erfolgs-Response
 */
export const createObservableMock = <T>(value: T) => of(value);

/**
 * Erstellt Observable Mock mit Error-Response
 */
export const createObservableErrorMock = (error: any) => throwError(() => error);

/**
 * Erstellt Promise Mock mit Erfolgs-Response
 */
export const createPromiseMock = <T>(value: T) => Promise.resolve(value);

/**
 * Erstellt Promise Mock mit Error-Response
 */
export const createPromiseErrorMock = (error: any) => Promise.reject(error);

/**
 * Standard Test-Daten für häufige Szenarien
 */
export const TEST_DATA = {
  genericSuccess: { success: true, data: 'test' },
  genericError: new Error('Test Error'),
  networkError: new Error('Network Error'),
  httpErrorResponse: {
    status: 500,
    statusText: 'Internal Server Error',
    message: 'Something went wrong'
  }
};
