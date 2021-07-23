import { Config } from '@forgerock/javascript-sdk/';
import { logout } from './core/';

Config.set({
    clientId: 'test-app-1',
    redirectUri: 'https://ryan.example.com:1234/_callback',
    scope: 'openid',
    serverConfig: {
      baseUrl: 'https://openam-ryan-bas.forgeblocks.com/am/',
      timeout: 5000
    },
    realmPath: 'alpha',
    tree: 'sdkAuthenticationTree', //sdkAuthenticationTree
});

window.addEventListener("load", () => {
  document
    .getElementById('logout')
    .addEventListener('click', (e) => {
      e.preventDefault();
      return logout();
    });
})


window.removeEventListener('unload', () => {
  document
    .getElementById('logout')
    .removeEventListener('click')
});

