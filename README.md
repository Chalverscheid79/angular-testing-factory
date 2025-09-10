# @halverscheid-fiae.de/angular-testing-factory

> **Revolutionary type-safe Angular service mocking for Angular 20+**  
> **Zero Mock Drift™ guarantee with compile-time validation**

[![npm version](https://badge.fury.io/js/%40halverscheid-fiae.de%2Fangular-testing-factory.svg)](https://badge.fury.io/js/%40halverscheid-fiae.de%2Fangular-testing-factory)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![Jest](https://img.shields.io/badge/Jest-29+-green.svg)](https://jestjs.io/)

## 🎯 Why This Library?

**The Problem:** Angular testing is painful. Manual mocks break when services change, TypeScript can't catch mock drift, and every new service needs tons of boilerplate.

**The Solution:** This library provides **compile-time safe mocking** with **zero configuration** for 90% of use cases, and **zero mock drift** for your custom services.

## ✨ Revolutionary Features

- 🎯 **Zero Mock Drift™**: TypeScript `satisfies` catches mock inconsistencies at compile-time
- ⚡ **One-Line Providers**: `provideHttpClientMock()` - Done!
- 🔄 **Override Anything**: Per-test customization with the Factory Pattern
- 🛡️ **100% Type Safe**: Full IntelliSense and compile-time validation
- 📦 **Angular 20+ Native**: Signals, Standalone Components, modern inject()
- � **Zero Config**: Works out-of-the-box with sensible defaults

## 🚀 Quick Start

### Installation

```bash
npm install --save-dev @halverscheid-fiae.de/angular-testing-factory
```

### 90% Use Case: Preset Collections

```typescript
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
// 1. Create your factory ONCE (in test-setup.ts or similar)
const provideMyBusinessServiceMock = createServiceProviderFactory(MyBusinessService, {
  calculateRevenue: jest.fn(() => of(1000)),
  processPayment: jest.fn(() => Promise.resolve(false)),
  currentUser: signal({ id: 1, name: 'Test User' }),
  isLoading: signal(false)
});

// 2. Use everywhere with per-test overrides:
describe('Revenue Tests', () => {
  it('should handle high revenue', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMyBusinessServiceMock({ 
          calculateRevenue: jest.fn(() => of(50000)) // ← Override just this!
        })
      ]
    });
    // Test high revenue scenario
  });

  it('should handle payment failures', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMyBusinessServiceMock({ 
          processPayment: jest.fn(() => Promise.reject('Card declined'))
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
  calculateRevenue: jest.fn(() => of(1000)),
  // ❌ If you forget a method → TypeScript error!
  // ❌ If you add wrong method → TypeScript error!  
  // ❌ If return type changes → TypeScript error!
  // ❌ If service interface changes → TypeScript error!
});
```

```typescript
import { of } from 'rxjs';
import { provideHttpClientMock } from '@halverscheid-fiae.de/angular-testing-factory';

// Mock HTTP calls with specific responses
TestBed.configureTestingModule({
  providers: [
    provideHttpClientMock({
      get: jest.fn(() => of({ data: 'custom response' })),
      post: jest.fn(() => of({ success: true }))
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

#### Angular Material
- `provideMatDialogMock(overrides?)` - MatDialog Mock
- `provideMatSnackBarMock(overrides?)` - MatSnackBar Mock
- `provideAngularMaterialMocks()` - All Material Services

## 🛠️ Custom Services

### 3-Line Rule for New Services

```typescript
// 1. Define service defaults
const MY_SERVICE_DEFAULTS: Partial<jest.Mocked<MyService>> = {
  getData: jest.fn(() => of([])),
  saveData: jest.fn(() => Promise.resolve())
};

// 2. Create factory
const createMockMyService = (overrides = {}) => 
  createMockService(MY_SERVICE_DEFAULTS, overrides);

// 3. Export provider
export const provideMyServiceMock = (overrides = {}) => 
  createMockProvider(MyService, createMockMyService(overrides));
```

## 🔍 SignalStore Testing

```typescript
// ❌ This does NOT work with SignalStores:
const spy = jest.spyOn(store.myService, 'getData'); // Error!

// ✅ Correct approach for SignalStores:
const mockService = TestBed.inject(MyService); // After TestBed setup
const spy = jest.spyOn(mockService, 'getData');
```

## 💡 Why This Library?

### Before (Traditional Approach)
```typescript
// ❌ Error-prone, lots of boilerplate, mock drift
const mockService = {
  getData: jest.fn(),
  setData: jest.fn(),
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
// ✅ Type-safe, 3-line rule, zero mock drift
TestBed.configureTestingModule({
  providers: [
    provideMyServiceMock({
      getData: jest.fn(() => of(customData))
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

- Angular 20+
- TypeScript 5.0+
- Jest 29+
- RxJS 7+

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
