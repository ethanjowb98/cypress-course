describe('Fundamentals test', () => {
  beforeEach(() => {
    cy.visit("/fundamentals")
  })
  it('Header check', () => {
    cy.getDataTest("fundametals-test-header").contains(/Testing Fundamentals/i).should("be.visible")
    cy.getDataTest("fundametals-test-header").should("contain.text", "Testing Fundamentals")
  })
  it("Accordion Check", () => {
    cy.contains(/Your tests will exist in a describe block./i).should("not.be.visible")
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should("be.visible")
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should("not.be.visible")
  })
})