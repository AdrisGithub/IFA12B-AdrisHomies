import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from '../../core-components/modal-container/modal-container.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';
import { InputComponent } from '../../core-components/input/input.component';
import { Pair } from '../Artikeldetails/Artikeldetails.component';
import { BubatzStore } from '../../store/ls-store';
import { ButtonComponent } from '../../core-components/button/button.component';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'ls-neuer-artikel',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, InputComponent, ButtonComponent],
  template: `

  <ls-modal-container title="Neuen Artikel anlegen">
    <div class="grid-container">
      <ls-border-container class="grunddaten-border" title="Grunddaten">
        <div class="grunddaten">
          <ls-input class="input-component" (value)="name.set($event)" [fontSize]="20" displayText="Name:" />
          <ls-input class="input-component" (value)="menge.set($event)" [fontSize]="20" displayText="Menge:" />
          <ls-input class="input-component" (value)="preis.set($event)" [fontSize]="20" displayText="Preis:" />
          <ls-input class="input-component" (value)="beschreibung.set($event)" [fullHeight]="true" [fontSize]="20" displayText="Beschreibung:" />
        </div>
      </ls-border-container>
      <ls-border-container title="Artikelinfos">
        <div class="info-container">
          @for (inp of inputs(); track $index; let idx = $index) {
            <div class="info">
              <input (input)="manageInputChangeEvent('key', idx, $event)" [value]="inp.key" type="text">
              <img class="arrow" src="./arrow.svg" alt="arrow icon">
              <input (input)="manageInputChangeEvent('value', idx, $event)" [value]="inp.value" type="text">
              <img (click)="removeInput(idx)" class="close-icon" src="./x.svg" alt="remove icon">
            </div>
          }
        </div>
        <div class="button-container">
          <button (click)="addInp()">
            <img class="plus" src="./plus-sign.svg" alt="plus icon">
            <span class="plus-text">Weitere Info</span>
          </button>
        </div>
      </ls-border-container>
      <ls-button [fullWidth]="true" class="save-button" (onClick)="this.saveArticle()">Anlegen</ls-button>
    </div>
  </ls-modal-container>

  `,
  styleUrl: './NeuerArtikel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeuerArtikelComponent implements ModalBase {

  store = inject(BubatzStore);
  toast = inject(ToastService);

  name = signal<string>('');
  menge = signal<string>('');
  preis = signal<string>('');
  beschreibung = signal<string>('');

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

  removeInput = (idx: number) => {
    this.inputs.update(pairs => pairs.toSpliced(idx, 1))
  }

  saveArticle = () => {
    const amount = parseInt(this.menge());
    if (isNaN(amount)){
      this.toast.addToast({message: 'Eingabe Fehler', detail: 'Die Menge muss eine Zahl sein', severity: "warning"})
      return;
    }
    const sellPrice = parseFloat(this.preis());
    if (isNaN(sellPrice)){
      this.toast.addToast({message: 'Eingabe Fehler', detail: 'Der Verkaufspreis muss eine Zahl sein', severity: "warning"})
      return;
    }
    this.store.createArticle({
      name: this.name(),
      amount,
      buyPrice: 69,
      sellPrice,
      description: this.beschreibung(),
      infos: this.mapInfos(this.inputs())
    })
  }

  mapInfos = (pairs: Pair[]): { [key: string]: string }  => {
    const infos: { [key: string]: string } = {}
    pairs.forEach(pair => infos[pair.key] = pair.value)
    return infos;
  }
}
