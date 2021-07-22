import { Config } from '@forgerock/javascript-sdk/';
import { nextStep } from './utils/';

Config.set({
    clientId: 'test-app-1',
    redirectUri: 'https://ryan.example.com:8443/_callback',
    scope: 'openid',
    serverConfig: {
      baseUrl: 'https://openam-ryan-bas.forgeblocks.com/am/',
      timeout: 5000
    },
    realmPath: 'alpha',
    tree: 'sdkAuthenticationTree', //sdkAuthenticationTree
});

function interceptForm (e) {
  e.preventDefault();
  nextStep();

  return false;
}

window.addEventListener("load", () => {
  let form = document.getElementById('my-form');
  form.addEventListener('submit', interceptForm);
});

nextStep();
