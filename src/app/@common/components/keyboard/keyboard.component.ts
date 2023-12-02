import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import Keyboard, { KeyboardElement } from 'simple-keyboard';
import SimpleKeyboardLayouts from 'simple-keyboard-layouts';
import {
  LayoutItem,
  LayoutItemObj,
} from 'simple-keyboard-layouts/build/interfaces';
import { KeyboardService } from '@app/@common/services/keyboard.service';

@Component({
  selector: 'lastmile-keyboard',
  standalone: true,
  imports: [CommonModule],
  template: ` <span (click)="closeKeyboard()" class="close-button">Close</span>
    <div class="simple-keyboard"></div>
    <ul *ngIf="showLangSwitcher">
      <li class="lang-button-container">
        <button
          *ngFor="let lang of langs"
          class="lang-button"
          [ngClass]="{ active: lang === this.currentLang }"
          (click)="changeLang(lang)"
        >
          {{ lang | uppercase }}
        </button>
      </li>
    </ul>`,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        direction: ltr;

        .close-button {
          display: flex;
          justify-content: flex-end;
          font-size: var(--base-size);
          margin-inline-end: var(--sub-title);
        }

        ul {
          background: var(--main-white);
        }
        .lang-button-container {
          display: flex;
          gap: 20px;

          padding-bottom: var(--base-size);
        }
        .lang-button {
          border-radius: 20px;
          background-color: var(--light-gray);
          box-shadow: 0px 4px 56px 0px rgba(0, 0, 0, 0.05);
          padding-block: var(--sub-title);
          font-size: var(--base-size);
          font-family: var(--sans-serif);
          color: var(--green);
          padding-inline: 20px;
          border: none;
        }

        .lang-button.active {
          background-color: var(--main);
          color: var(--main-white);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  private readonly langMap: Record<string, string> = {
    en: 'english',
    ar: 'arabic',
    he: 'hebrew',
    ru: 'russian',
  };
  private readonly numericLayout = {
    layout: {
      default: ['1 2 3', '4 5 6', '7 8 9', ' 0 {bksp}'],
      shift: ['1 2 3', '4 5 6', '7 8 9', ' 0 {bksp}'],
    },
    theme: 'hg-theme-default hg-layout-numeric numeric-theme',
  };

  keyboard!: Keyboard;
  layout!: LayoutItem | LayoutItemObj;
  layouts = new SimpleKeyboardLayouts();

  currentLang!: string;
  keyboardLang!: string;
  showLangSwitcher = false;

  @Input() isNumeric = false;
  @Input() value: string | null = '';

  get langs() {
    return Object.keys(this.langMap);
  }

  @Input() set resetValue(value: string | null) {
    const resetValue = value === ' ' ? '' : value;
    this.keyboard?.setInput(resetValue || '');
    this.value = resetValue;
  }

  @Output() keyPressed = new EventEmitter<string>();

  constructor(
    private render: Renderer2,
    private translateService: TranslateService,
    private keyboardService: KeyboardService
  ) {}

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;

    if (this.keyboardLang == null) {
      this.keyboardLang = this.currentLang;

      this.translateService.onLangChange.subscribe(({ lang }) => {
        this.currentLang = lang;
        this.keyboardLang = this.currentLang;
        this.setKeyboardLang();
      });
    }
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
      ...this.layout,
    });

    this.setKeyboardLang();
  }

  onChange = (input: string) => {
    this.value = input;
    this.keyPressed.emit(input.replace('.com', ''));
    this.keyboard.replaceInput({ default: input.replace('.com', '') });
  };

  onKeyPress = (button: string) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') this.handleShift();
    if (button === '.com') this.toggleLangSwitcher();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value.replace('.com', ''));
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle,
    });
  };

  toggleLangSwitcher() {
    this.showLangSwitcher = !this.showLangSwitcher;
  }

  private retrieveLayoutViaLanguage(lang: string) {
    return this.layouts.get(this.langMap[lang]);
  }

  setKeyboardLang() {
    this.layout = this.retrieveLayoutViaLanguage(this.keyboardLang);

    if (this.isNumeric) {
      this.layout = this.numericLayout;
    }

    this.keyboard?.setOptions({ ...this.layout });

    this.updateBackspaceButton();
    this.updateComButton();
  }

  updateBackspaceButton() {
    const bkspButton = <KeyboardElement>(
      this.keyboard?.getButtonElement('{bksp}')
    );
    this.render.removeChild(bkspButton, bkspButton?.firstChild);
    this.render.setProperty(
      bkspButton,
      'innerHTML',
      `<svg width="71" height="51" viewBox="0 0 71 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2139 5.54171C19.5177 3.87015 19.9485 3.34609 20.4482 2.97719C20.9368 2.61656 21.487 2.34795 22.0718 2.18451C22.6701 2.01732 23.3482 2 25.4681 2H59.8C61.7932 2 63.1678 2.00156 64.2347 2.08873C65.2783 2.17399 65.8502 2.33109 66.27 2.54497C67.2108 3.02433 67.9757 3.78924 68.455 4.73005C68.6689 5.1498 68.826 5.72169 68.9113 6.76528C68.9984 7.83221 69 9.20681 69 11.2V39.8C69 41.7932 68.9984 43.1678 68.9113 44.2347C68.826 45.2783 68.6689 45.8502 68.455 46.27C67.9757 47.2108 67.2108 47.9757 66.27 48.455C65.8502 48.6689 65.2783 48.826 64.2347 48.9113C63.1678 48.9984 61.7932 49 59.8 49H25.6C23.4307 49 22.7367 48.9819 22.1269 48.8078L21.5777 50.7309L22.1269 48.8078C21.5308 48.6375 20.9715 48.3579 20.4776 47.9831C19.9724 47.5998 19.5416 47.0554 18.24 45.32L7.24007 30.6534C5.2904 28.0539 4.69315 27.196 4.47012 26.3288C4.25203 25.4807 4.26046 24.5903 4.49455 23.7466C4.73395 22.8838 5.34734 22.0373 7.34585 19.4751L18.2139 5.54171Z" stroke="white" stroke-width="4"/>
<line x1="30.5607" y1="13.9393" x2="54.5607" y2="37.9393" stroke="white" stroke-width="3"/>
<line x1="30.4393" y1="37.9393" x2="54.4393" y2="13.9393" stroke="white" stroke-width="3"/>
</svg>
`
    );
  }

  updateComButton() {
    const comButton = <KeyboardElement>this.keyboard?.getButtonElement('.com');
    this.render.removeChild(comButton, comButton?.firstChild);
    this.render.setProperty(
      comButton,
      'textContent',
      this.currentLang?.toUpperCase()
    );
  }

  changeLang(lang: string) {
    this.keyboardLang = lang;
    this.currentLang = lang;

    this.setKeyboardLang();
  }

  closeKeyboard() {
    this.keyboardService.hideKeyboard();
  }
}
