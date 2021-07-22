import { FRAuth, UserManager, TokenManager } from '@forgerock/javascript-sdk';

const FATAL = 'FATAL'

function handleFatalError(err) {
  console.log(err);
  return err;
}

// Get the next step using the FRAuth API
function nextStep(step) {
  FRAuth.next(step).then(handleStep).catch(handleFatalError);
}

function showStep(handler) {
    // document.querySelectorAll('#steps > div').forEach(x => x.classList.remove('active'));
    const panel = document.getElementById(handler);
    console.log('handler', handler)
    console.log('panel', panel)
    if (!panel) {
        console.error(`No panel with ID "${handler}"" found`);
        return false;
    }
    document.getElementById(handler).classList.add('active');
    return true;
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
    switch (step.type) {
        case 'LoginSuccess':
            // If we have a session token, get user information
            // const sessionToken = step.getSessionToken();
            const tokens = TokenManager.getTokens({ forceRenew: true }).then(console.log);
            return UserManager
                .getCurrentUser()
		  .then(showUser)
		  .catch(err => console.error('THE ERROR ', err));

        case 'LoginFailure':
            showStep('Error');
            handlers['Error'](step);
            return;

        default:
            const stage = getStage(step) || FATAL;
	    console.log(stage);
            if (!showStep(stage)) {
                showStep(FATAL);
                handlers[FATAL](step);
            } else {
                handlers[stage](step);
            }
    }
}

function showUser(user) {
    const userObj = JSON.stringify(user, null, 2);
    console.log(success);
    // document.location.href = 'https://ryan.example.com:1234/success'
    // document.querySelector('.btn').addEventListener('click', () => {
    //     logout();
    // });
    showStep('User');
}


export { showUser, handleStep, showStep, nextStep };
