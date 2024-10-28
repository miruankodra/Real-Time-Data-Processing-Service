export interface TickerDTO {
    e: string;           // Event type
    E: number;           // Event time
    s: string;           // Symbol
    p: string;           // Price change
    P: string;           // Price change percentage
    w: string;           // Weighted average price
    x: string;           // Previous day's close price
    c: string;           // Current day's close price
    Q: string;           // Last quantity
    b: string;           // Best bid price
    B: string;           // Best bid quantity
    a: string;           // Best ask price
    A: string;           // Best ask quantity
    o: string;           // Open price
    h: string;           // High price
    l: string;           // Low price
    v: string;           // Total traded base asset volume
    q: string;           // Total traded quote asset volume
    O: number;           // Open time
    C: number;           // Close time
    F: number;           // First trade ID
    L: number;           // Last trade ID
    n: number;           // Total number of trades
};