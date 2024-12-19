import {Component, input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'ls-status',
  standalone: true,
  imports: [
    NgStyle
  ],
  template:`
    <div class="container" [ngStyle]="{'font-size': fontSize()+'px'}">
      <div class="led" [class]="statusColour()"></div>
      <span>{{ amount() }} {{ displayText() }}</span>
    </div>
  `,
  styleUrl: './status.component.css'
})
export class StatusComponent {
  statusColour = input.required<StatusColour>();
  displayText = input<string>();
  amount = input<number>();
  fontSize = input(15);
}
export type StatusColour = "red" | "green" | "orange";
