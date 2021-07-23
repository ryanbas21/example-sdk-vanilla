import { FRAuth } from '@forgerock/javascript-sdk';

const FATAL = 'FATAL'

function handleFatalError(err) {
  console.log(err);
  return err;
}

// Get the next step using the FRAuth API
function nextStep(step) {
  console.log('step: ', step);
  FRAuth.next(step).then(handleStep).catch(handleFatalError);
}

function getStage(step) {
  // Check if the step contains callbacks for capturing username and password
  const usernameCallbacks = step.getCallbacksOfType('NameCallback');
  const passwordCallbacks = step.getCallbacksOfType('PasswordCallback');

  if (usernameCallbacks.length && passwordCallbacks.length) {
      return "UsernamePassword";
  }

  return undefined;
}
const handlers = {
  UsernamePassword: (step) => {
    document.querySelector('.btn').addEventListener('click', (e) => {
      e.preventDefault();
      const nameCallback = step.getCallbackOfType('NameCallback');
      const passwordCallback = step.getCallbackOfType('PasswordCallback');
      nameCallback.setName(document.querySelector('input[type=text]').value);
      passwordCallback.setPassword(document.querySelector('input[type=password]').value);
      nextStep(step);
    })
  },
  Error: (step) => {
    document.querySelector('#Error').innerHTML = step.payload.message + ' ' + step.payload.reason;
  },
  [FATAL]: (_step) => { }
}

function handleStep(step) {
    console.log(step.type)
    if (!step.type) return;

    switch (step.type) {
        case 'LoginSuccess':
	    step.type = false;
	    window.location.replace('https://ryan.example.com:1234/success.html');
	    return;
	    

        case 'LoginFailure':
            handlers['Error'](step);
            return;

        default:
            const stage = getStage(step) || FATAL;
            return stage === FATAL 
	      ? handlers[FATAL](step) 
	      : handlers[stage](step);
    }
}


export { showUser, handleStep, nextStep };
