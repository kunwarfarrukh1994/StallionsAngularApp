// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  clientId: '428b4eae-2fd0-420f-909e-b9ec7a07aab4',
  tenantid:"eb8cf9f7-9cb6-4112-9ba6-ab8adfec1e04",
  baseUri: 'https://localhost:5001',
  redirectUri:"http://localhost:4200",
  // authority:"https://login.microsoftonline.com/eb8cf9f7-9cb6-4112-9ba6-ab8adfec1e04",
  authority:"https://stallionsdomian.b2clogin.com/stallionsdomian.onmicrosoft.com/B2C_1_susi",
  scopesUri: [
     'https://stallionsdomian.onmicrosoft.com/demoapi/Users.Read',
      'https://stallionsdomian.onmicrosoft.com/demoapi/Users.Create',
  ],
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
