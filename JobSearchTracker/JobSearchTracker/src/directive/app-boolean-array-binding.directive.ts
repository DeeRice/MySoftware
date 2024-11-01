import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[BooleanArrayBinding]'
})
export class BooleanArrayBindingDirective {
  @Input() appBooleanArrayBinding!: boolean[];
  @Output() appBooleanArrayBindingChange = new EventEmitter<boolean[]>();

  constructor(private el: ElementRef) {}

  @HostListener('change')
  onChange() {
    const checkedValues = Array.from(this.el.nativeElement.querySelectorAll('.ng-star-inserted'));
    const updatedArray = this.appBooleanArrayBinding.map((value, index) => checkedValues.includes(index));
    this.appBooleanArrayBindingChange.emit(updatedArray);
  }
}