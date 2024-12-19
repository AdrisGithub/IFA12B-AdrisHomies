import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from '../../core-components/modal-container/modal-container.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';
import { InputComponent } from '../../core-components/input/input.component';
import { Pair } from '../Artikeldetails/Artikeldetails.component';
InputComponent

@Component({
  selector: 'ls-neuer-artikel',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, InputComponent],
  template: `
  
  <ls-modal-container title="Neuen Artikel anlegen">
    <div class="grid-container">
      <ls-border-container title="Grunddaten">
        <div class="grunddaten">
          <ls-input class="input-component" [fontSize]="20" displayText="Name:" />
          <ls-input class="input-component" [fontSize]="20" displayText="Menge:" />
          <ls-input class="input-component" [fontSize]="20" displayText="Preis:" />
          <ls-input class="input-component" [fullHeight]="true" [fontSize]="20" displayText="Beschreibung:" />
        </div>
      </ls-border-container>
      <ls-border-container title="Artikelinfos">
        <div class="info-container">
          @for (inp of inputs(); track $index; let idx = $index) {
            <div class="info">
              <input (input)="manageInputChangeEvent('key', idx, $event)" type="text">
              <img class="arrow" src="./arrow.svg">
              <input (input)="manageInputChangeEvent('value', idx, $event)" type="text">
              <img class="close-icon" src="./x.svg" alt="">
            </div>
          }
        </div>
        <button (click)="addInp()">+</button>
      </ls-border-container>
    </div>
  </ls-modal-container>
  
  `,
  styleUrl: './NeuerArtikel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeuerArtikelComponent implements ModalBase {

  inputs = signal<Pair[]>([ { key: '', value: '' } ]);

  manageInputChangeEvent = (type: "key" | "value", index: number, event: any) => {
    this.inputs.update(pairs => {
      const newPairs = [...pairs];
      let currentPair = {...newPairs[index]};

      currentPair[type] = event.target.value;

      newPairs[index] = currentPair;
      return newPairs;
    })
  }

  addInp = () => {
    this.inputs.update(pairs => {
      const newPairs = [...pairs];
      newPairs.push({ key: '', value: '' })
      return newPairs;
    })
  }

  eff = effect(() => console.log(this.inputs()))

}
