# @christianh/angular-testing-factory

> Modern, type-safe Angular service mocking library for Angular 20+

[![npm version](https://badge.fury.io/js/%40christianh%2Fangular-testing-factory.svg)](https://badge.fury.io/js/%40christianh%2Fangular-testing-factory)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![Jest](https://img.shields.io/badge/Jest-29+-green.svg)](https://jestjs.io/)

## ✨ Features

- 🎯 **Generic Mock System**: Universal factories for all Angular service types
- 🛡️ **Zero Mock Drift**: TypeScript `satisfies` prevents compile-time errors  
- ⚡ **3-Line Rule**: Add new services in seconds
- 🧪 **Angular 20+ Native**: Signals, Standalone Components, Modern inject()
- 📦 **Preset Collections**: HttpClient, Router, Material Dialog ready out-of-the-box
- 🔄 **SignalStore Ready**: Special patterns for modern state management

## 🚀 Quick Start

### Installation

```bash
npm install --save-dev @christianh/angular-testing-factory
```

### Basic Usage

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClientMock, provideRouterMock } from '@christianh/angular-testing-factory';

describe('MyComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientMock(),
        provideRouterMock()
      ]
    });
  });

  it('should work', () => {
    // Your tests here
  });
});
```

### Advanced Usage with Overrides

```typescript
import { of } from 'rxjs';
import { provideHttpClientMock } from '@christianh/angular-testing-factory';

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
@christianh/angular-testing-factory/
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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

Found a bug? Please [report it](https://github.com/Chalverscheid79/angular-testing-factory/issues).

## 📄 License

MIT © Christian Halverscheid

## 🚀 Made with ❤️ for the Angular Community

This library was created to solve real-world testing challenges in enterprise Angular applications. Your feedback and contributions make it better!
