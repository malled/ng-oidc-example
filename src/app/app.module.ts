import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type, InjectionToken } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgOidcClientModule, OIDC_CONFIG, Config } from 'ng-oidc-client';

export var OIDC_CONFIG_TOKEN = new InjectionToken<Config>("forRoot() OidcConfig configuration.");
export function provideOidcConfigFactory(): Config {
  var config = { oidc_config: getOidcSettings() };
  return (config);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgOidcClientModule,
  ],
  providers: [
    {
      provide: OIDC_CONFIG_TOKEN,
      useValue: {}
    },
    {
      provide: OIDC_CONFIG,
      useFactory: provideOidcConfigFactory,
      deps: [OIDC_CONFIG_TOKEN]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function getOidcSettings() {
  return {
    authority: "https://your-authority.net/",
    client_id: 'mvc',
    redirect_uri: window.location + '/callback.html',
    response_type: 'code',
    scope: 'openid profile offline_access', 
    post_logout_redirect_uri: window.location + '/signout-callback.html',
    silent_redirect_uri: window.location + '/renew-callback.html',
    automaticSilentRenew: true,
  }
}