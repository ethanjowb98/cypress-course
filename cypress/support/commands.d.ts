/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Gets an element by its [data-test] attribute.
     * @param dataTestSelector The data-test value of an element.
     * @example
     * cy.getDataTest('login-button');
     */
    getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Gets an element by a selector abstraction (future-proof wrapper).
     * @param selector The logical selector (e.g., data-test key).
     * @example
     * cy.getElement('login-button');
     */
    getElement(selector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Clicks an element immediately using the internal selector method.
     * @param selector The selector.
     * @example
     * cy.clickElement('submit-button');
     */
    clickElement(selector: string): Chainable<void>;

    /**
     * Types text into an input field found within the selected element.
     * @param selector The selector used to find the input field.
     * @param text The text to type into the input.
     * @example
     * cy.inputText('email-field', 'user@example.com');
     */
    inputText(selector: string, text: string): Chainable<void>;

    /**
     * Asserts that the given text is visible on the page.
     * @param text The text or RegExp to check.
     * @example
     * cy.assertTextIsVisible('Welcome');
     * cy.assertTextIsVisible(/Welcome/i);
     */
    assertTextIsVisible(text: string | RegExp): Chainable<void>;

    /**
     * Asserts that the given text exists in the DOM.
     * @param text The text or RegExp to check.
     * @example
     * cy.assertTextExists('Success');
     * cy.assertTextExists(/Success/);
     */
    assertTextExists(text: string | RegExp): Chainable<void>;

    /**
     * Asserts that the given text does not exist in the DOM.
     * @param text The text or RegExp to check.
     * @example
     * cy.assertTextNotExists('Error');
     * cy.assertTextNotExists(/Error/);
     */
    assertTextNotExists(text: string | RegExp): Chainable<void>;
  }
}