export interface ReservationInterface {
    bookingId: string,
    status: string,
    passengerName: string,
    flightNumber: string,
    departureAirport: string,
    arrivalAirport: string,
    departureTime: Date,
    arrivalTime: Date,
    price: number,
    currency: string
}
