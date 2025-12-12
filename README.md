# @halverscheid-fiae.de/angular-testing-factory

> **Revolutionary type-safe Angular service mocking for Angular 21+**  
> **Zero Mock Drift™ guarantee with compile-time validation**

[![npm version](https://badge.fury.io/js/%40halverscheid-fiae.de%2Fangular-testing-factory.svg)](https://badge.fury.io/js/%40halverscheid-fiae.de%2Fangular-testing-factory)
[![npm downloads](https://img.shields.io/npm/dt/@halverscheid-fiae.de/angular-testing-factory)](https://www.npmjs.com/package/@halverscheid-fiae.de/angular-testing-factory)
[![license](https://img.shields.io/npm/l/@halverscheid-fiae.de/angular-testing-factory)](https://github.com/Chalverscheid79/angular-testing-factory/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@halverscheid-fiae.de/angular-testing-factory)](https://bundlephobia.com/package/@halverscheid-fiae.de/angular-testing-factory)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-21+-red.svg)](https://angular.io/)
[![Vitest](https://img.shields.io/badge/Vitest-4+-green.svg)](https://vitest.dev/)

## 🎯 Why This Library?

**The Problem:** Angular testing is painful. Manual mocks break when services change, TypeScript can't catch mock drift, and every new service needs tons of boilerplate.

**The Solution:** This library provides **compile-time safe mocking** with **zero configuration** for 90% of use cases, and **zero mock drift** for your custom services.

## ✨ Revolutionary Features

- 🎯 **Zero Mock Drift™**: TypeScript `satisfies` catches mock inconsistencies at compile-time
- ⚡ **One-Line Providers**: `provideHttpClientMock()` - Done!
- 🚀 **Automated CI/CD**: Semantic versioning with automatic NPM publishing
- 🧪 **100% Test Coverage**: All 148 tests pass with comprehensive coverage  
- 🎯 **Vitest Native**: Fast, modern testing with Vitest 4+
- 🔄 **Override Anything**: Per-test customization with the Factory Pattern
- 🛡️ **100% Type Safe**: Full IntelliSense and compile-time validation
- 📦 **Angular 21+ Native**: Signals, Standalone Components, modern inject()
- ⚙️ **Zero Config**: Works out-of-the-box with sensible defaults

## 🚀 Quick Start

### Installation

```bash
npm install --save-dev @halverscheid-fiae.de/angular-testing-factory
```

### 90% Use Case: Preset Collections

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { 
  provideHttpClientMock, 
  provideRouterMock, 
  provideMatDialogMock 
} from '@halverscheid-fiae.de/angular-testing-factory';

describe('MyComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientMock(),    // ← HttpClient with sensible defaults
        provideRouterMock(),        // ← Router with navigation mocks
        provideMatDialogMock()      // ← MatDialog with dialog mocks
      ]
    });
  });

  it('should work perfectly', () => {
    // Your component gets fully mocked dependencies!
  });
});
```

## 🔥 The Revolutionary Factory Pattern

### Create Once, Override Everywhere

```typescript
import { vi } from 'vitest';
import { of, signal } from 'rxjs';

// 1. Create your factory ONCE (in test-setup.ts or similar)
const provideMyBusinessServiceMock = createServiceProviderFactory(MyBusinessService, {
  calculateRevenue: vi.fn(() => of(1000)),
  processPayment: vi.fn(() => Promise.resolve(false)),
  currentUser: signal({ id: 1, name: 'Test User' }),
  isLoading: signal(false)
});

// 2. Use everywhere with per-test overrides:
describe('Revenue Tests', () => {
  it('should handle high revenue', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMyBusinessServiceMock({ 
          calculateRevenue: vi.fn(() => of(50000)) // ← Override just this!
        })
      ]
    });
    // Test high revenue scenario
  });

  it('should handle payment failures', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMyBusinessServiceMock({ 
          processPayment: vi.fn(() => Promise.reject('Card declined'))
        })
      ]
    });
    // Test payment failure scenario
  });

  it('should use sensible defaults', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMyBusinessServiceMock() // ← All defaults, no overrides
      ]
    });
    // Test normal flow
  });
});
```

## 🚀 Quick Migration Guide

### From Jest to Vitest

```typescript
// ❌ Before: Jest
import { jest } from '@jest/globals';

beforeEach(() => {
  const mockFn = jest.fn();
});

// ✅ After: Vitest
import { vi } from 'vitest';

beforeEach(() => {
  const mockFn = vi.fn();
});
```

### From Manual Window Mocking

```typescript
// ❌ Before: Manual & Error-prone
beforeEach(() => {
  (global as any).window = {
    innerWidth: 1024,
    addEventListener: vi.fn(),
    // Missing tons of properties...
  };
});

// ✅ After: Complete & Type-safe
beforeEach(() => {
  const { providers, cleanup } = provideCompleteWindowMock({
    overrides: { innerWidth: 1024 },
    mockGlobal: true
  });
  
  TestBed.configureTestingModule({ providers });
  cleanup = windowCleanup;
});
```

### From Direct Injection Errors

```typescript
// ❌ Before: Runtime Injection Errors
TestBed.inject(Window); // NG0201 Error!
TestBed.inject(Document); // NG0201 Error!

// ✅ After: Proper Token Usage
import { WINDOW_TOKEN, DOCUMENT_TOKEN } from '@halverscheid-fiae.de/angular-testing-factory';

TestBed.inject(WINDOW_TOKEN); // ✅ Works!
TestBed.inject(DOCUMENT_TOKEN); // ✅ Works!
```

### ✨ New: Angular Core Extensions

```typescript
// 🆕 Complete test setup in one line
TestBed.configureTestingModule({
  providers: provideAngularCoreMocks({
    activatedRoute: {
      snapshot: { params: { id: '123' } }
    },
    window: {
      innerWidth: 1920,
      localStorage: mockStorage()
    }
  })
});

// 🆕 Individual providers for specific needs
TestBed.configureTestingModule({
  providers: [
    provideActivatedRouteMock({
      params: of({ productId: '456' }),
      queryParams: of({ tab: 'details' })
    }),
    provideFormBuilderMock(),
    provideElementRefMock<HTMLInputElement>({
      nativeElement: mockInputElement
    })
  ]
});
```

### The Magic: Zero Mock Drift™

```typescript
interface MyBusinessService {
  calculateRevenue(): Observable<number>;
  processPayment(amount: number): Promise<boolean>;
  currentUser: Signal<User>;
  isLoading: WritableSignal<boolean>;
}

// ✅ This will catch ANY drift at compile-time:
const provideMyBusinessServiceMock = createServiceProviderFactory(MyBusinessService, {
  calculateRevenue: vi.fn(() => of(1000)),
  // ❌ If you forget a method → TypeScript error!
  // ❌ If you add wrong method → TypeScript error!  
  // ❌ If return type changes → TypeScript error!
  // ❌ If service interface changes → TypeScript error!
});
```

```typescript
import { vi } from 'vitest';
import { of } from 'rxjs';
import { provideHttpClientMock } from '@halverscheid-fiae.de/angular-testing-factory';

// Mock HTTP calls with specific responses
TestBed.configureTestingModule({
  providers: [
    provideHttpClientMock({
      get: vi.fn(() => of({ data: 'custom response' })),
      post: vi.fn(() => of({ success: true }))
    })
  ]
});
```

## 📖 API Reference

### Core Functions

- `createMockProvider<T>(token, mockService)` - Creates Angular Provider for mocks
- `createMockService<T>(defaults, overrides)` - Creates type-safe mock objects

### Preset Providers

#### Angular Common
- `provideHttpClientMock(overrides?)` - HttpClient Mock
- `provideRouterMock(overrides?)` - Router Mock  
- `provideLocationMock(overrides?)` - Location Mock
- `provideAngularCommonMocks()` - All Common Services

#### Angular Core Extensions 🆕
- `provideActivatedRouteMock(overrides?)` - ActivatedRoute Mock (Params, QueryParams, Data)
- `provideFormBuilderMock(overrides?)` - FormBuilder Mock (Reactive Forms)
- `provideDomSanitizerMock(overrides?)` - DomSanitizer Mock (Security Bypass)

#### Browser API Mocks 🆕

- `provideElementRefMock<T>(overrides?)` - ElementRef Mock with Generic Support
- `provideDocumentMock(overrides?)` - Document Mock (DOM Operations)
- `provideWindowMock(overrides?)` - Window Mock for Token-based Injection
- `setupGlobalWindowMock(overrides?)` - Global Window Mock for Direct Access 🔥
- `provideCompleteWindowMock(options?)` - Combined Token + Global Window Mock 🔥

#### 🌟 Advanced Window Mocking

**Problem Solved:** Components using `window` directly vs. `WINDOW_TOKEN` injection

```typescript
// ❌ Traditional approach: Only works for token-based injection
providers: [provideWindowMock({ innerWidth: 800 })]

// ✅ New approach: Covers both use cases
const { providers, cleanup } = provideCompleteWindowMock({
  overrides: { innerWidth: 800 },
  mockGlobal: true  // Also mocks global window object
});

TestBed.configureTestingModule({ providers });
// cleanup() restores original window after tests
```

**Common Use Cases & Solutions:**

**❌ Problem:** `ɵNotFound: NG0201: No provider found for Window`
```typescript
// Wrong - Window is not an Angular token
windowMock = TestBed.inject(Window);
```

**✅ Solution 1:** Use WINDOW_TOKEN for token-based injection
```typescript
import { WINDOW_TOKEN, provideWindowMock } from '@halverscheid-fiae.de/angular-testing-factory';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideWindowMock({ innerWidth: 1200 })]
  });
  
  windowMock = TestBed.inject(WINDOW_TOKEN); // ✅ Correct token
});
```

**✅ Solution 2:** Complete Window mocking (recommended)
```typescript
import { provideCompleteWindowMock, WINDOW_TOKEN } from '@halverscheid-fiae.de/angular-testing-factory';

describe('MyComponent', () => {
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    const result = provideCompleteWindowMock({
      overrides: { innerWidth: 1200, location: { href: 'http://test.com' } },
      mockGlobal: true // Mocks both token and global access
    });
    
    cleanup = result.cleanup;

    TestBed.configureTestingModule({
      providers: result.providers
    });
    
    // Both work now:
    windowMock = TestBed.inject(WINDOW_TOKEN); // Token-based
    // window.innerWidth also works in component code
  });

  afterEach(() => {
    cleanup?.(); // Clean up global window mock
  });
});
```

**✅ Solution 3:** Component injection pattern
```typescript
// In your component - use token-based injection:
import { inject } from '@angular/core';
import { WINDOW_TOKEN } from '@halverscheid-fiae.de/angular-testing-factory';

@Component({...})
export class MyComponent {
  private window = inject(WINDOW_TOKEN);
  
  onResize() {
    const width = this.window.innerWidth; // ✅ Testable
  }
}
```

**Use Cases:**

- **Token-based**: `inject(WINDOW_TOKEN)` in Angular services
- **Direct access**: `window.innerWidth` in legacy components  
- **Global mocking**: Testing code that accesses `window` directly

#### Convenience Bundles 🆕

- `provideAngularCoreMocks(overrides?)` - All Critical Angular Core Services
- `provideAngularCommonMocks()` - Legacy Common Services Bundle

#### Angular Material

- `provideMatDialogMock(overrides?)` - MatDialog Mock
- `provideMatSnackBarMock(overrides?)` - MatSnackBar Mock
- `provideAngularMaterialMocks()` - All Material Services

## 🛠️ Custom Services

### 3-Line Rule for New Services

```typescript
import { vi } from 'vitest';
import { of } from 'rxjs';

// 1. Define service defaults
const MY_SERVICE_DEFAULTS = {
  getData: vi.fn(() => of([])),
  saveData: vi.fn(() => Promise.resolve())
} satisfies Partial<MyService>;

// 2. Create factory
const createMockMyService = (overrides = {}) => 
  createMockService(MY_SERVICE_DEFAULTS, overrides);

// 3. Export provider
export const provideMyServiceMock = (overrides = {}) => 
  createMockProvider(MyService, createMockMyService(overrides));
```

## � Common Issues & Solutions

### Window/Document Injection Problems

**Error:** `ɵNotFound: NG0201: No provider found for Window`

**Quick Fix:**
```typescript
// ❌ Wrong
TestBed.inject(Window);
TestBed.inject(Document);

// ✅ Correct
import { WINDOW_TOKEN, DOCUMENT_TOKEN } from '@halverscheid-fiae.de/angular-testing-factory';

TestBed.inject(WINDOW_TOKEN);
TestBed.inject(DOCUMENT_TOKEN);
```

**Complete Solution:**
```typescript
import { provideCompleteWindowMock } from '@halverscheid-fiae.de/angular-testing-factory';

describe('MyComponent', () => {
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    const { providers, cleanup: windowCleanup } = provideCompleteWindowMock({
      mockGlobal: true
    });
    cleanup = windowCleanup;

    TestBed.configureTestingModule({
      providers: [...providers, /* other providers */]
    });
  });

  afterEach(() => cleanup?.());
});
```

### FormBuilder Validation Errors

**Error:** `TypeError: control.setParent is not a function`

**Root Cause:** Vitest needs to properly mock Angular Forms globally to avoid conflicts.

**Complete Solution:**

1. **Create vitest.setup.ts in your project root:**

```typescript
// vitest.setup.ts - Global Angular Forms Mock
import { vi } from 'vitest';
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize Angular TestBed
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

vi.mock('@angular/forms', () => {
  class MockFormControl {
    constructor(formState?: any, validatorOrOpts?: any, asyncValidator?: any) {
      this.value = Array.isArray(formState) ? formState[0] : formState;
      this.valid = true;
      this.invalid = false;
      this.errors = null;
      this.setValue = vi.fn();
      this.patchValue = vi.fn();
      this.reset = vi.fn();
      this.setParent = vi.fn(); // CRITICAL: This method must exist!
      // Additional FormControl properties as needed
    }
    
    value: any;
    valid: boolean;
    invalid: boolean;
    errors: any;
    setValue: any;
    patchValue: any;
    reset: any;
    setParent: any;
  }

  class MockFormGroup {
    constructor(controlsConfig?: any, options?: any) {
      this.controls = {};
      this.value = {};
      
      if (controlsConfig) {
        Object.keys(controlsConfig).forEach(key => {
          const config = controlsConfig[key];
          this.controls[key] = new MockFormControl(config);
          // Ensure parent relationship
          if (this.controls[key].setParent) {
            this.controls[key].setParent = vi.fn();
          }
        });
      }
      
      this.setValue = vi.fn();
      this.patchValue = vi.fn();
      this.get = vi.fn((path: string) => this.controls[path] || null);
      this.setParent = vi.fn();
    }
    
    controls: any;
    value: any;
    setValue: any;
    patchValue: any;
    get: any;
    setParent: any;
  }

  class MockFormBuilder {
    control(formState?: any, validatorOrOpts?: any, asyncValidator?: any) {
      return new MockFormControl(formState, validatorOrOpts, asyncValidator);
    }
    group(controlsConfig?: any, options?: any) {
      return new MockFormGroup(controlsConfig, options);
    }
  }

  return {
    FormControl: MockFormControl,
    FormGroup: MockFormGroup,
    FormBuilder: MockFormBuilder
  };
});
```

2. **Update vitest.config.ts:**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // or 'jsdom'
    setupFiles: ['./vitest.setup.ts'],
    // ... rest of your configuration
  }
});
```

3. **Alternative: Use our pre-configured provider:**

```typescript
import { provideAngularCoreMocks } from '@halverscheid-fiae.de/angular-testing-factory';

TestBed.configureTestingModule({
  providers: [
    provideAngularCoreMocks(), // Includes setParent-aware FormBuilder
    // ... your other providers
  ]
});
```

### SignalStore Testing

**Error:** Cannot spy on SignalStore methods directly

**Solution:**

## 🔍 SignalStore Testing

```typescript
import { vi } from 'vitest';

// ❌ This does NOT work with SignalStores:
const spy = vi.spyOn(store.myService, 'getData'); // Error!

// ✅ Correct approach for SignalStores:
const mockService = TestBed.inject(MyService); // After TestBed setup
const spy = vi.spyOn(mockService, 'getData');
```

## 🔧 Troubleshooting Guide

### Missing Provider Errors
- Use `WINDOW_TOKEN` instead of `Window`
- Use `DOCUMENT_TOKEN` instead of `Document`
- Ensure all mocks are provided in TestBed configuration

### Mock Not Working
- Check import statements - ensure you're importing from the correct package
- Verify TypeScript configuration allows proper jest mocking
- Use `provideCompleteWindowMock` for complex window scenarios

### Performance Issues
- Use `setupGlobalWindowMock` only when necessary
- Clean up global mocks in `afterEach()` hooks
- Consider using token-based injection for better performance

## 💡 Why This Library?

### Before (Traditional Approach)
```typescript
import { vi } from 'vitest';

// ❌ Error-prone, lots of boilerplate, mock drift
const mockService = {
  getData: vi.fn(),
  setData: vi.fn(),
  // Forgotten methods lead to runtime errors
};

TestBed.configureTestingModule({
  providers: [
    { provide: MyService, useValue: mockService }
  ]
});
```

### After (With Angular Testing Factory)
```typescript
import { vi } from 'vitest';
import { of } from 'rxjs';

// ✅ Type-safe, 3-line rule, zero mock drift
TestBed.configureTestingModule({
  providers: [
    provideMyServiceMock({
      getData: vi.fn(() => of(customData))
    })
  ]
});
```

## 🏗️ Architecture

```
@halverscheid-fiae.de/angular-testing-factory/
├── 🏭 core/           # Universal Mock Factory System
├── 📦 presets/        # Ready-to-use Service Mocks
├── 🎯 types/          # TypeScript Definitions
└── 🛠️ utils/          # Test Helper Utilities
```

## 🎯 Problem Solved

Traditional Angular testing suffers from:
- **Mock Drift**: Service changes break tests at runtime
- **Boilerplate**: Repetitive mock setup code
- **Type Safety**: Missing compile-time guarantees
- **SignalStore Issues**: Complex injection context handling

This library provides:
- **Compile-time Safety**: TypeScript `satisfies` catches errors early
- **DRY Principle**: Reusable factories eliminate duplication
- **Modern Angular**: Built for standalone components and signals
- **Developer Experience**: 3-line rule for maximum productivity

## 📋 Requirements

- Angular 21+
- TypeScript 5.0+
- Vitest 4+
- RxJS 7+

## 🧪 Setting Up Vitest with Angular

### Installation

```bash
npm install --save-dev vitest @vitest/ui happy-dom @angular/compiler @angular/platform-browser-dynamic
```

### Configuration

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./vitest.setup.ts']
  }
});
```

**vitest.setup.ts:**
```typescript
import { vi } from 'vitest';
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} from '@angular/platform-browser-dynamic/testing';

// Initialize Angular TestBed environment
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

**package.json:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## 🤝 Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following our commit conventions (see below)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Commit Message Conventions

This project uses **automatic semantic versioning** based on commit messages. Please follow these conventions:

#### Version Bumping Rules

**🔧 Patch Release** (`1.0.0` → `1.0.1`):

```bash
git commit -m "fix: resolve HttpClient mock timeout issue"
git commit -m "docs: update installation instructions"  
git commit -m "chore: update dependencies"
```

**✨ Minor Release** (`1.0.0` → `1.1.0`):

```bash
git commit -m "feat: add MatSnackBar mock provider"
git commit -m "feat(presets): add Angular Forms mock collection"
```

**💥 Major Release** (`1.0.0` → `2.0.0`):

```bash
git commit -m "feat!: redesign API for better TypeScript inference"
git commit -m "refactor!: remove deprecated functions"

# Or with BREAKING CHANGE in body:
git commit -m "feat: redesign API for better TypeScript inference

BREAKING CHANGE: createMockProvider now requires explicit type parameter"
```

#### Commit Types

- `feat`: New features → **Minor version**
- `fix`: Bug fixes → **Patch version**
- `docs`: Documentation → **Patch version**
- `style`: Code style → **Patch version**
- `refactor`: Code refactoring → **Patch version**
- `test`: Adding tests → **Patch version**
- `chore`: Maintenance → **Patch version**

#### Breaking Changes

Add `BREAKING CHANGE:` in commit body **OR** use `!` after type for **Major version**:

```bash
# Option 1: ! suffix (recommended)
git commit -m "feat!: remove deprecated createLegacyMock function"  
git commit -m "refactor!: change API structure"

# Option 2: BREAKING CHANGE in body
git commit -m "refactor: improve type inference

BREAKING CHANGE: Generic type parameters order changed"
```

### 🤖 Automatic Publishing

When your PR is merged to `main`:

1. ✅ **Version automatically bumped** based on commit messages
2. ✅ **Git tag created** (e.g., `v1.2.3`)
3. ✅ **NPM package published** automatically
4. ✅ **No manual steps required!**

**Example Workflow:**

- You commit: `feat: add new provider for Angular Router`
- After merge: `1.0.0` → `1.1.0` + NPM publish + Git tag `v1.1.0`

## 🐛 Issues

Found a bug? Please [report it](https://github.com/Chalverscheid79/angular-testing-factory/issues).

## 📄 License

MIT © Christian Halverscheid

## 🚀 Made with ❤️ for the Angular Community

This library was created to solve real-world testing challenges in enterprise Angular applications. Your feedback and contributions make it better!
