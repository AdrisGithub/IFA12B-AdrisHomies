import {Component, input} from '@angular/core';

@Component({
  selector: 'ls-status',
  standalone: true,
  imports: [],
  template:`
    <div class="container">
      <div class="led" [class]="statusColour()"></div>
      <span>{{ amount() }} {{ displayText() }}</span>
    </div>
  `,
  styleUrl: './status.component.css'
})
export class StatusComponent {
  statusColour = input.required<StatusColour>(); //TODO enum oderso
  displayText = input<string>();
  amount = input<number>();
}
export type StatusColour = "red" | "green" | "orange";
