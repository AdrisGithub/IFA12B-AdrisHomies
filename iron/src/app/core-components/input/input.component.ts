import {Component, input} from '@angular/core';

@Component({
  selector: 'ls-input',
  standalone: true,
  imports: [],
  template: `
    <div class="description">
      <img src="./{{icon()}}.svg" alt="{{icon()}} icon">
      <span>{{ displayText() }}</span>
    </div>
    <input type="text">
  `,
  styleUrl: './input.component.css'
})
export class InputComponent {
  icon = input<IconType>();
  displayText = input.required<String>();

}

export type IconType = "ladders" | "x" | "container";
