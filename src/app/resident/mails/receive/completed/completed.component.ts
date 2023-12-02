import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PromptCardComponent } from '@common/components/prompt-card/prompt-card.component';
import { CountdownComponent } from '@common/components/countdown/countdown.component';
import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PromptCardComponent,
    LinkButtonComponent,
    CountdownComponent,
    TranslateModule,
  ],
  template: `
    <div class="content-container">
      <div class="inner">
        <lastmile-prompt-card
          text="{{ 'general.completed.close.door' | translate }}"
          imageUrl="assets/images/svgs/mail.svg"
        ></lastmile-prompt-card>
        <div class="countdown-container">
          <lastmile-countdown
            [seconds]="5"
            (completed)="onCompleted()"
          ></lastmile-countdown>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedComponent {
  constructor(private router: Router) {}

  onCompleted() {
    this.router.navigateByUrl('/');
  }
}
