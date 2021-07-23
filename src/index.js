import { Config } from '@forgerock/javascript-sdk/';
import { interceptForm, nextStep } from './core/index.js';

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
  const form = document.getElementById('my-form');
  form.addEventListener('submit', interceptForm);
  nextStep();
});

window.addEventListener('unload', () => {
  const form = document.getElementById('my-form');
  form.removeEventListener('submit', interceptForm, false);
});

