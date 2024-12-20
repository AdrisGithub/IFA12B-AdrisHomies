import {Component, input, output} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'ls-input',
  standalone: true,
  imports: [
    NgStyle
  ],
  template: `
    <div class="description">
      @if (icon()) {
        <img src="./{{icon()}}.svg" alt="{{icon()}} icon">
      }
      <span [ngStyle]="{'font-size': fontSize()+'px'}" >{{ displayText() }}</span>
    </div>
    <input type="text" (input)="testInput($event)">
  `,
  styleUrl: './input.component.css'
})
export class InputComponent {
  icon = input<IconType>();
  displayText = input.required<string>();
  fontSize =input(26)
  value = output<string>()


  testInput = (event: any) => {
    this.value.emit(event.target.value)
  }
}

export type IconType = "shelf" | "x" | "container" | "plus-sign" | "arrow" | "i" | "check" | "!" | "warn" | "lightning" | "x-inverted";
