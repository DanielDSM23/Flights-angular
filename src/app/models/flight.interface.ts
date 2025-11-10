export interface FlightInterface {
    reference: string,
    status: string,
    segments: SegmentInterface[],
    total: TotalInterface
}

export interface FlightInfoInterface {
    number: string,
    from: string,
    to: string,
    depart: Date,
    arrive: Date
}

export interface SegmentInterface {
    flight: FlightInfoInterface
}

export interface TotalInterface {
    amount: number,
    currency: string
}