/**
 * Mock for @angular/core/testing
 */

export class TestBed {
  private static providers: any[] = [];
  private static imports: any[] = [];
  
  static configureTestingModule(config: {
    providers?: any[];
    imports?: any[];
    declarations?: any[];
  }) {
    TestBed.providers = config.providers || [];
    TestBed.imports = config.imports || [];
    return TestBed;
  }
  
  static resetTestingModule() {
    TestBed.providers = [];
    TestBed.imports = [];
  }
  
  static inject<T>(token: any): T {
    // Simple mock injection that returns provider values
    const provider = TestBed.providers.find(p => 
      p.provide === token || 
      (typeof p === 'function' && p.provide === token)
    );
    
    if (provider) {
      return provider.useValue || provider.useClass || provider.useFactory?.() || provider;
    }
    
    // Return a basic mock for common tokens
    if (token === 'ActivatedRoute') {
      return {
        snapshot: { params: {}, queryParams: {} },
        params: { subscribe: () => ({}) },
        queryParams: { subscribe: () => ({}) }
      } as any;
    }
    
    return {} as T;
  }
}
