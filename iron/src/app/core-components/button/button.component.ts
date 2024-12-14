import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'ls-button',
  standalone: true,
  imports: [],
  template: `
  
    <button type="button" (click)="onClick.emit()">
      <ng-content/> 
    </button>

  `,
  styles: `
  
    button {
      padding: .3em .8em;
      background-color: var(--button);
      color: var(--text);
      border: none;
      border-radius: 10px;
      font-size: 24px;
      cursor: pointer;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { 
  onClick = output();
}
