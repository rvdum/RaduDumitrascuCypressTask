// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from "mochawesome/src/addContext";

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.name === "ConnectorNotFoundError" ||
        err.message.includes("The method eth_call is not implemented by the mock provider.") ||
        err.message.includes("invalid decimal value")) {
        return false
    }
});

Cypress.on("test:after:run",(test,runnable) => {
    if(test.state === "failed"){
        const screenshotDir =`assets/screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png}`
        addContext({ test }, screenshotDir)
    }
})

