class Facility {
  constructor(name, rates) {
    this.name = name;
    this.rates = rates;
    this.bookings = {};
  }

  getBookingCost(startTime, endTime) {
    let cost = 0;
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);

    for (let hour = start; hour < end; hour++) {
      if (this.rates[hour]) {
        cost += this.rates[hour];
      }
    }
    return cost;
  }

  isAvailable(date, startTime, endTime) {
    if (!this.bookings[date]) {
      return true;
    }

    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);

    for (let hour = start; hour < end; hour++) {
      if (this.bookings[date][hour]) {
        return false;
      }
    }
    return true;
  }

  book(date, startTime, endTime) {
    if (!this.isAvailable(date, startTime, endTime)) {
      return `Booking Failed, Already Booked`;
    }

    if (!this.bookings[date]) {
      this.bookings[date] = {};
    }

    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);

    for (let hour = start; hour < end; hour++) {
      this.bookings[date][hour] = true;
    }

    const cost = this.getBookingCost(startTime, endTime);
    return `Booked, Rs. ${cost}, Facility: ${this.name}, Date: ${date}, Time: ${startTime} - ${endTime}`;
  }
}

const clubhouseRates = {
  10: 100, 11: 100, 12: 100, 13: 100, 14: 100, 15: 100,
  16: 500, 17: 500, 18: 500, 19: 500, 20: 500, 21: 500
};

const tennisCourtRates = {
  0: 50, 1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 50, 8: 50, 9: 50, 10: 50,
  11: 50, 12: 50, 13: 50, 14: 50, 15: 50, 16: 50, 17: 50, 18: 50, 19: 50, 20: 50,
  21: 50, 22: 50, 23: 50
};

const clubhouse = new Facility('Clubhouse', clubhouseRates);
const tennisCourt = new Facility('Tennis Court', tennisCourtRates);

function bookFacility(facility, date, timeRange) {
  const [startTime, endTime] = timeRange.split(" - ");
  return facility.book(date, startTime, endTime);
}

export { Facility, clubhouse, tennisCourt, bookFacility };
