import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function getMetaData(key: string) {
  const metaEl = <HTMLMetaElement>document.getElementById(key);
  return metaEl.getAttribute('value');
}
