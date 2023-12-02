import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, LinkButtonComponent, TranslateModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
