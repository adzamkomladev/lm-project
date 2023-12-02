import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lastmile-nav-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './nav-header.component.html',
  styleUrls: ['nav-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderComponent{

  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }

  @Input({ required: true }) text!: string;
  @Input() subTitle!: string;
  @Input() canGoBack: boolean = true;
}
