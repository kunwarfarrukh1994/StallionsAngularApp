import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, ProtectedResourceScopes } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';


export const protectedResourceMap:any=[
    [environment.baseUri,environment.scopesUri]
   ]

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes: environment.scopesUri
          }
    };
  }
//   export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//     const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();
  

//     protectedResourceMap.set(environment.baseUri, [
//         {
//             httpMethod: 'GET',
//             scopes: environment.scopesUri
//         },
//         {
//             httpMethod: 'POST',
//             scopes: environment.scopesUri
//         },
//         {
//             httpMethod: 'PUT',
//             scopes: environment.scopesUri
//         },
//         {
//             httpMethod: 'DELETE',
//             scopes: environment.scopesUri
//         }
//     ]);
  
//     return {
//         interactionType: InteractionType.Popup,
//         protectedResourceMap,
//     };
//   }

export  function MSALInstanceFactory(): IPublicClientApplication {
    let msclient= new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        redirectUri: environment.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for IE 11
      },
      system: {
            allowNativeBroker: false, // Disables native brokering support
        }
    });

    msclient.initialize();
    return msclient;

  }


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        MsalModule,
      


        // MsalModule.forRoot(MSALInstanceFactory(), {
        //     interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup
        //   }, {
        //     interactionType: InteractionType.Redirect, // Providing a default value even though it's not used
        //     protectedResourceMap: protectedResourceMap // Map of protected resources and their associated scopes
        //   },
        //   ),
        

    ],
    providers: [
        AuthService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: MsalInterceptor,
        //     multi: true
        // },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        // {
        //     provide: MSAL_INTERCEPTOR_CONFIG,
        //     useFactory: MSALInterceptorConfigFactory
        // },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]//MsalRedirectComponent
})
export class AppModule { }
