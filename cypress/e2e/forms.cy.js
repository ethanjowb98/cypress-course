describe("Forms test", () => {
    beforeEach(() => {
        cy.visit("/forms");
        cy.assertTextIsVisible(/Testing forms/i);
    });
    it("Valid email form form submission", () => {
        cy.assertTextNotExists(/Successfully subbed: test@gmail.com!/i).as("not-exist");
        cy.inputText("email-input", "test@gmail.com");
        cy.clickElement("subscribe-btn");
        cy.assertTextExists(/Successfully subbed: test@gmail.com!/i);
        cy.wait(3000);
        cy.assertTextNotExists(/Successfully subbed: test@gmail.com!/i);
    });
    it("Invalid email form submission", () => {
        cy.inputText("email-input", "test@gmail.io");
        cy.clickElement("subscribe-btn");
        cy.assertTextExists(/Invalid email: test@gmail.io/i);
        cy.wait(3000);
        cy.assertTextNotExists(/Invalid email: test@gmail.io/i);
    });
    it("Empty email form submission", () => {
        cy.clickElement("subscribe-btn");
        cy.assertTextExists(/fail!/i);
        cy.wait(3000);
        cy.assertTextNotExists(/fail!/i);
    })
})