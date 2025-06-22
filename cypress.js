// Cypress test example for booking flow
describe('Hotel Booking Process', () => {
    before(() => {
        // Login as guest user
        cy.visit('/login');
        cy.get('#email').type('guest@example.com');
        cy.get('#password').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should successfully complete a hotel booking', () => {
        // Go to hotel listings
        cy.visit('/hotels');

        // Select first hotel
        cy.get('.hotel-card').first().click();
        cy.url().should('include', '/hotels/');

        // Check availability for next week
        const today = new Date();
        const checkIn = new Date(today);
        checkIn.setDate(today.getDate() + 7);
        const checkOut = new Date(today);
        checkOut.setDate(today.getDate() + 10);

        // Format dates as expected by your datepicker
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };

        cy.get('#check-in-date').type(formatDate(checkIn));
        cy.get('#check-out-date').type(formatDate(checkOut));
        cy.get('#check-availability-btn').click();

        // Verify availability and proceed to booking
        cy.get('.availability-status').should('contain', 'Available');
        cy.get('#book-now-btn').click();

        // Fill booking details if needed
        cy.get('#num-guests').select('2');
        cy.get('#special-requests').type('No special requests');
        cy.get('#proceed-to-payment-btn').click();

        // Complete payment with test card
        cy.get('.stripe-element').within(() => {
            cy.fillStripeElements({
                cardNumber: '4242424242424242',
                cardExpiry: '12/25',
                cardCvc: '123',
            });
        });

        cy.get('#submit-payment-btn').click();

        // Verify booking confirmation
        cy.url().should('include', '/booking/confirmation');
        cy.get('.booking-confirmation').should('be.visible');
        cy.get('.booking-reference').should('exist');

        // Verify booking appears in user's bookings
        cy.visit('/dashboard/bookings');
        cy.get('.booking-item').should('have.length.at.least', 1);
        cy.get('.booking-item').first().should('contain', formatDate(checkIn));
    });
});

// Cypress test example for hotel owner dashboard
describe('Hotel Owner Dashboard', () => {
    before(() => {
        // Login as hotel owner
        cy.visit('/login');
        cy.get('#email').type('owner@example.com');
        cy.get('#password').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should create a new hotel listing', () => {
        cy.visit('/dashboard/hotels/create');

        // Fill hotel details
        cy.get('#hotel-name').type('Test Hotel');
        cy.get('#description').type('This is a test hotel created for automated testing. It has all the amenities a modern traveler needs.');

        // Address information
        cy.get('#street').type('123 Test Street');
        cy.get('#city').type('Test City');
        cy.get('#state').type('Test State');
        cy.get('#zipCode').type('12345');
        cy.get('#country').select('United States');

        // Price range
        cy.get('#min-price').type('99');
        cy.get('#max-price').type('299');

        // Select amenities
        cy.get('#amenities').within(() => {
            cy.get('input[value="wifi"]').check();
            cy.get('input[value="parking"]').check();
            cy.get('input[value="pool"]').check();
        });

        // Upload test image
        cy.get('#hotel-images').attachFile('test-hotel.jpg');

        // Submit form
        cy.get('#create-hotel-btn').click();

        // Verify successful creation
        cy.url().should('include', '/dashboard/hotels');
        cy.get('.notification').should('contain', 'Hotel created successfully');

        // Verify hotel appears in listings
        cy.get('.hotel-item').should('contain', 'Test Hotel');
    });

    it('should manage bookings for owned hotels', () => {
        cy.visit('/dashboard/bookings');

        // Check if bookings exist
        cy.get('.booking-status-filter').select('All');

        // Accept a pending booking if any exists
        cy.get('.booking-item.pending').first().within(() => {
            cy.get('.approve-booking-btn').click();
        });

        // Verify booking status changed
        cy.get('.notification').should('contain', 'Booking confirmed');
    });
});