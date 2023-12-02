import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lastmile-prompt-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="imageUrl" alt="Prompt image" />
      <p class="text" [innerHTML]="text"></p>
    </div>
  `,
  styleUrls: ['./prompt-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptCardComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) text!: string;
}
