/**
 * @fileoverview Injection Tokens für Browser APIs
 */

import { InjectionToken } from '@angular/core';

/** Injection Token für Document */
export const DOCUMENT_TOKEN = new InjectionToken<Document>('DOCUMENT');

/** Injection Token für Window */
export const WINDOW_TOKEN = new InjectionToken<Window>('WINDOW');
