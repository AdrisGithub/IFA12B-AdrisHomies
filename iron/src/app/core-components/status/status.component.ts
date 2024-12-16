import {Component, input} from '@angular/core';

@Component({
  selector: 'ls-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  statusType = input.required<string>(); //TODO enum oderso
  displayText = input<string>();
  amount = input<number>();
}
