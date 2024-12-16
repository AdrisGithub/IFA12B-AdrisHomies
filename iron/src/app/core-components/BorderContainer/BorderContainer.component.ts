import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ls-border-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="float" [ngStyle]="{'font-size': fontSize()+'px'}"> {{ title() }}</div>
      <ng-content/>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .container {
      border: solid 1px var(--text-secondary);
      border-radius: .5em;
      position: relative;
      margin: .3em;
      padding: 1em;
    }

    .float {
      position: absolute;
      top: -1em;
      left: 1em;
      background-color: var(--bg);
      padding: 5px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorderContainerComponent {

  title = input.required<string>();
  fontSize = input(20);
}
