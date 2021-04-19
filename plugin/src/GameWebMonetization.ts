/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       gammafp
 * @author       Dacio Romero (Web Monetization Event TypeScript Defs)
 * @copyright    2021 Photon Storm Ltd.
 */

import { EventEmitter } from 'eventemitter3';

interface BaseMonetizationEventDetail
{
    paymentPointer: string;
    requestId: string;
}
  
export interface MonetizationPendingEvent extends CustomEvent<BaseMonetizationEventDetail>
{
    type: 'monetizationpending';
}

export interface MonetizationStartEvent extends CustomEvent<BaseMonetizationEventDetail>
{
    type: 'monetizationstart';
}

interface MonetizationStopEventDetail extends BaseMonetizationEventDetail
{
    finalized: boolean;
}

export interface MonetizationStopEvent extends CustomEvent<MonetizationStopEventDetail>
{
    type: 'monetizationstop';
}

interface MonetizationProgressEventDetail extends BaseMonetizationEventDetail
{
    amount: string;
    assetCode: string;
    assetScale: number;
}

export interface MonetizationProgressEvent extends CustomEvent<MonetizationProgressEventDetail>
{
    type: 'monetizationprogress';
}

export interface MonetizationEventMap
{
    monetizationpending: MonetizationPendingEvent;
    monetizationstart: MonetizationStartEvent;
    monetizationstop: MonetizationStopEvent;
    monetizationprogress: MonetizationProgressEvent;
}

export type MonetizationEvent = MonetizationEventMap[keyof MonetizationEventMap];

export type MonetizationState = 'stopped' | 'pending' | 'started';

type EventListener<T, E extends Event = Event> = (this: T, evt: E) => any;

interface EventListenerObject<T, E extends Event = Event>
{
    handleEvent(this: T, evt: E): void;
}

type EventListenerOrListenerObject<T, E extends Event = Event> = | EventListener<T, E> | EventListenerObject<T, E>;

export interface Monetization extends EventTarget
{
    state: MonetizationState;

    addEventListener<K extends keyof MonetizationEventMap>(
        type: K,
        listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null,
        options?: boolean | AddEventListenerOptions
    ): void

    removeEventListener<K extends keyof MonetizationEventMap>(
        type: K,
        listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null,
        options?: boolean | EventListenerOptions
    ): void
}

declare global {
    interface Document {
        monetization?: Monetization
    }
}

interface PaymentConfig {
    paymentPointer: string;
    pointerName?: string;
    weight?: number;
}

/**
 * @example
 * new GameWebMonetization({paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii, pointerName: "Richard" // Optional});
 * @example
 * // if you want to divide your earnings you can use Probalistic Revenue Sharing.
 * // the weight is necesary to know how have more opportunity to be selected each time to game is started (this use Probalistic Revenue Sharing,
 * // more information {@link https://webmonetization.org/docs/probabilistic-rev-sharing|HERE}
 * new GameWebMonetization([
 *   {
 *       paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii,
 *       pointerName: "Bob", // Optional
 *       weight: 20
 *   },
 *   {
 *       paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii,
 *       pointerName: "Richard", // Optional
 *       weight: 80
 *   }
 * ]);
*/
export class GameWebMonetization extends EventEmitter {

    /**
     * ?
     * 
     * @type {string|undefined}
     * @memberof GameWebMonetization
     * @readonly
     */
    paymentPointer: string;

    /**
     * This member helps to know the name of paymentPointer if the user has been
     * passed it in configuration.
     * 
     * @type {string|undefined}
     * @memberof GameWebMonetization
     * @readonly
     */
    pointerName: string;

    /**
     * ?
     * 
     * @type {number}
     * @memberof GameWebMonetization
     */
    total: number = 0;

    /**
     * ?
     * 
     * @type {boolean}
     * @memberof GameWebMonetization
     */
    initializeEvents: boolean = true;

    /**
     * This member helps to know if the monetization is active or not.
     * 
     * @readonly
     * @type {boolean}
     * @memberof GameWebMonetization
     */
    isMonetized: boolean = false;

    /**
     * This member helps to know the actual state of webmonetization.
     * This state could be: "started" or "stopped" or "pending" or undefined.
     * 
     * @readonly
     * @type {string|undefined}
     * @memberof GameWebMonetization
     */
    state: string = undefined;

    /**
     * Creates an instance of GameWebMonetization.
     * 
     * @param {PaymentConfig | PaymentConfig[]} config - The Payment Configuration object, or an array of them.
     * @memberof GameWebMonetization
     */
    constructor (config: PaymentConfig | PaymentConfig[])
    {
        super();

        this.changePaymentPointer(config);
        this.setStatate();
    }

    /**
     * This method helps us to try to initialize the monetization.
     * 
     * @returns {this}
     * @memberof GameWebMonetization
     */
    start (): this
    {
        this.setEvents();
        this.setMeta();

        return this;
    }

    /**
     * Stop the monetization
     * 
     * @returns {this}
     * @memberof GameWebMonetization
     */
    stop (): this
    {
        this.removeMeta();

        return this;
    }

    /**
     * Sets payment or payments pointer by configuration.
     * To make efective the change you need use stop and start methods.
     *
     * @param {PaymentConfig | PaymentConfig[]} config - The Payment Configuration object, or an array of them.
     * @returns {this}
     * @memberof GameWebMonetization
     */
    changePaymentPointer (config: PaymentConfig | PaymentConfig[]): this
    {
        let paymentPointers: PaymentConfig[];

        if (!Array.isArray(config))
        {
            paymentPointers = [ { ...config, weight: 100 } ];
        }
        else
        {
            paymentPointers = config;
        }

        const paymentPointer = this.pickPointer(paymentPointers);

        if (paymentPointer !== undefined)
        {
            const pointerName = paymentPointers.find(pointer => {
                return pointer.paymentPointer === paymentPointer;
            }).pointerName;

            this.pointerName = pointerName;
        }

        this.setPaymentPointer(paymentPointer);

        return this;
    }

    /**
     * Handles the paymentPointer and set it in this.paymentPointer member
     *
     * @memberof GameWebMonetization
     * @private
     */
    setPaymentPointer (paymentPointer: string): void
    {
        if (paymentPointer === undefined || paymentPointer === null || paymentPointer.trim() === '')
        {
            console.error('Invalid paymentPointer, please check your configuration');
        }

        this.paymentPointer = paymentPointer;
    }

    /**
     * Help to select one paymentPointer from the configuration
     * 
     * @param {PaymentConfig[]} pointers - An array of Payment Configuration objects.
     * @returns {string}
     * @memberof GameWebMonetization
     * @private
     */
    pickPointer (pointers: PaymentConfig[]): string
    {
        const sum = Object.values(pointers).reduce((sum, pointers) => {
            const weight = pointers.weight;
            return sum + weight
        }, 0);

        let choice = Math.random() * sum;

        for (const pointer in pointers)
        {
            const weight = pointers[pointer].weight;

            if ((choice -= weight) <= 0)
            {
                return pointers[pointer].paymentPointer;
            }
        }
    }

    /**
     * Help to get the the total of amount and emit the progress event.
     *
     * @param {MonetizationProgressEvent} event - The 'monetizationprogress' event.
     * @memberof GameWebMonetization
     * @private
     */
    onProgress (event: MonetizationProgressEvent)
    {
        this.total += Number(event.detail.amount);

        const formatted = (this.total * Math.pow(10, -event.detail.assetScale)).toFixed(event.detail.assetScale);

        this.emit('progress', { ...event.detail, 'totalAmount': formatted });
    }

    /**
     * Help to initialized all events
     *
     * @memberof GameWebMonetization
     * @private
     */
    setEvents ()
    {
        if (this.state === 'stopped' && this.initializeEvents)
        {
            /**
             * The event is emitted when the monetization is started, with this event you can show or hiden some ads or give some powerup to player.
             * @event GameWebMonetization#start
             * @type {object}
             * @property {String} paymentPointer - Your payment account URL. The same value is used as the content in your <meta> tag.
             * @property {String} requestId - This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent (see Flow).
             * @example
             * // Receives
             * {
             *   paymentPointer: "$wallet.example.com/alice",
             *   requestId: ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce
             * }
             */
            document.monetization.addEventListener('monetizationstart', event =>
            {
                this.setStatate();
                this.isMonetized = true;
                this.emit('start', event.detail);
            });

            /**
             * The event is emitted while web monetization is preparing to start to monetize your site
             * @event GameWebMonetization#pending
             * @type {object}
             * @property {String} paymentPointer - Your payment account URL. The same value is used as the content in your <meta> tag.
             * @property {String} requestId - This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent (see Flow).
             * @example
             * // Receives
             * {
             *   paymentPointer: "$wallet.example.com/alice",
             *   requestId: ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce
             * }
             */
            document.monetization.addEventListener('monetizationpending', (event) => {
                this.emit('pending', event.detail);
            });

            /**
             * The event is emitted when the monetization is stopped
             * @event GameWebMonetization#stop
             * @type {object}
             * @property {String} paymentPointer - Your payment account URL. The same value is used as the content in your <meta> tag.
             * @property {String} requestId - This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent (see Flow).
             * @property {Boolean} finalized - When true, the monetization tag has been removed or the paymentPointer changed. No more events with this requestId expected.
             * @example
             * // Receives
             * {
             *   paymentPointer: "$wallet.example.com/alice",
             *   requestId: ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce,
             *   finalized: false
             * }
             */
            document.monetization.addEventListener('monetizationstop', (event) => {
                if (this.state !== 'stopped') {
                    this.setStatate();
                    this.isMonetized = false;
                    this.emit('stop', event.detail);
                }
            });

            /**
             * The event is emitted when the monetization is stopped
             * @event GameWebMonetization#progress
             * @type {object}
             * @property {String} paymentPointer - Your payment account URL. The same value is used as the content in your <meta> tag.
             * @property {String} requestId - This value is identical to the session ID/monetization ID (UUID v4) generated by the user agent (see Flow).
             * @property {String} amount - The destination amount received as specified in the Interledger protocol (ILP) packet.
             * @property {String} assetCode - The code (typically three characters) identifying the amount's unit. A unit, for example, could be a currency (USD, XRP).
             * @property {Number} assetScale - The number of places past the decimal for the amount. For example, if you have USD with an asset scale of two, then the minimum divisible unit is cents.
             * @property {String} receipt - base64-encoded STREAM receipt issued by the Web Monetization receiver to the Web Monetization provider as proof of the total amount received in the stream.
             * @property {Number} totalAmount - the sum of what has been received with the current paymentPointer, if the paymentPointer is changed this amount will be reset
             * @example
             * // Receives
             * {
             * paymentPointer: "$wallet.example.com/alice",
             * requestId: "ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce",
             * amount: "7567",
             * assetCode: "USD",
             * assetScale: 2,
             * receipt: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAPoAAAAAF5h2Mk=",
             * totalAmount: 0.000328153
             * }
             */
            document.monetization.addEventListener('monetizationprogress', this.onProgress.bind(this));

            this.initializeEvents = false;
        }
    }

    /**
     * Help to set the actual monetization state.
     * 
     * @memberof GameWebMonetization
     * @private
     */
    setStatate (): void
    {
        this.state = typeof document && document.monetization && document.monetization.state;
    }

    /**
     *
     * help to insert the metatag to monetized your content in the HTML header
     * 
     * @memberof GameWebMonetization
     * @private
     */
    setMeta (): void
    {
        const checkMeta = document.querySelector('meta[name="monetization"]');
        const monetizationTag = document.createElement('meta');

        monetizationTag.setAttribute('name', 'monetization');
        monetizationTag.setAttribute('content', this.paymentPointer);

        if (this.state !== undefined)
        {
            if (checkMeta)
            {
                checkMeta.remove();
            }

            document.head.appendChild(monetizationTag);
        }
    }

    /**
     * help to insert the metatag to monetized your content in the HTML header
     * 
     * @memberof GameWebMonetization
     * @private
     */
    removeMeta (): void
    {
        this.total = 0;

        const checkMeta = document.querySelector('meta[name="monetization"]');

        if (checkMeta)
        {
            checkMeta.remove();
        }
    }
}
