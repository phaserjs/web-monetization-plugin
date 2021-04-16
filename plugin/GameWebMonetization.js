import { EventEmitter } from 'eventemitter3';

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
     * Creates an instance of GameWebMonetization.
     * 
     * @param {GameWebMonetization.Types.Config} config - GameWebMonetization.Types.Config config:<br>
     * {paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii, pointerName: "Bob", // Optional}
     * <br>
     * or
     * <br>
     * [<br>
     * &nbsp;&nbsp;{<br>
     * &nbsp;&nbsp;&nbsp;&nbsp; paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii, <br>
     * &nbsp;&nbsp;&nbsp;&nbsp; pointerName: "Bob", // Optional <br> 
     * &nbsp;&nbsp;&nbsp;&nbsp; weight: 20 <br>
     *&nbsp;&nbsp;}, <br>
     * &nbsp;&nbsp;{ <br>
     * &nbsp;&nbsp;&nbsp;&nbsp; paymentPointer: $ilp.uphold.com/zdXzL8aWJ4ii, <br>
     * &nbsp;&nbsp;&nbsp;&nbsp; pointerName: "Richard", // Optional <br>
     * &nbsp;&nbsp;&nbsp;&nbsp; weight: 80 <br>
     * &nbsp;&nbsp;} <br>
     * ]
     * @type GameWebMonetization.Config
     */
    constructor(options) {
        super();
        
        /**
         * This member helps to know the name of paymentPointer if the user has been passed it in configuration.
         * @name GameWebMonetization#pointerName
         * @readonly
         * @default undefined
         * @type {String|undefined}
        */
        this.pointerName = undefined;
        this.total = 0;
        this.initialize_events = true;



        /**
         * This member helps to know if the monetization is active or not.
         * @name GameWebMonetization#pointerName
         * @readonly
         * @default false
         * @type {Boolean}
        */
        this.isMonetized = false;

        this.changePaymentPointer(options);
        this.setStatate();
    }

    /**
     * This method helps us to try to initialize the monetization
     * @method GameWebMonetization#start
     * @public
     */
    start() {
        this.setEvents();
        this.setMeta();
    }

    /**
     * Stop the monetization
     * @method GameWebMonetization#stop
     * @public
     */
    stop() {
        this.removeMeta();
    }

    /**
     * Sets payment or payments pointer by configuration - to make efective the change you need use stop and start methods
     *
     * @method GameWebMonetization#ChangePaymentPointer
     * @param {Object} config - Config description
    */
    changePaymentPointer(options) {
        const paymentPointers = (Array.isArray(options)) ? options : [{ ...options, weight: 100 }];
        const paymentPointer = this.pickPointer(paymentPointers);

        if (paymentPointer !== undefined) {
            const pointerName = paymentPointers.find((pointer) => {
                return pointer.paymentPointer === paymentPointer;
            }).pointerName;
            this.pointerName = pointerName;
        }

        this.setPaymentPointer(paymentPointer);
    }

    /**
     * Handles the paymentPointer and set it in this.paymentPointer member
     *
     * @method GameWebMonetization#setPaymentPointer
     * @private
     */
    setPaymentPointer(paymentPointer) {
        if (paymentPointer === undefined || paymentPointer === null || paymentPointer.trim() === '') {
            console.error('You need some paymentPointer, please check your configuration');
        }

        // set paymentPointer
        this.paymentPointer = paymentPointer;
    }

    /**
     * 
     * Help to select one paymentPointer from the configuration
     * @method GameWebMonetization#pickPointer
     * @param {Object[]} pointers - receives an array of objects with the paymentPointer configuration
     * @returns {String} string
     * @private
     */
    pickPointer(pointers = []) {
        const sum = Object.values(pointers).reduce((sum, pointers) => {
            const weight = pointers.weight;
            return sum + weight
        }, 0);

        let choice = Math.random() * sum

        for (const pointer in pointers) {
            const weight = pointers[pointer].weight;
            if ((choice -= weight) <= 0) {
                return pointers[pointer].paymentPointer;
            }
        }
    }

    /**
     * Help to get the the total of amount and emit the progress event
     *
     * @method GameWebMonetization#onProgress
     * @private
     */
    onProgress(event) {
        this.total += Number(event.detail.amount);
        const formatted = (this.total * Math.pow(10, -event.detail.assetScale)).toFixed(event.detail.assetScale);
        this.emit('progress', { ...event.detail, 'totalAmount': formatted });
    }

    /**
     * Help to initialized all events
     *
     * @method GameWebMonetization#setEvents
     * @private
     */
    setEvents() {
        if (this.state === 'stopped' && this.initialize_events) {

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
            document.monetization.addEventListener('monetizationstart', (event) => {
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

            this.initialize_events = false;
        }
    }

    /**
     *
     * help to set the actual monetization state
     * @method GameWebMonetization#setStatate
     * @private
    */
    setStatate() {
        /**
         * This member helps to know the actual state of webmonetization, this state could be: "started" or "stopped" or "pending" or undefined
         * @name GameWebMonetization#state
         * @readonly
         * @default undefined
         * @type {String|undefined}
        */
        this.state = typeof document && document.monetization && document.monetization.state;
    }

    /**
     *
     * help to insert the metatag to monetized your content in the HTML header
     * 
     * @method GameWebMonetization#setMeta
     * @private
     */
    setMeta() {
        const checkMeta = document.querySelector('meta[name="monetization"]');
        const monetizationTag = document.createElement('meta');
        monetizationTag.setAttribute('name', 'monetization');
        monetizationTag.setAttribute('content', this.paymentPointer);

        if (this.state !== undefined) {
            if (checkMeta) {
                checkMeta.remove();
            }
            document.head.appendChild(monetizationTag);
        }
    }

    /**
     *
     * help to insert the metatag to monetized your content in the HTML header
     * 
     * @method GameWebMonetization#setMeta
     * @private
    */
    removeMeta() {
        this.total = 0;
        const checkMeta = document.querySelector('meta[name="monetization"]');
        if (checkMeta) {
            checkMeta.remove();
        }
    }
}

// export default GameWebMonetization;