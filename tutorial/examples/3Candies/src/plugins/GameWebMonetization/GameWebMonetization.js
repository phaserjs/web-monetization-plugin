var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  "use strict";
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events();
    else
      delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix;
  EventEmitter2.EventEmitter = EventEmitter2;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter2;
  }
});

// src/GameWebMonetization.ts
var import_eventemitter3 = __toModule(require_eventemitter3());
var _GameWebMonetization = class extends import_eventemitter3.EventEmitter {
  constructor(config) {
    super();
    this.total = 0;
    this.isMonetized = false;
    this.onStart = (event) => {
      this.setState();
      this.isMonetized = true;
      this.emit(_GameWebMonetization.START, event.detail);
    };
    this.onPending = (event) => {
      this.setState();
      this.emit(_GameWebMonetization.PENDING, event.detail);
    };
    this.onProgress = (event) => {
      this.total += Number(event.detail.amount);
      const formatted = (this.total * Math.pow(10, -event.detail.assetScale)).toFixed(event.detail.assetScale);
      this.emit(_GameWebMonetization.PROGRESS, __objSpread(__objSpread({}, event.detail), {totalAmount: formatted}));
    };
    this.onStop = (event) => {
      if (this.state !== "stopped") {
        this.setState();
        this.isMonetized = false;
        this.emit(_GameWebMonetization.STOP, event.detail);
      }
    };
    this.changePaymentPointer(config);
    this.setState();
  }
  start() {
    if (document && document.monetization) {
      this.addEvents();
      this.addMeta();
    }
    return this;
  }
  stop() {
    if (document && document.monetization) {
      this.removeEvents();
      this.removeMeta();
    }
    return this;
  }
  restart() {
    this.stop();
    this.start();
    return this;
  }
  changePaymentPointer(config) {
    let paymentPointers;
    if (!Array.isArray(config)) {
      paymentPointers = [__objSpread(__objSpread({}, config), {weight: 100})];
    } else {
      paymentPointers = config;
    }
    const paymentPointer = this.pickPointer(paymentPointers);
    if (paymentPointer !== void 0) {
      const pointerName = paymentPointers.find((pointer) => {
        return pointer.paymentPointer === paymentPointer;
      }).pointerName;
      this.pointerName = pointerName;
    }
    this.setPaymentPointer(paymentPointer);
    return this;
  }
  setPaymentPointer(paymentPointer) {
    if (paymentPointer === void 0 || paymentPointer === null || paymentPointer.trim() === "") {
      console.error("Invalid paymentPointer, please check your configuration");
    }
    this.paymentPointer = paymentPointer;
  }
  pickPointer(pointers) {
    const sum = Object.values(pointers).reduce((sum2, pointers2) => {
      const weight = pointers2.weight;
      return sum2 + weight;
    }, 0);
    let choice = Math.random() * sum;
    for (const pointer in pointers) {
      const weight = pointers[pointer].weight;
      if ((choice -= weight) <= 0) {
        return pointers[pointer].paymentPointer;
      }
    }
  }
  addEvents() {
    document.monetization.addEventListener("monetizationstart", this.onStart, false);
    document.monetization.addEventListener("monetizationpending", this.onPending, false);
    document.monetization.addEventListener("monetizationstop", this.onStop, false);
    document.monetization.addEventListener("monetizationprogress", this.onProgress, false);
  }
  removeEvents() {
    document.monetization.removeEventListener("monetizationstart", this.onStart, false);
    document.monetization.removeEventListener("monetizationpending", this.onPending, false);
    document.monetization.removeEventListener("monetizationstop", this.onStop, false);
    document.monetization.removeEventListener("monetizationprogress", this.onProgress, false);
  }
  setState() {
    if (document && document.monetization) {
      this.state = document.monetization.state;
    }
  }
  addMeta() {
    const checkMeta = document.querySelector('meta[name="monetization"]');
    const monetizationTag = document.createElement("meta");
    monetizationTag.setAttribute("name", "monetization");
    monetizationTag.setAttribute("content", this.paymentPointer);
    if (this.state !== void 0) {
      if (checkMeta) {
        checkMeta.remove();
      }
      document.head.appendChild(monetizationTag);
    }
  }
  removeMeta() {
    this.total = 0;
    const checkMeta = document.querySelector('meta[name="monetization"]');
    if (checkMeta) {
      checkMeta.remove();
    }
  }
};
var GameWebMonetization = _GameWebMonetization;
GameWebMonetization.START = "start";
GameWebMonetization.PENDING = "pending";
GameWebMonetization.STOP = "stop";
GameWebMonetization.PROGRESS = "progress";
export {
  GameWebMonetization
};
