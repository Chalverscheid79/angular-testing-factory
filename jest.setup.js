// Jest Setup File - Forces Angular Form Mocks
// This ensures that Angular Form classes are mocked globally

// Mock Angular Forms
jest.mock('@angular/forms', () => {
  const originalModule = jest.requireActual('@angular/forms');
  
  class MockFormControl {
    constructor(formState, validatorOrOpts, asyncValidator) {
      this.value = Array.isArray(formState) ? formState[0] : formState;
      this.valid = true;
      this.invalid = false;
      this.pending = false;
      this.disabled = false;
      this.enabled = true;
      this.errors = null;
      this.pristine = true;
      this.dirty = false;
      this.touched = false;
      this.untouched = true;
      this.parent = null;
      this.setValue = jest.fn();
      this.patchValue = jest.fn();
      this.reset = jest.fn();
      this.get = jest.fn();
      this.markAsTouched = jest.fn();
      this.markAsUntouched = jest.fn();
      this.markAsDirty = jest.fn();
      this.markAsPristine = jest.fn();
      this.markAsPending = jest.fn();
      this.setErrors = jest.fn();
      this.getError = jest.fn();
      this.hasError = jest.fn();
      this.updateValueAndValidity = jest.fn();
      this.setParent = jest.fn(); // This was missing!
    }
  }

  class MockFormGroup {
    constructor(controlsConfig, options) {
      this.controls = {};
      this.value = {};
      
      if (controlsConfig) {
        Object.keys(controlsConfig).forEach(key => {
          const config = controlsConfig[key];
          
          if (config && typeof config === 'object' && 'setValue' in config) {
            this.controls[key] = config;
            this.value[key] = config.value;
          } else if (Array.isArray(config)) {
            const controlValue = config[0];
            this.controls[key] = new MockFormControl(controlValue);
            this.value[key] = controlValue;
          } else {
            this.controls[key] = new MockFormControl(config);
            this.value[key] = config;
          }
          
          if (this.controls[key] && this.controls[key].setParent) {
            this.controls[key].setParent = jest.fn();
          }
        });
      }
      
      this.valid = true;
      this.invalid = false;
      this.pending = false;
      this.disabled = false;
      this.enabled = true;
      this.errors = null;
      this.pristine = true;
      this.dirty = false;
      this.touched = false;
      this.untouched = true;
      this.parent = null;
      this.setValue = jest.fn();
      this.patchValue = jest.fn();
      this.reset = jest.fn();
      this.get = jest.fn((path) => this.controls[path] || null);
      this.addControl = jest.fn();
      this.removeControl = jest.fn();
      this.setControl = jest.fn();
      this.contains = jest.fn();
      this.markAsTouched = jest.fn();
      this.markAsUntouched = jest.fn();
      this.markAsDirty = jest.fn();
      this.markAsPristine = jest.fn();
      this.updateValueAndValidity = jest.fn();
      this.setParent = jest.fn();
    }
  }

  class MockFormBuilder {
    control(formState, validatorOrOpts, asyncValidator) {
      return new MockFormControl(formState, validatorOrOpts, asyncValidator);
    }

    group(controlsConfig, options) {
      return new MockFormGroup(controlsConfig, options);
    }

    array(controls, validatorOrOpts, asyncValidator) {
      return {
        controls: Array.isArray(controls) ? controls : [],
        length: Array.isArray(controls) ? controls.length : 0,
        at: jest.fn(),
        push: jest.fn(),
        insert: jest.fn(),
        removeAt: jest.fn(),
        setControl: jest.fn(),
        setValue: jest.fn(),
        patchValue: jest.fn(),
        reset: jest.fn(),
        value: [],
        valid: true,
        invalid: false,
        pending: false,
        disabled: false,
        enabled: true,
        errors: null,
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
        markAsTouched: jest.fn(),
        markAsUntouched: jest.fn(),
        markAsDirty: jest.fn(),
        markAsPristine: jest.fn(),
        updateValueAndValidity: jest.fn(),
        get: jest.fn()
      };
    }

    record(controls, validatorOrOpts, asyncValidator) {
      return {
        controls: controls || {},
        addControl: jest.fn(),
        removeControl: jest.fn(),
        setControl: jest.fn(),
        contains: jest.fn(),
        setValue: jest.fn(),
        patchValue: jest.fn(),
        reset: jest.fn(),
        value: {},
        valid: true,
        invalid: false,
        pending: false,
        disabled: false,
        enabled: true,
        errors: null,
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
        markAsTouched: jest.fn(),
        markAsUntouched: jest.fn(),
        markAsDirty: jest.fn(),
        markAsPristine: jest.fn(),
        updateValueAndValidity: jest.fn(),
        get: jest.fn()
      };
    }
  }

  const MockValidators = {
    required: jest.fn(),
    email: jest.fn(),
    min: jest.fn(),
    max: jest.fn(),
    minLength: jest.fn(),
    maxLength: jest.fn(),
    pattern: jest.fn(),
    requiredTrue: jest.fn(),
    compose: jest.fn(),
    composeAsync: jest.fn(),
    nullValidator: jest.fn()
  };

  return {
    ...originalModule,
    FormControl: MockFormControl,
    FormGroup: MockFormGroup,
    FormBuilder: MockFormBuilder,
    Validators: MockValidators
  };
});
