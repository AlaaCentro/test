import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TranslateEnumsService {

    constructor() { }

    private startBalanceCalculationEnumTranslations: Record<string, Record<string, string>> = {
        'en': {
            'FromHiring': 'From Hiring',
            'After3Months': 'After 3 Months',
            'After6Months': 'After 6 Months'
        },
        'ar': {
            'FromHiring': 'من تاريخ التوظيف',
            'After3Months': 'بعد 3 أشهر',
            'After6Months': 'بعد 6 أشهر'
        }
    };

    private balanceCalculationEnumTranslations: Record<string, Record<string,string>> = {
        "en": {
            'Bulk': 'Bulk',
            'Accumulative': 'Accumulative'
        },
        "ar":{
            'Bulk': 'الكل',
            'Accumulative': 'تراكمي'
        }
    }

    translateStartBalanceCalculationEnum(key: string, lang: 'en' | 'ar'): string {
        return this.startBalanceCalculationEnumTranslations[lang][key] || key;
    }

    translateBalanceCalculationEnum(key: string, lang: 'en' | 'ar'): string {
        return this.balanceCalculationEnumTranslations[lang][key] || key;
    }

}
