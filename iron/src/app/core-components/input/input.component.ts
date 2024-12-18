import {Component, input} from '@angular/core';
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
    <input type="text">
  `,
  styleUrl: './input.component.css'
})
export class InputComponent {
  icon = input<IconType>();
  displayText = input.required<String>();
  fontSize =input(26)
}

export type IconType = "ladders" | "x" | "container";
