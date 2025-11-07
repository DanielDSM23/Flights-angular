export interface AirportInterface {
    id: string,
    attributes: AttributeInterface
}

export interface AttributeInterface {
    name: string,
    code: string,
    lattitude: number,
    longitude: number,
    elevation : number,
    gps_code: string,
    icao_code: string,
    iata_code: string,
    local_code: string
}

export interface LinksInterface {
    self: SelfInterface
}

export interface SelfInterface {
    href: string
}
