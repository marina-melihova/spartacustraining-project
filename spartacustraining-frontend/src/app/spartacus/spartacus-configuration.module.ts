import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { AuthConfig, FeaturesConfig, I18nConfig, OccConfig, provideConfig, SiteContextConfig } from '@spartacus/core';
import { defaultCmsContentProviders, layoutConfig, mediaConfig } from '@spartacus/storefront';

import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occPrefix,
        }
      }
    }),
    provideConfig(<SiteContextConfig>{
      context: {
        baseSite: [environment.contextBaseSite],
        currency: [environment.contextCurrency],
        language: [environment.contextLanguage]
      }
    }),
    provideConfig(<AuthConfig>{
      authentication: {
        client_id: environment.authenticationClientId,
        client_secret: environment.authenticationClientSecret,
        OAuthLibConfig: {
          requireHttps: true,
          scope: 'basic'
        }
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      }
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '4.3'
      }
    })]
})
export class SpartacusConfigurationModule { }
