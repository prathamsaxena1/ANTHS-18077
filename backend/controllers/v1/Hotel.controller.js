async function bookHotelForUser() {
    try {
      const booking = await bookHotelListing(
        '60d21b4667d0d8992e610c85',  // Hotel ID
        'user@example.com',          // User email
        {
          checkInDate: '2025-06-20',
          checkOutDate: '2025-06-25',
          guests: {
            adults: 2, 
            children: 1
          },
          totalPrice: 500
        }
      );
      console.log('Booking confirmed:', booking);
    } catch (error) {
      console.error('Booking failed:', error.message);
    }
  }