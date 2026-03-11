describe("Counter App", () => {
  const DELAY = 1000; // 1 second delay between steps

  beforeEach(() => {
    cy.visit("/");
    cy.wait(DELAY);
  });

  describe("Initial State", () => {
    it("should display the counter component", () => {
      cy.get('[data-testid="counter-component"]').should("be.visible");
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value of Counter: 0",
      );
      cy.wait(DELAY);
    });

    it("should have input fields initialized to 0", () => {
      cy.get('[data-testid="value_inc"]').should("have.value", "0");
      cy.wait(DELAY);

      cy.get('[data-testid="value_dec"]').should("have.value", "0");
      cy.wait(DELAY);
    });

    it("should not show logs section initially", () => {
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.wait(DELAY);
    });
  });

  describe("Increase Counter", () => {
    it("should increase counter by entered value", () => {
      // Enter value 5 in increase input
      cy.get('[data-testid="value_inc"]').clear().type("5");
      cy.wait(DELAY);

      // Click increase button
      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Verify counter increased to 5
      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 5",
      );
      cy.wait(DELAY);
    });

    it("should increase counter multiple times", () => {
      // First increase by 10
      cy.get('[data-testid="value_inc"]').clear().type("10");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 10",
      );
      cy.wait(DELAY);

      // Second increase by 25
      cy.get('[data-testid="value_inc"]').clear().type("25");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 35",
      );
      cy.wait(DELAY);
    });

    it("should reset input field after increase", () => {
      cy.get('[data-testid="value_inc"]').clear().type("7");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Input should reset to 0
      cy.get('[data-testid="value_inc"]').should("have.value", "0");
      cy.wait(DELAY);
    });
  });

  describe("Decrease Counter", () => {
    it("should decrease counter by entered value", () => {
      // Enter value 3 in decrease input
      cy.get('[data-testid="value_dec"]').clear().type("3");
      cy.wait(DELAY);

      // Click decrease button
      cy.get('[data-testid="button_dec"]').click();
      cy.wait(DELAY);

      // Verify counter decreased to -3
      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : -3",
      );
      cy.wait(DELAY);
    });

    it("should decrease counter from a positive value", () => {
      // First increase to 20
      cy.get('[data-testid="value_inc"]').clear().type("20");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 20",
      );
      cy.wait(DELAY);

      // Now decrease by 8
      cy.get('[data-testid="value_dec"]').clear().type("8");
      cy.wait(DELAY);

      cy.get('[data-testid="button_dec"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 12",
      );
      cy.wait(DELAY);
    });

    it("should reset input field after decrease", () => {
      cy.get('[data-testid="value_dec"]').clear().type("5");
      cy.wait(DELAY);

      cy.get('[data-testid="button_dec"]').click();
      cy.wait(DELAY);

      // Input should reset to 0
      cy.get('[data-testid="value_dec"]').should("have.value", "0");
      cy.wait(DELAY);
    });
  });

  describe("Logs Functionality", () => {
    it("should show logs section after counter operation", () => {
      // Initially no logs section
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.wait(DELAY);

      // Perform an increase operation
      cy.get('[data-testid="value_inc"]').clear().type("5");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Logs section should now appear
      cy.get('[data-testid="logs-section"]').should("be.visible");
      cy.wait(DELAY);
    });

    it("should toggle logs visibility", () => {
      // Create a log entry first
      cy.get('[data-testid="value_inc"]').clear().type("10");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Click "Show Logs" button
      cy.get('[data-testid="toggle-logs"]').should("contain", "Show Logs");
      cy.wait(DELAY);

      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      // Logs should be visible
      cy.get('[data-testid="log_info"]').should("be.visible");
      cy.wait(DELAY);

      // Button should now say "Hide Logs"
      cy.get('[data-testid="toggle-logs"]').should("contain", "Hide Logs");
      cy.wait(DELAY);

      // Click to hide logs
      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      // Logs should be hidden
      cy.get('[data-testid="log_info"]').should("not.exist");
      cy.wait(DELAY);
    });

    it("should display correct log information", () => {
      // Increase by 15
      cy.get('[data-testid="value_inc"]').clear().type("15");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Show logs
      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      // Verify log content
      cy.get('[data-testid="log_info"]')
        .should("contain", "Previous Value = 0")
        .and("contain", "Value Added = 15")
        .and("contain", "New Value = 15");
      cy.wait(DELAY);
    });

    it("should delete log entry on click", () => {
      // Create first log entry
      cy.get('[data-testid="value_inc"]').clear().type("10");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Create second log entry
      cy.get('[data-testid="value_inc"]').clear().type("5");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Show logs
      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      // Should have 2 log entries
      cy.get('[data-testid="log_info"]').should("have.length", 2);
      cy.wait(DELAY);

      // Click first log to delete it
      cy.get('[data-testid="log_info"]').first().click();
      cy.wait(DELAY);

      // Should now have 1 log entry
      cy.get('[data-testid="log_info"]').should("have.length", 1);
      cy.wait(DELAY);
    });

    it("should hide logs section when all logs are deleted", () => {
      // Create a log entry
      cy.get('[data-testid="value_inc"]').clear().type("5");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Show logs
      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      // Delete the log
      cy.get('[data-testid="log_info"]').click();
      cy.wait(DELAY);

      // Logs section should disappear
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.wait(DELAY);
    });
  });

  describe("Combined Operations", () => {
    it("should handle multiple increase and decrease operations", () => {
      // Increase by 50
      cy.get('[data-testid="value_inc"]').clear().type("50");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 50",
      );
      cy.wait(DELAY);

      // Decrease by 20
      cy.get('[data-testid="value_dec"]').clear().type("20");
      cy.wait(DELAY);

      cy.get('[data-testid="button_dec"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 30",
      );
      cy.wait(DELAY);

      // Increase by 15
      cy.get('[data-testid="value_inc"]').clear().type("15");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 45",
      );
      cy.wait(DELAY);

      // Show logs and verify 3 entries
      cy.get('[data-testid="toggle-logs"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="log_info"]').should("have.length", 3);
      cy.wait(DELAY);
    });
  });

  describe("Edge Cases", () => {
    it("should not create log when clicking button with 0 value", () => {
      // Click increase with default 0 value
      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      // Logs section should not appear
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.wait(DELAY);

      // Counter should stay at 0
      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 0",
      );
      cy.wait(DELAY);
    });

    it("should handle large numbers", () => {
      cy.get('[data-testid="value_inc"]').clear().type("9999");
      cy.wait(DELAY);

      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);

      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value Of Counter : 9999",
      );
      cy.wait(DELAY);
    });
  });
});
