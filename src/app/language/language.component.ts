import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@app/services/language.service';

@Component({
  standalone: true,
  selector: 'app-language',
  templateUrl: './language.component.html',
  imports: [CommonModule, TranslateModule, RouterLink],
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  _languages: Language[] = [
    { code: 'he', localName: 'עברית' },
    { code: 'en', localName: 'English' },
    { code: 'ru', localName: 'Русский' },
    { code: 'ar', localName: 'عربيه' },
  ];

  constructor(private langService: LanguageService, private router: Router) {}

  setLang(lang: string) {
    this.langService.setLang(lang);
    setTimeout(() => this.router.navigate(['/home']), 200);
  }
  ngOnInit(): void {}
}

interface Language {
  code: string;
  localName: string;
}
