/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command for getting a data-test value of an element
     * @param dataTestSelector The data-test value of an element
     */
    getDataTest(dataTestSelector: string): Chainable<void>;
  }
}