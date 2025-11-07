import { SegmentInterface } from "./segment.interface";
import { TotalInterface } from "./total.interface";

export interface FlightInterface {
    reference: string,
    status: string,
    segments: SegmentInterface,
    total: TotalInterface
}
