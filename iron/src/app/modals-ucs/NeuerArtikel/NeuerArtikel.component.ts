import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from '../../core-components/modal-container/modal-container.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';
import { InputComponent } from '../../core-components/input/input.component';
InputComponent

@Component({
  selector: 'ls-neuer-artikel',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, InputComponent],
  template: `
  
  <ls-modal-container title="Neuen Artikel anlegen">
    <div class="grid-container">
      <ls-border-container title="Grunddaten">
        <ls-input [fontSize]="20" displayText="Name" />
        <ls-input [fontSize]="20" displayText="Preis" />
        <ls-input [fontSize]="20" displayText="Beschreibung" />
      </ls-border-container>
      <ls-border-container class="container" title="Artikelinfos">
        <div class="info">
          <input (input)="manageInputChangeEvent($event)" type="text">
          <span>🡪</span>
          <input type="text" />
        </div>
      </ls-border-container>
    </div>
  </ls-modal-container>
  
  `,
  styles: `
    :host {
      display: block;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    input {
      border: 1px solid var(--text);
      background-color: var(--card-bg);
      border-radius: 10px;
      padding: 0.5em;
      margin-bottom: 1em;
      color: var(--text);
      width: 100%;
    }

    input:focus{
      outline: none;
    }

    .info {
      display: grid;
      grid-template-columns: 1fr auto 1fr
    }
    
    span {
      margin: auto 10px;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeuerArtikelComponent implements ModalBase {

  inputs = signal<string>("");

  manageInputChangeEvent = (event: any) => {
    this.inputs.set(event.target.value)
  }

  eff = effect(() => console.log(this.inputs()))

}
