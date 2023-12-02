import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LangStateEvent, LanguageService } from './services/language.service';
import { AutoReturnHomeService } from './services/auto-return-home-service';
import { DeviceService } from './services/device.service';
import { CabinetService } from './@common/services/cabinet.service';
import { KeyboardService } from './@common/services/keyboard.service';

import { HeaderComponent } from './@common/components/layouts/header/header.component';
import { FooterComponent } from './@common/components/layouts/footer/footer.component';
import { KeyboardComponent } from './@common/components/keyboard/keyboard.component';
import { NavHeaderComponent } from '@common/components/layouts/nav-header/nav-header.component';

@Component({
  selector: 'lastmile-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NavHeaderComponent,
    KeyboardComponent,
  ],
})
export class AppComponent implements OnInit {
  langIsRtl: boolean = false;
  headerText: string = '';
  subTitle: string = '';
  showKeyboard$!: Observable<boolean>;
  keyboardText$!: Observable<string>;
  resetKeyboard$!: Observable<string>;
  isKeyboardNumeric$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private langService: LanguageService,
    private readonly autoReturnHomeService: AutoReturnHomeService,
    private router: Router,
    private deviceService: DeviceService,
    private cabinetService: CabinetService,
    private keyboardService: KeyboardService
  ) {
    /* Lanugage settings */
    langService.langChanged.subscribe(
      (e: LangStateEvent) => (this.langIsRtl = e.isRtl)
    );
    langService.initDefaultLang(route);

    /* return to home waiter */
    autoReturnHomeService.startInterval();

    // Subscribe to Router events to detect route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Call hideKeyboard when a route change is detected
        this.keyboardService.hideKeyboard();
      }
    });

    /* get device params */
    this.deviceService.loadDeviceData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route: ActivatedRoute = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.headerText = route.snapshot.data['title'] || '';
        this.subTitle = route.snapshot.data['subTitle'] || '';
      });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((q) => {
      const cabinetId = q.get('cabinetId');
      if (cabinetId) this.cabinetService.setCabinetId(cabinetId);
    });

    this.showKeyboard$ = this.keyboardService.showKeyboard$;
    this.keyboardText$ = this.keyboardService.currentText$;
    this.resetKeyboard$ = this.keyboardService.keyboardText$;
    this.isKeyboardNumeric$ = this.keyboardService.isKeyboardNumeric$;
  }

  @HostListener('body:click', ['$event'])
  onClick(e: Event) {
    this.autoReturnHomeService.reset();
  }

  onInput(text: string) {
    this.keyboardService.setCurrentText(text);
  }
}
