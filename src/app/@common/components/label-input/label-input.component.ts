import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'lastmile-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `<div class="input-wrapper">
    <label [class.error]="hasError">{{ placeholder }}</label>
    <input
      #inputRef
      [type]="type"
      [formControl]="formControl"
      (focus)="showLabel($event)"
      (blur)="hideKeyboard($event)"
      [placeholder]="placeholder"
      (input)="onInputChange($event)"
      [placeholder]="placeholder"
      [class.error]="hasError"
    />
  </div>`,
  styleUrls: ['label-input.component.scss'],
})
export class LabelInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() hasError: boolean = false;
  @Input() formControl = new FormControl<string>('');
  @Input() id =  (Math.random() + 1).toString(36).substring(7);
  showKeyboard: boolean = false;
  @Output() toggleKeyboard = new EventEmitter<{id: string, show: boolean}>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  constructor() {}


  private onChange: any = () => {};
  private onTouched: any = () => {};

  registerOnTouched = (fn: any) => (this.onTouched = fn);
  writeValue(value: any) {
    this.formControl.setValue(value);
  }
  registerOnChange(fn: any) {
    this.formControl.valueChanges
    this.onChange = fn;
  }

  updateInputValue(value: string) {
    this.formControl.setValue(value);
  }

  showLabel(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    input.placeholder = '';
    input.classList.add('label-active');
    var container = input.closest('.card');
    if (container) {
      var otherOptions = container.querySelector('.alternative') as HTMLElement;
      if (otherOptions) {
        otherOptions.style.display = 'none';
      }
    }
    const wrapper = input.parentElement;
    const label = wrapper?.querySelector('label') as HTMLElement;
    if (label) {
      label.classList.add('show-label');
    }
    this.onChange(this.formControl.value);
    this.writeValue(input.value);

    this.toggleKeyboard.emit({id: this.id, show: true});
  }

  hideKeyboard(event: FocusEvent): void {
    this.toggleKeyboard.emit({id: this.id, show: false});
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.formControl.setValue(inputValue);
    this.onChange(inputValue);
  }
}
