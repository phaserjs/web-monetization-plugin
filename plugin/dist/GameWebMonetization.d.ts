import { EventEmitter } from 'eventemitter3';
interface BaseMonetizationEventDetail {
    paymentPointer: string;
    requestId: string;
}
export interface MonetizationPendingEvent extends CustomEvent<BaseMonetizationEventDetail> {
    type: 'monetizationpending';
}
export interface MonetizationStartEvent extends CustomEvent<BaseMonetizationEventDetail> {
    type: 'monetizationstart';
}
interface MonetizationStopEventDetail extends BaseMonetizationEventDetail {
    finalized: boolean;
}
export interface MonetizationStopEvent extends CustomEvent<MonetizationStopEventDetail> {
    type: 'monetizationstop';
}
interface MonetizationProgressEventDetail extends BaseMonetizationEventDetail {
    amount: string;
    assetCode: string;
    assetScale: number;
}
export interface MonetizationProgressEvent extends CustomEvent<MonetizationProgressEventDetail> {
    type: 'monetizationprogress';
}
export interface MonetizationEventMap {
    monetizationpending: MonetizationPendingEvent;
    monetizationstart: MonetizationStartEvent;
    monetizationstop: MonetizationStopEvent;
    monetizationprogress: MonetizationProgressEvent;
}
export declare type MonetizationEvent = MonetizationEventMap[keyof MonetizationEventMap];
export declare type MonetizationState = 'stopped' | 'pending' | 'started';
declare type EventListener<T, E extends Event = Event> = (this: T, evt: E) => any;
interface EventListenerObject<T, E extends Event = Event> {
    handleEvent(this: T, evt: E): void;
}
declare type EventListenerOrListenerObject<T, E extends Event = Event> = EventListener<T, E> | EventListenerObject<T, E>;
export interface Monetization extends EventTarget {
    state: MonetizationState;
    addEventListener<K extends keyof MonetizationEventMap>(type: K, listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MonetizationEventMap>(type: K, listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface Document {
        monetization?: Monetization;
    }
}
interface PaymentConfig {
    paymentPointer: string;
    pointerName?: string;
    weight?: number;
}
export declare class GameWebMonetization extends EventEmitter {
    paymentPointer: string;
    pointerName: string;
    total: number;
    initializeEvents: boolean;
    isMonetized: boolean;
    state: string;
    constructor(config: PaymentConfig | PaymentConfig[]);
    start(): this;
    stop(): this;
    changePaymentPointer(config: PaymentConfig | PaymentConfig[]): this;
    setPaymentPointer(paymentPointer: string): void;
    pickPointer(pointers: PaymentConfig[]): string;
    onProgress(event: MonetizationProgressEvent): void;
    setEvents(): void;
    setStatate(): void;
    setMeta(): void;
    removeMeta(): void;
}
export {};
//# sourceMappingURL=GameWebMonetization.d.ts.map