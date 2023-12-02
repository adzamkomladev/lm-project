import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'lastmile-link-button',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <a
      [class.disabled]="disabled"
      [class]="getClassNames()"
      [routerLink]="null"
      class="link-button"
      (click)="onClick()"
    >
      <div class="icon">
        <img
          [src]="imageUrl"
          alt="{{ text + ' icon' }}"
          class="link-button__icon"
        />
      </div>
      <div class="text">
        <span class="link-button__text">{{ text }}</span
        ><br />
        <span *ngIf="!!description" class="link-button__description">{{
          description
        }}</span>
      </div>
      <div *ngIf="!!cells" class="cells">
        <span class="count">{{ cells }}</span>
        <span class="cell-text">cells</span>
      </div>
    </a>
  `,
  styleUrls: ['link-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkButtonComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) text!: string;
  @Input() route!: string;
  @Input() emitClick = false;
  @Input() queryParams: Record<string, any> = {};
  @Input() disabled: boolean = false;
  @Input() description!: string;
  @Input() cells!: number;
  @Input() additionalClass?: string;

  @Output() clicked = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  getClassNames(): string {
    let classNames = 'link-button';
    if (this.additionalClass) {
      classNames += ' ' + this.additionalClass;
    }
    return classNames;
  }

  async onClick() {
    if (this.emitClick) {
      this.clicked.emit(true);
      return;
    }

    if (this.disabled) return;

    await this.router.navigate([this.route], { queryParams: this.queryParams });
  }
}
