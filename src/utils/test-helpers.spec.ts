import { describe, it, expect } from 'vitest';
import {
  createObservableMock,
  createObservableErrorMock,
  createPromiseMock,
  createPromiseErrorMock,
  TEST_DATA
} from './test-helpers';
import { firstValueFrom } from 'rxjs';

describe('Test Helper Utilities', () => {
  describe('createObservableMock', () => {
    it('should create Observable with success value', async () => {
      const testValue = { id: 1, name: 'Test' };
      const observable = createObservableMock(testValue);
      
      const result = await firstValueFrom(observable);
      expect(result).toEqual(testValue);
    });

    it('should work with primitive values', async () => {
      const observable = createObservableMock('test-string');
      
      const result = await firstValueFrom(observable);
      expect(result).toBe('test-string');
    });
  });

  describe('createObservableErrorMock', () => {
    it('should create Observable with error', async () => {
      const testError = new Error('Test error');
      const observable = createObservableErrorMock(testError);
      
      await expect(firstValueFrom(observable)).rejects.toThrow('Test error');
    });

    it('should work with custom error objects', async () => {
      const customError = { code: 'CUSTOM_ERROR', message: 'Custom error' };
      const observable = createObservableErrorMock(customError);
      
      await expect(firstValueFrom(observable)).rejects.toEqual(customError);
    });
  });

  describe('createPromiseMock', () => {
    it('should create resolved Promise', async () => {
      const testValue = { success: true };
      const promise = createPromiseMock(testValue);
      
      const result = await promise;
      expect(result).toEqual(testValue);
    });

    it('should work with null values', async () => {
      const promise = createPromiseMock(null);
      
      const result = await promise;
      expect(result).toBeNull();
    });
  });

  describe('createPromiseErrorMock', () => {
    it('should create rejected Promise', async () => {
      const testError = new Error('Promise error');
      const promise = createPromiseErrorMock(testError);
      
      await expect(promise).rejects.toThrow('Promise error');
    });

    it('should work with string errors', async () => {
      const promise = createPromiseErrorMock('String error');
      
      await expect(promise).rejects.toBe('String error');
    });
  });

  describe('TEST_DATA', () => {
    it('should provide generic success data', () => {
      expect(TEST_DATA.genericSuccess).toEqual({
        success: true,
        data: 'test'
      });
    });

    it('should provide generic error', () => {
      expect(TEST_DATA.genericError).toBeInstanceOf(Error);
      expect(TEST_DATA.genericError.message).toBe('Test Error');
    });

    it('should provide network error', () => {
      expect(TEST_DATA.networkError).toBeInstanceOf(Error);
      expect(TEST_DATA.networkError.message).toBe('Network Error');
    });

    it('should provide HTTP error response structure', () => {
      expect(TEST_DATA.httpErrorResponse).toEqual({
        status: 500,
        statusText: 'Internal Server Error',
        message: 'Something went wrong'
      });
    });
  });
});
