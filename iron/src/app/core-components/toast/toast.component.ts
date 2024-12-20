import {Component, input, OnInit, output} from '@angular/core';
import {IconType} from '../input/input.component';
import {Toast} from './toast';

@Component({
  selector: 'ls-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{
  toast = input.required<Toast>();
  close = output();
  icon: IconType | undefined;
  colorClass: string |undefined;

  ngOnInit(): void {
    if (this.toast()) {
      switch (this.toast().severity) {
        case "success":
          this.icon = "check";
          this.colorClass = "green";
          break;
        case "error":
          this.icon = "lightning"
          this.colorClass = "red";
          break;
        case "info":
          this.icon = "i";
          this.colorClass = "blue";
          break;
        case "warning":
          this.icon = "!";
          this.colorClass = "yellow";
          break;
        default:
          this.icon = "i";
          this.colorClass = "blue";
      }
    } else {
      this.icon = "i";
      this.colorClass = "blue";
    }
  }
}
