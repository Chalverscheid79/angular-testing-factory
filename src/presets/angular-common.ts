/**
 * @fileoverview Angular Common Service Presets
 *
 * @description
 * Ready-to-use Mocks für häufige Angular Common Services
 * wie HttpClient, Router, Location etc.
 */

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, EMPTY } from 'rxjs';
import { createMockService, createMockProvider } from '../core/mock-factory';
import { Provider } from '@angular/core';

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

const HTTP_CLIENT_DEFAULTS: Partial<jest.Mocked<HttpClient>> = {
  get: jest.fn(() => of({})),
  post: jest.fn(() => of({})),
  put: jest.fn(() => of({})),
  delete: jest.fn(() => of({})),
  patch: jest.fn(() => of({})),
  head: jest.fn(() => of({})),
  options: jest.fn(() => of({})),
  request: jest.fn(() => of({}))
};

const ROUTER_DEFAULTS: Partial<jest.Mocked<Router>> = {
  navigate: jest.fn(() => Promise.resolve(true)),
  navigateByUrl: jest.fn(() => Promise.resolve(true)),
  createUrlTree: jest.fn(() => ({} as any)),
  serializeUrl: jest.fn(() => ''),
  parseUrl: jest.fn(() => ({} as any)),
  isActive: jest.fn(() => false),
  events: EMPTY as any
};

const LOCATION_DEFAULTS: Partial<jest.Mocked<Location>> = {
  back: jest.fn(),
  forward: jest.fn(),
  go: jest.fn(),
  replaceState: jest.fn(),
  getState: jest.fn(() => null),
  isCurrentPathEqualTo: jest.fn(() => false),
  normalize: jest.fn((url: string) => url),
  prepareExternalUrl: jest.fn((url: string) => url),
  path: jest.fn(() => ''),
  subscribe: jest.fn(() => ({ unsubscribe: jest.fn() }))
};

/* ====================================
 * CONVENIENCE FACTORIES
 * ==================================== */

const createMockHttpClient = (overrides: Partial<jest.Mocked<HttpClient>> = {}) =>
  createMockService(HTTP_CLIENT_DEFAULTS, overrides);

const createMockRouter = (overrides: Partial<jest.Mocked<Router>> = {}) =>
  createMockService(ROUTER_DEFAULTS, overrides);

const createMockLocation = (overrides: Partial<jest.Mocked<Location>> = {}) =>
  createMockService(LOCATION_DEFAULTS, overrides);

/* ====================================
 * PUBLIC API: PROVIDER FACTORIES
 * ==================================== */

/** Angular Provider für HttpClient Mock */
export const provideHttpClientMock = (overrides: Partial<jest.Mocked<HttpClient>> = {}): Provider =>
  createMockProvider(HttpClient, createMockHttpClient(overrides));

/** Angular Provider für Router Mock */
export const provideRouterMock = (overrides: Partial<jest.Mocked<Router>> = {}): Provider =>
  createMockProvider(Router, createMockRouter(overrides));

/** Angular Provider für Location Mock */
export const provideLocationMock = (overrides: Partial<jest.Mocked<Location>> = {}): Provider =>
  createMockProvider(Location, createMockLocation(overrides));

/**
 * Convenience Provider für alle Angular Common Services
 */
export const provideAngularCommonMocks = (): Provider[] => [
  provideHttpClientMock(),
  provideRouterMock(),
  provideLocationMock()
];
