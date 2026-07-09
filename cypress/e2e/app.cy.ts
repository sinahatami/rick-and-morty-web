describe('Rick and Morty Web App', () => {
  beforeEach(() => {
    // Navigate to the base URL (http://localhost:3000)
    cy.visit('/');
  });

  it('successfully loads the home page', () => {
    // Assert the main title or navigation is present
    cy.contains('Characters').should('be.visible');
  });

  it('can navigate between tabs', () => {
    // Click on the Locations tab
    cy.contains('Locations').click();

    // Assert the URL changed and the locations heading/content is visible
    cy.url().should('include', '/locations');
    cy.contains('Locations').should('be.visible');

    // Click on the Episodes tab
    cy.contains('Episodes').click();
    cy.url().should('include', '/episodes');
    cy.contains('Episodes').should('be.visible');
  });

  it('can type into the search bar and see results', () => {
    // Make sure we are on Characters
    cy.contains('Characters').click();

    // Find the search input, type "Rick"
    cy.get('input[type="text"][placeholder*="Filter by name"]').type('Rick');

    // Wait for debounce and loading
    cy.wait(1000); // Usually you'd intercept the API request and wait for it instead

    // Assert that the results contain "Rick"
    cy.contains('Rick Sanchez').should('be.visible');
  });
});
