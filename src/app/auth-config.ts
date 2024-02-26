import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_susi_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://stallionsdomian.b2clogin.com/stallionsdomian.onmicrosoft.com/B2C_1_susi',
        },
    },
    authorityDomain: 'stallionsdomian.b2clogin.com',
};
export const msalConfig: Configuration = {
    auth: {
        clientId: environment.clientId, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: 'http://localhost:4200', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
        postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}
export const loginRequest = {
    scopes: ['openid profile', 'offline_access','https://stallionsdomian.onmicrosoft.com/demoapi/Users.Read' ,'https://stallionsdomian.onmicrosoft.com/demoapi/Users.Create']
}


/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */


// const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

// /**
//  * Enter here the user flows and custom policies for your B2C application,
//  * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
//  * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
//  */
// export const b2cPolicies = {
//     names: {
//         signUpSignIn: 'B2C_1_susi_v2',
//         resetPassword: 'B2C_1_reset_v3',
//         editProfile: 'B2C_1_edit_profile_v2',
//     },
//     authorities: {
//         signUpSignIn: {
//             authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi_v2',
//         },
//         resetPassword: {
//             authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_reset_v3',
//         },
//         editProfile: {
//             authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_edit_profile_v2',
//         },
//     },
//     authorityDomain: 'fabrikamb2c.b2clogin.com',
// };

// /**
//  * Configuration object to be passed to MSAL instance on creation.
//  * For a full list of MSAL.js configuration parameters, visit:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
//  */
// export const msalConfig: Configuration = {
//     auth: {
//         clientId: '9067c884-9fa6-414f-9aa4-a565b1cb46be', // This is the ONLY mandatory field that you need to supply.
//         authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
//         knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
//         redirectUri: '/auth', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
//         postLogoutRedirectUri: '/', // Points to window.location.origin by default.
//     },
//     cache: {
//         cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
//         storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
//     },
//     system: {
//         loggerOptions: {
//             loggerCallback(logLevel: LogLevel, message: string) {
//                 console.log(message);
//             },
//             logLevel: LogLevel.Verbose,
//             piiLoggingEnabled: false
//         }
//     }
// }

// /**
//  * Scopes you add here will be prompted for user consent during sign-in.
//  * By default, MSAL.js will add OIDC scopes (openid, profile) to any login request.
//  * For more information about OIDC scopes, visit:
//  * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
//  */
// export const loginRequest = {
//     scopes: []
// }

// /**
//  * An optional silentRequest object can be used to achieve silent SSO
//  * between applications by providing a "loginHint" property (such as a username). For more, visit:
//  * https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-sso#sso-between-different-apps
//  * If you do not receive the username claim in ID tokens, see also:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/FAQ.md#why-is-getaccountbyusername-returning-null-even-though-im-signed-in
//  */
// export const silentRequest = {
//     scopes: [],
//     loginHint: "example@domain.net"
// };
