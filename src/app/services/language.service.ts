import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultLangChangeEvent, LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  langChanged = new EventEmitter<LangStateEvent>();

  constructor(
    private readonly translate: TranslateService) {

    translate.onLangChange.subscribe((l: LangChangeEvent) => this.setLang(l.lang));
    translate.onDefaultLangChange.subscribe((l: DefaultLangChangeEvent) => {
      if(l.lang != translate.currentLang)
        console.trace(`defaultLang changed. new value is: ${l.lang}. current lang is ${translate.currentLang}`)
    })
    translate.onLangChange.subscribe((l: LangChangeEvent) => {
      if(l.lang != translate.currentLang)
      console.trace(`currentLang changed. new value is: ${l.lang}. default lang is ${translate.defaultLang}`)  
    })

  }

  initDefaultLang(route: ActivatedRoute) {

    this.setDefaultLang(localStorage['lang'] || 'he');

    route.queryParamMap.subscribe(q => {
      const lang = q.get("lang")
      if (lang) {
        this.setDefaultLang(lang);
      }
    });

  }

  setDefaultLang(lang: string) {
    if (lang != this.translate.defaultLang) {
      this.translate.setDefaultLang(lang);
    }

    this.setLang(lang);
  }

  setLang(lang: string) {
    localStorage['lang'] = lang;
    document.documentElement.setAttribute('lang', lang);
    if (lang != this.translate.currentLang) {
      this.translate.use(lang);

      this.langChanged.emit({
        lang: lang,
        isRtl: ["he", "ar"].includes(lang)
      })
    }
  }

  resetLang() {
    this.setLang(this.translate.defaultLang);
  }
  getLang(){
    return localStorage['lang']
  }
}

export interface LangStateEvent {
  lang: string;
  isRtl: boolean;
}