/// <reference types="cypress" />

describe("home page", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("localforage");
    cy.intercept(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
      { fixture: "podcast-request.json" }
    ).as("podcasts");
    cy.visit("/");
    cy.wait("@podcasts");
  });

  describe("header", () => {
    it("should show the header", () => {
      cy.get('[data-testid="header"]').should("exist");
    });

    it("should show the home link", () => {
      cy.get('[data-testid="home-link"]').should("exist");
    });

    it("is redirected to the home page", () => {
      cy.get('[data-testid="home-link"]').should("exist").click();

      cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
    });
  });

  describe("notification manager", () => {
    it("should show the notification manager", () => {
      cy.get('[data-testid="notifications-manager"]').should("exist");
    });

    it("should show a notification when there is an error", () => {
      cy.visit("/podcast/fake");
      cy.get('[data-testid="notifications-manager"]')
        .find('[data-testid="notification"]')
        .should("have.length", 1);
    });
  });

  describe("search and badge", () => {
    it("should show the search input", () => {
      cy.get('[data-testid="search-input"]').should("exist");
    });

    it("should show a badge with the correct count", () => {
      cy.get('[data-testid="badge"]').should("have.text", "100");
    });

    it("should show invalid badge and input when there is no podcasts filtered", () => {
      cy.get('[data-testid="search-input"]')
        .type("Fake")
        .focus()
        .should("have.class", "focus:border-red-500")
        .should("have.class", "focus:ring-red-500");
      cy.get('[data-testid="badge"]')
        .should("have.class", "bg-red-500")
        .should("have.text", "0");
    });
  });

  describe("podcast list", () => {
    it("should show the podcast list", () => {
      cy.get('[data-testid="podcasts-list"]').should("exist");
    });

    it("should show the correct number of podcasts in the list", () => {
      cy.get('[data-testid="podcasts-list"]')
        .find('[data-testid="podcast-card"]')
        .should("have.length", 100);
    });

    it("is redirected to the podcast page", () => {
      cy.get('[data-testid="podcasts-list"]')
        .find('[data-testid="podcast-card"]')
        .first()
        .should("exist")
        .click();

      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/podcast/1535809341`
      );
    });
  });
});
