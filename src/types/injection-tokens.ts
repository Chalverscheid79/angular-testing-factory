/**
 * @fileoverview Injection Tokens for Mock-Provider
 */

/* eslint-disable no-undef */

import { InjectionToken } from '@angular/core';

/** Injection Token for Document */
export const DOCUMENT_TOKEN = new InjectionToken<Document>('DOCUMENT');

/** Injection Token for Window */
export const WINDOW_TOKEN = new InjectionToken<Window & typeof globalThis>('WINDOW');
