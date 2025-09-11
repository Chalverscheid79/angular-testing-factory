/**
 * Mock for @angular/forms
 */

export class FormControl {
  value: any;
  
  constructor(value: any = null, validator?: any, asyncValidator?: any) {
    this.value = value;
  }
  
  setValue(value: any) {
    this.value = value;
  }
  
  patchValue(value: any) {
    this.value = value;
  }
  
  get(path: string) {
    return null;
  }
}

export class FormGroup {
  controls: Record<string, FormControl> = {};
  
  constructor(controls: Record<string, any>, options?: any) {
    this.controls = Object.keys(controls).reduce((acc, key) => {
      acc[key] = controls[key] instanceof FormControl ? controls[key] : new FormControl(controls[key]);
      return acc;
    }, {} as Record<string, FormControl>);
  }
  
  get(path: string): FormControl | null {
    return this.controls[path] || null;
  }
  
  setValue(value: any) {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key]);
      }
    });
  }
  
  patchValue(value: any) {
    this.setValue(value);
  }
}

export class FormBuilder {
  control(formState: any, validatorOrOpts?: any, asyncValidator?: any): FormControl {
    return new FormControl(formState, validatorOrOpts, asyncValidator);
  }
  
  group(controlsConfig: any, options?: any): FormGroup {
    return new FormGroup(controlsConfig, options);
  }
  
  array() {
    return {} as any;
  }
  
  record() {
    return {} as any;
  }
}
