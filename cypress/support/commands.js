// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Gets an element by its [data-test] attribute.
 *
 * @param {string} dataTestSelector - The value of the data-test attribute.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 * @example
 * cy.getDataTest('login-button');
 */
Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

/**
 * Gets an element using a selector abstraction.
 * Meant as a future-proof wrapper over getDataTest.
 *
 * @param {string} selector - The logical selector (e.g., data-test key).
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 * @example
 * cy.getElement('login-button');
 */
Cypress.Commands.add("getElement", (selector) => {
  return cy.getDataTest(selector);
});

/**
 * Clicks an element immediately using the internal selector method.
 *
 * @param {string} selector - The selector used to identify the element.
 * @example
 * cy.clickElement('submit-button');
 */
Cypress.Commands.add("clickElement", (selector) => {
  cy.getElement(selector).click();
});

/**
 * Types text into an input field found within the selected element.
 *
 * @param {string} selector - The selector to identify the container element.
 * @param {string} text - The text to type into the input field.
 * @example
 * cy.inputText('email-field', 'user@example.com');
 */
Cypress.Commands.add("inputText", (selector, text) => {
  cy.getElement(selector).find("input").type(text);
});

/**
 * Asserts that the given text is visible on the page.
 *
 * @param {string | RegExp} text - The text or pattern to check.
 * @example
 * cy.assertTextIsVisible('Welcome');
 * cy.assertTextIsVisible(/Welcome/i);
 */
Cypress.Commands.add("assertTextIsVisible", (text) => {
  cy.contains(text).should("be.visible");
});

/**
 * Asserts that the given text exists in the DOM.
 *
 * @param {string | RegExp} text - The text or pattern to check.
 * @example
 * cy.assertTextExists('Success');
 * cy.assertTextExists(/Success/);
 */
Cypress.Commands.add("assertTextExists", (text) => {
  cy.contains(text).should("exist");
});

/**
 * Asserts that the given text does not exist in the DOM.
 *
 * @param {string | RegExp} text - The text or pattern to check.
 * @example
 * cy.assertTextNotExists('Error');
 * cy.assertTextNotExists(/Error/);
 */
Cypress.Commands.add("assertTextNotExists", (text) => {
  cy.contains(text).should("not.exist");
});
