import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromptCardComponent } from '@common/components/prompt-card/prompt-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, PromptCardComponent, TranslateModule],
  template: `
    <div class="content-container">
      <div class="inner">
        <lastmile-prompt-card
          text="{{ 'general.completed.close.door' | translate }}"
          imageUrl="assets/images/svgs/mail.svg"
        ></lastmile-prompt-card>
      </div>
    </div>
  `,
})
export class CompletedComponent {}
