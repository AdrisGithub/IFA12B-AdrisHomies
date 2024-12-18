import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'ls-button',
  standalone: true,
  imports: [],
  host: {
    '[style]': '"width: " +(fullWidth() ? "100%" : "max-content")',
  },
  template: `
  
    <button type="button" (click)="onClick.emit()">
      <ng-content/> 
    </button>

  `,
  styles: `

    :host {
      display: inline-block;
    }
  
    button {
      padding: .3em .8em;
      background-color: var(--button);
      color: var(--text);
      border: none;
      border-radius: 10px;
      font-size: 24px;
      cursor: pointer;
      /* just to make sure */
      display: inline;
      width: 100%;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { 
  onClick = output();
  fullWidth = input<boolean>(false);
}
