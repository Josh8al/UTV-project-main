describe("Testing my counter appp", () => {
	const DELAY = 1500;

	beforeEach(() => {
		cy.visit("/");
		cy.wait(DELAY);
	});

	describe("Checking the initial state", () => {
		it("should display the counter function", () => {
			cy.get('[data-testid="counter-component"]').should("be.visible");
			cy.wait(DELAY);

			cy.get('[data-testid="conter-value"]').should(
				"contain",
				"Value of Counter: 0",
			);
			cy.wait;
		});
		it("should have imput fields initialized to 0", () => {
			cy.get('[data-testid="value_inc"]').should("have.value", "0");
			cy.wait(DELAY);

			cy.get('[data-testid="value_dec"]').should("have.value", "0");
			cy.wait(DELAY);
		});
		it("should not render logs section initially", () => {
			cy.get('[data-testid="logs-section"]').should("not.exist");
			cy.wait(DELAY);
		});
	});
	describe("Increase Counter", () => {
		it("should increase counter by entered value", () => {
			// Clear increase input and type "5"
			cy.get('[data-testid="value_inc"]').clear().type("5");

			cy.wait(DELAY);

			// Click increase button
			cy.get('[data-testid="increase-btn"]').click();

			cy.wait(DELAY);

			// Verify counter shows updated value
			cy.get('[data-testid="counter-value"]').should(
				"contain",
				"Value of Counter: 5",
			);
		});
		it("should increase counter multiple times", () => {
			// Increase by 10
			cy.get('[data-testid="value_inc"]').clear().type("10");
			cy.wait(DELAY);

			cy.get('[data-testid="increase-btn"]').click();
			cy.wait(DELAY);

			// Verify counter is 10
			cy.get('[data-testid="counter-value"]').should(
				"contain",
				"Value of Counter: 10",
			);
			cy.wait(DELAY);

			// Increase by 25
			cy.get('[data-testid="value_inc"]').clear().type("25");
			cy.wait(DELAY);

			cy.get('[data-testid="increase-btn"]').click();
			cy.wait(DELAY);

			// Verify counter is 35
			cy.get('[data-testid="counter-value"]').should(
				"contain",
				"Value of Counter: 35",
			);
			cy.wait(DELAY);
		});

		it("should reset input field after increase", () => {
			// Enter value 7
			cy.get('[data-testid="value_inc"]').clear().type("7");
			cy.wait(DELAY);

			// Click increase
			cy.get('[data-testid="increase-btn"]').click();
			cy.wait(DELAY);

			// Verify input resets to 0
			cy.get('[data-testid="value_inc"]').should("have.value", "0");
			cy.wait(DELAY);
		});
	});
	describe("Logs Functionality", () => {
		it("should show logs section after counter operation", () => {
			// Verify logs section doesn't exist initially
			cy.get('[data-testid="logs-section"]').should("not.exist");
			cy.wait(DELAY);

			// Perform increase by 5
			cy.get('[data-testid="value_inc"]').clear().type("5");
			cy.wait(DELAY);

			cy.get('[data-testid="increase-btn"]').click();
			cy.wait(DELAY);

			// Verify logs section is now visible
			cy.get('[data-testid="logs-section"]').should("be.visible");
			cy.wait(DELAY);
		});

		it("should toggle logs visibility", () => {
			// Create log entry
			cy.get('[data-testid="value_inc"]').clear().type("8");
			cy.wait(DELAY);

			cy.get('[data-testid="increase-btn"]').click();
			cy;

			// Verify toggle button shows "Show Logs"
			cy.get('[data-testid="toggle-logs-btn"]').should("contain", "Show Logs");
			cy.wait(DELAY);

			// Click toggle button
			cy.get('[data-testid="toggle-logs-btn"]').click();
			cy.wait(DELAY);

			// Verify logs visible
			cy.get('[data-testid="logs-container"]').should("be.visible");
			cy.wait(DELAY);

			// Verify button shows Hide Logs
			cy.get('[data-testid="toggle-logs-btn"]').should("contain", "Hide Logs");
			cy.wait(DELAY);

			// Click again
			cy.get('[data-testid="toggle-logs-btn"]').click();
			cy.wait(DELAY);

			// Verify logs hidden
			cy.get('[data-testid="logs-container"]').should("not.be.visible");
			cy.wait(DELAY);
		});

		it("should display correct log information", () => {
			// Increase by 15
			cy.get('[data-testid="value_inc"]').clear().type("15");
			cy.wait(DELAY);

			cy.get('[data-testid="increase-btn"]').click();
			cy.wait(DELAY);

			// Show logs
			cy.get('[data-testid="toggle-logs-btn"]').click();
			cy.wait(DELAY);

			// Verify log details
			cy.get('[data-testid="log-entry"]')
				.should("contain", "Previous Value = 0")
				.and("contain", "Value Added = 15")
				.and("contain", "New Value = 15");
			cy.wait(DELAY);
		});
	});
});
