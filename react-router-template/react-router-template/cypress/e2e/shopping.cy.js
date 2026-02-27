describe("React Router Application E2E Tests", () => {
	const BASE_URL = "http://localhost:5173";

	beforeEach(() => {
		cy.visit(BASE_URL);
	});

	// Test 1: Navigation - Home page loads correctly
	it("should load the home page with correct content", () => {
		cy.get('[data-testid="home"]').should("be.visible");
		cy.get('[data-testid="home"]').contains("Welcome...");
		cy.get('[data-testid="home"]').contains(
			"Quality Clothing for Quality People",
		);
		cy.get('[data-testid="brandName"]').should(
			"contain",
			"The Clothing Company",
		);
	});

	// Test 2: Navigation - Main navigation links work correctly
	it("should navigate between main routes using nav links", () => {
		// Check all nav links are present
		cy.get('[data-testid="Home_Link"]').should("be.visible");
		cy.get('[data-testid="About_Link"]').should("be.visible");
		cy.get('[data-testid="Product_Link"]').should("be.visible");

		// Navigate to About
		cy.get('[data-testid="About_Link"]').click();
		cy.url().should("include", "/about");

		// Navigate to Products
		cy.get('[data-testid="Product_Link"]').click();
		cy.url().should("include", "/products");

		// Navigate back to Home
		cy.get('[data-testid="Home_Link"]').click();
		cy.url().should("eq", BASE_URL + "/");
	});

	// Test 3: Authentication - Login flow works correctly
	it("should login successfully and show logged in state", () => {
		// Initially should show Login button
		cy.get('[data-testid="login_button"]').should("contain", "Login");

		// Click login
		cy.get('[data-testid="login_button"]').click();

		// Should show loader during login
		cy.get('[data-testid="loader"]').should("be.visible");

		// After loading, should show Logout button
		cy.get('[data-testid="login_button"]', { timeout: 3000 }).should(
			"contain",
			"Logout",
		);
	});

	// Test 4: Authentication - Logout flow works correctly
	it("should logout successfully after being logged in", () => {
		// Login first
		cy.get('[data-testid="login_button"]').click();
		cy.get('[data-testid="login_button"]', { timeout: 3000 }).should(
			"contain",
			"Logout",
		);

		// Now logout
		cy.get('[data-testid="login_button"]').click();

		// Should show loader during logout
		cy.get('[data-testid="loader"]').should("be.visible");

		// After loading, should show Login button again
		cy.get('[data-testid="login_button"]', { timeout: 3000 }).should(
			"contain",
			"Login",
		);
	});

	// Test 5: Protected Route - Products page requires login
	it("should show login message on Products page when not logged in", () => {
		// Navigate to Products without logging in
		cy.get('[data-testid="Product_Link"]').click();

		// Should show login prompt
		cy.contains("Please Login To See Products").should("be.visible");
	});

	// Test 6: Products - Display products when logged in
	it("should display products when user is logged in", () => {
		// Login first
		cy.get('[data-testid="login_button"]').click();
		cy.get('[data-testid="login_button"]', { timeout: 3000 }).should(
			"contain",
			"Logout",
		);

		// Navigate to Products
		cy.get('[data-testid="Product_Link"]').click();

		// Should display product categories
		cy.contains("Hoodies").should("be.visible");
		cy.contains("Tees").should("be.visible");
		cy.contains("Sneakers").should("be.visible");

		// Should display product images
		cy.get(".products img").should("have.length.at.least", 1);
	});

	// Test 7: Nested Routes - About page with Info/Offers sub-navigation
	it("should navigate to About page and display nested routes", () => {
		// Navigate to About
		cy.get('[data-testid="About_Link"]').click();

		// Should redirect to /about/info by default
		cy.url().should("include", "/about/info");
		cy.get('[data-testid="info"]').should("be.visible");
		cy.contains("About Us").should("be.visible");

		// Should show sub-navigation
		cy.get('[data-testid="mini_switch"]').should("be.visible");

		// Navigate to Offers
		cy.get('[data-testid="mini_switch"]').contains("Offers").click();
		cy.url().should("include", "/about/offers");
		cy.get('[data-testid="offers"]').should("be.visible");
		cy.contains("Latest Offers").should("be.visible");
	});

	// Test 8: Offers - Display offer items with correct data
	it("should display offers with title and price", () => {
		// Navigate to About > Offers
		cy.get('[data-testid="About_Link"]').click();
		cy.get('[data-testid="mini_switch"]').contains("Offers").click();

		// Should display 3 offer items
		cy.get('[data-testid="items_offers"]').should("have.length", 3);

		// Verify offer details are displayed
		cy.get('[data-testid="items_offers_title"]').should("have.length", 3);
		cy.get('[data-testid="items_offers_price"]').should("have.length", 3);

		// Verify specific offers exist
		cy.contains("Hoodie").should("be.visible");
		cy.contains("Sneakers").should("be.visible");
		cy.contains("Tee").should("be.visible");

		// Verify prices
		cy.contains("€21.99").should("be.visible");
		cy.contains("€34.99").should("be.visible");
		cy.contains("€12.99").should("be.visible");
	});

	// Test 9: Product Details - Navigate to product details from offers
	it("should navigate to product details from offers page", () => {
		// Navigate to About > Offers
		cy.get('[data-testid="About_Link"]').click();
		cy.get('[data-testid="mini_switch"]').contains("Offers").click();

		// Click on first offer item (Hoodie)
		cy.get('[data-testid="items_offers"]').first().find("a").click();

		// Should navigate to product details route
		cy.url().should("include", "/about/offers/1/Hoodie");

		// Should display product details
		cy.get('[data-testid="product_detail_image"]').should("be.visible");
		cy.contains("Hoodie - 1").should("be.visible");

		// Should have back button that works
		cy.contains("Back").click();
		cy.url().should("include", "/about/offers");
	});

	// Test 10: 404 - Unknown routes show error page
	it("should display 404 error for unknown routes", () => {
		// Visit a non-existent route
		cy.visit(BASE_URL + "/unknown-page");

		// Should display error message
		cy.get(".error").should("be.visible");
		cy.contains("Route Not Found").should("be.visible");
	});
});
