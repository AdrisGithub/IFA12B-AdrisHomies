import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ls-button',
  standalone: true,
  imports: [],
  template: `
  
    <button type="button">
      <ng-content/>
    </button>

  `,
  styles: `
  
    button {
      all: unset;
      margin: 1em;
      background-color: #DE8315;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { }
