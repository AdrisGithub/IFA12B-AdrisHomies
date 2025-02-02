import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ls-border-container',
    imports: [CommonModule],
    template: `
    <div class="container">
      <div class="float" [ngStyle]="{'font-size': fontSize()+'px'}"> {{ title() }}</div>
      <ng-content/>
    </div>
  `,
    styles: `

    .container {
      border: solid 1px var(--border);
      border-radius: .5em;
      position: relative;
      padding: 1em;
      box-sizing: border-box;
      height: 100%;
    }

    .float {
      position: absolute;
      top: 0;
      left: 1em;
      background-color: var(--bg);
      color: var(--border);
      transform: translateY(-0.7em);
      padding: 0 10px;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorderContainerComponent {

  title = input.required<string>();
  fontSize = input(20);
}
