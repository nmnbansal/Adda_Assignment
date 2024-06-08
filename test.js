import { expect } from 'chai';
import { clubhouse, tennisCourt, bookFacility } from './facilityBooking.js';

function logPassPoints(points) {
  console.log(`Pass, ${points} points`);
}

describe('Facility Booking System', () => {
  it('should book the clubhouse from 16:00 to 22:00', () => {
    const result = bookFacility(clubhouse, "26-10-2020", "16:00 - 22:00");
    expect(result).to.equal("Booked, Rs. 3000, Facility: Clubhouse, Date: 26-10-2020, Time: 16:00 - 22:00");
    logPassPoints(2);
  });

  it('should book the tennis court from 16:00 to 20:00', () => {
    const result = bookFacility(tennisCourt, "26-10-2020", "16:00 - 20:00");
    expect(result).to.equal("Booked, Rs. 200, Facility: Tennis Court, Date: 26-10-2020, Time: 16:00 - 20:00");
    logPassPoints(2); 
  });

  it('should fail to book the clubhouse again from 16:00 to 22:00', () => {
    bookFacility(clubhouse, "26-10-2020", "16:00 - 22:00");
    const result = bookFacility(clubhouse, "26-10-2020", "16:00 - 22:00");
    expect(result).to.equal("Booking Failed, Already Booked");
    logPassPoints(2); 
  });

  it('should fail to book the tennis court again from 17:00 to 21:00', () => {
    bookFacility(tennisCourt, "26-10-2020", "16:00 - 20:00");
    const result = bookFacility(tennisCourt, "26-10-2020", "17:00 - 21:00");
    expect(result).to.equal("Booking Failed, Already Booked");
    logPassPoints(2); 
  });
});

beforeEach(() => {
  clubhouse.bookings = {};
  tennisCourt.bookings = {};
});
