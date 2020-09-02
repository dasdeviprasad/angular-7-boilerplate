import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';

export const loadTranslation = (http: HttpClient) => {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
};

export function initializerFactory(translate: TranslateService, injector: Injector) {
    return () => new Promise<any>((resolve: any) => {
        const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        locationInitialized.then(() => {
            const langToSet = 'en'
            translate.setDefaultLang('en');
            translate.use(langToSet).subscribe(() => {
                console.info(`Successfully initialized '${langToSet}' language.'`);
            }, err => {
                console.error(`Problem with '${langToSet}' language initialization.'`);
            }, () => {
                resolve(null);
            });
        });
    });
}