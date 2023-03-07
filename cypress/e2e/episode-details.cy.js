/// <reference types="cypress" />

describe("episode details page", () => {
  beforeEach(() => {
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
    cy.visit(
      "/podcast/1535809341/episode/333e2c4d-bc72-4a6a-9b7e-e0bd859d08b5"
    );
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
  });

  describe("episode details", () => {
    it("should show the episode details card", () => {
      cy.get('[data-testid="episode-details-card"]').should("exist");
    });

    it("should show the correct episode title", () => {
      cy.get('[data-testid="episode-details-card"]').should(
        "contain",
        'Episode 605 | "3 Hookah Tips In His Mouth"'
      );
    });

    it("should show the audio with the correct src", () => {
      cy.get('[data-testid="episode-details-card"]')
        .find("audio source")
        .should("exist")
        .invoke("attr", "src")
        .should(
          "eq",
          "https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_605_1.mp3?dest-id=2422538"
        );
    });

    it("audio has positive duration", () => {
      cy.get("audio").should(($audio) => {
        expect($audio[0].duration).to.be.gt(0);
      });
    });

    it("should play and pause the audio", () => {
      cy.get("audio")
        .should("have.prop", "paused", true)
        .and("have.prop", "ended", false)
        .then(($audio) => {
          $audio[0].play();
          expect($audio[0].paused).to.be.false;
          cy.wait(2000).then(() => {
            $audio[0].pause();
            expect($audio[0].paused).to.be.true;
          });
        });
    });
  });
});
