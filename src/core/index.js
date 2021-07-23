import { FRUser } from '@forgerock/javascript-sdk';
import { nextStep } from '../utils/index.js'; 

function interceptForm (e) {
  e.preventDefault();
  nextStep();

  return false;
}

function logout() {
  return FRUser.logout()
		  .then(() => {
		    console.log('navigating');
		    window.location.replace("https://ryan.example.com:1234/")
		  });
}

export { interceptForm, nextStep, logout };
