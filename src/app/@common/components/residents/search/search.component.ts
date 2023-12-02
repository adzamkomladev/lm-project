import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  merge,
  switchMap,
} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { Resident } from '../../../models/residents/resident.model';

import { ResidentsService } from '../../../services/residents.service';
import { KeyboardService } from '@app/@common/services/keyboard.service';

@Component({
  selector: 'lastmile-residents-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  currentTextSubscription!: Subscription;
  residents$!: Observable<Resident[]>;
  searchInput = new FormControl<string>('');

  @Output() search = new EventEmitter<Resident>();
  @Input() id = (Math.random() + 1).toString(36).substring(7);

  constructor(
    private residentsService: ResidentsService,
    private keyboardService: KeyboardService
  ) {}

  ngOnDestroy(): void {
    this.currentTextSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.residents$ = merge(
      this.searchInput.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) => this.residentsService.findAll(search ?? ''))
      ),
      this.residentsService.findAll('')
    );

    this.currentTextSubscription = this.keyboardService.currentText$.subscribe(
      (text) => {
        if (this.keyboardService.currentId === this.id) {
          this.searchInput.setValue(text);
        }
      }
    );
  }

  onSelect(resident: Resident) {
    this.search.emit(resident);
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.searchInput.setValue(inputValue);
  }

  hideKeyboard(event: FocusEvent): void {
    this.onToggleKeyboard({ id: this.id, show: false });
  }

  showKeyboard(event: FocusEvent): void {
    this.onToggleKeyboard({ id: this.id, show: true });
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.show)
      this.keyboardService.showKeyboard(data.id, this.searchInput.value);

    this.keyboardService.switchToAlpha();
  }
}
