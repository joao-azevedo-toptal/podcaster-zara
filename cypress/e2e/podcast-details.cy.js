/// <reference types="cypress" />

describe("podcast details page", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("localforage");
    cy.intercept(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
      { fixture: "podcast-request.json" }
    ).as("podcasts");
    cy.intercept("https://itunes.apple.com/lookup/json?id=1535809341", {
      fixture: "podcast-details-request.json",
    }).as("podcast-details");
    cy.intercept("https://jbpod.libsyn.com/applepodcast", {
      fixture: "rss-feed-request.xml",
    }).as("rss-feed");
    cy.visit("/podcast/1535809341");
    cy.wait("@podcasts");
    cy.wait("@podcast-details");
    cy.wait("@rss-feed");
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

  describe("podcast details sidebar card", () => {
    it("should show the details card", () => {
      cy.get('[data-testid="podcast-details-sidebar"]').should("exist");
    });

    it("should have an image", () => {
      cy.get('[data-testid="podcast-details-sidebar"]')
        .find("img")
        .should("exist");
    });

    it("should have the right text", () => {
      cy.get('[data-testid="podcast-details-sidebar"]')
        .should("contain", "The Joe Budden Podcast")
        .should("contain", "The Joe Budden Network")
        .should(
          "contain",
          "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends."
        );
    });

    it("should show the podcast details links", () => {
      cy.get('[data-testid="podcast-details-sidebar-image"]').should("exist");
      cy.get('[data-testid="podcast-details-sidebar-name"]').should("exist");
      cy.get('[data-testid="podcast-details-sidebar-artist"]').should("exist");
    });

    it("is redirected to the podcast details page", () => {
      cy.get('[data-testid="podcast-details-sidebar-image"]')
        .should("exist")
        .click();

      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/podcast/1535809341`
      );
    });
  });

  describe("episodes list", () => {
    it("should show the episodes counter with the right value", () => {
      cy.get('[data-testid="episodes-list-counter"]')
        .should("exist")
        .contains("411");
    });

    it("should show the table of episodes", () => {
      cy.get('[data-testid="episodes-list-table"]').should("exist");
    });

    it("should show the table header", () => {
      cy.get('[data-testid="episodes-list-table"]')
        .find("thead")
        .should("contain", "Title")
        .should("contain", "Date")
        .should("contain", "Duration");
    });

    it("should show the table of episodes with the correct number of rows", () => {
      cy.get('[data-testid="episodes-list-table"]')
        .find('[data-testid="episodes-list-table-row"]')
        .should("have.length", 411);
    });

    it("is redirected to the episode details page", () => {
      cy.get('[data-testid="episodes-list-table"]')
        .find('[data-testid="episodes-list-table-link"]')
        .first()
        .should("exist")
        .click();

      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/podcast/1535809341/episode/1`
      );
    });
  });
});
