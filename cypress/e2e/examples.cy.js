describe("Various examples", () => {
    beforeEach(() => {
        cy.visit("/examples");
    })
    it("Multi-page testing", () => {
        cy.clickElement("nav-why-cypress");
        cy.location("pathname").should("equal", "/");

        cy.clickElement("nav-overview");
        cy.location("pathname").should("equal", "/overview");
        
        cy.clickElement("nav-fundamentals");
        cy.location("pathname").should("equal", "/fundamentals");

        cy.clickElement("nav-forms");
        cy.location("pathname").should("equal", "/forms");

        cy.visit("/examples")
        // cy.clickElement("nav-examples"); // flaky at this portion
        cy.location("pathname").should("equal", "/examples");

        cy.clickElement("nav-component");
        cy.location("pathname").should("equal", "/component");

        cy.clickElement("nav-best-practices");
        cy.location("pathname").should("equal", "/best-practices")
    });
    it("Intercepts", () => {
        cy.intercept("POST", "http://localhost:3000/examples", {
            body: {
                message: "Successfully intercepted request"
            }
        });
        cy.clickElement("post-btn");

        cy.intercept("POST", "http://localhost:3000/examples", {
            fixture: "example.json"
        })
        cy.clickElement("post-btn")
    });
    it.only("Grudges test", () => {
        cy.assertTextIsVisible(/Add Some Grudges/i);
        cy.getElement("grudges-list").within(() => {
            cy.get("li").should("have.length", 0);
        });
        cy.getElement("clear-btn").should("not.exist");

        cy.inputText("add-grudge-input", "grudge 1");
        cy.clickElement("add-grudge-btn");
        cy.getElement("grudges-list").within(() => {
            cy.get("li").should("have.length", 1);
            cy.get("li").its(0).should("contain.text", "grudge 1");
        });

        cy.assertTextIsVisible(/Grudges/i);
        cy.assertTextNotExists(/Add Some Grudges/i);

        cy.inputText("add-grudge-input", "grudge 2");
        cy.clickElement("add-grudge-btn");
        cy.getElement("grudges-list").within(() => {
            cy.get("li").should("have.length", 2);
            cy.get("li").its(1).should("contain.text", "grudge 2");
        });

        cy.getElement("grudges-list").within(() => {
            cy.get("li").its(0).within(() => {
                cy.get("button").click()
            });
            cy.get("li").should("have.length", 1);
            cy.get("li").its(0).should("contain.text", "grudge 2");
        })

        cy.clickElement("clear-btn");
        cy.getElement("clear-btn").should("not.exist");

        cy.getElement("grudges-list").within(() => {
            cy.get("li").should("have.length", 0);
        });
    })
})