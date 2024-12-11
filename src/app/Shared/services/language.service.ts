import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../enums/language';

declare let $;

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private lang: Language = Language.English;
    private langKey = 'lang';
    changedLang = false;
    public LangChanged: BehaviorSubject<Language> = new BehaviorSubject<Language>(
        this.lang
    );
    loadedFilesCounter: number;

    public get Lang() {
        return this.lang;
    }
    constructor(private translate: TranslateService) {
        this.setLanguageIfNotExists();
        translate.setDefaultLang(Language.English);
    }

    private setLanguageIfNotExists() {
        this.lang = localStorage.getItem(this.langKey) as Language;
        if (
            !this.lang ||
            (this.lang !== Language.Arabic && this.lang !== Language.English)
        ) {
            this.lang = Language.English;
            localStorage.setItem(this.langKey, this.lang);
        }
        this.setLanguage(this.lang);
    }

    setLanguage(lang: Language) {
        if (!lang || (lang !== Language.Arabic && lang !== Language.English)) {
            this.lang = Language.English;
        } else {
            this.lang = lang;
        }
        localStorage.setItem(this.langKey, this.lang);

        this.translate.use(this.lang);
        if (this.LangChanged.value !== this.lang) {
            this.LangChanged.next(this.lang);
        }
    }

}
