import {Component, input} from '@angular/core';
import {IconType} from '../input/input.component';

@Component({
  selector: 'ls-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  icon = input.required<IconType>();
  text = input.required<string>();
}
