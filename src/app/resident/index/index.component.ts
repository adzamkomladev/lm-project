import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, TranslateModule, LinkButtonComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
