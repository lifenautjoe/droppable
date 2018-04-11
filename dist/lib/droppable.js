"use strict";
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
var Droppable = /** @class */ (function () {
    function Droppable(config) {
        this.dragOverClass = 'dragover';
        this.onFilesDroppedEventListeners = [];
        config = config || {};
        if (!config.element) {
            throw new Error('config.element: HTMLElement is required');
        }
        // This must be called before calling setAcceptsMultipleFiles
        this.virtualInputElement = Droppable.makeVirtualInputElement();
        var isClickable = typeof config.isClickable === 'boolean' ? config.isClickable : true;
        var acceptsMultipleFiles = typeof config.acceptsMultipleFiles === 'boolean' ? config.acceptsMultipleFiles : true;
        var appendStatusClasses = typeof config.appendStatusClasses === 'boolean' ? config.appendStatusClasses : true;
        this.setIsClickable(isClickable);
        this.setAcceptsMultipleFiles(acceptsMultipleFiles);
        this.setAppendStatusClasses(appendStatusClasses);
        this.element = config.element;
        this.elementEventsRemover = this.registerElementEvents();
        Droppable.addAccessibilityAttributesToDroppableElement(this.element);
        this.virtualInputElementEventsRemover = this.registerVirtualInputElementEvents();
    }
    Droppable.makeVirtualInputElement = function () {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.style.display = 'none';
        return input;
    };
    Droppable.addAccessibilityAttributesToDroppableElement = function (element) {
        element.tabIndex = 0;
        element.role = 'button';
    };
    Droppable.removeAccessibilityAttributesToDroppableElement = function (element) {
        delete element.role;
        element.removeAttribute('tabIndex');
    };
    Droppable.prototype.onFilesDropped = function (listener) {
        var _this = this;
        this.onFilesDroppedEventListeners.push(listener);
        return function () {
            var listenerIndex = _this.onFilesDroppedEventListeners.indexOf(listener);
            _this.onFilesDroppedEventListeners.splice(listenerIndex, 1);
        };
    };
    Droppable.prototype.destroy = function () {
        this.elementEventsRemover();
        this.virtualInputElementEventsRemover();
        this.onFilesDroppedEventListeners = [];
        Droppable.removeAccessibilityAttributesToDroppableElement(this.element);
    };
    Droppable.prototype.getLatestDroppedFiles = function () {
        if (this.latestDroppedFiles) {
            return this.latestDroppedFiles;
        }
        return [];
    };
    Droppable.prototype.promptForFiles = function () {
        this.virtualInputElement.click();
    };
    Droppable.prototype.setIsClickable = function (clickable) {
        this.isClickable = clickable;
    };
    Droppable.prototype.setAcceptsMultipleFiles = function (acceptsMultipleFiles) {
        this.virtualInputElement.setAttribute('multiple', acceptsMultipleFiles.toString());
    };
    Droppable.prototype.setAppendStatusClasses = function (appendStatusClasses) {
        this.appendStatusClasses = appendStatusClasses;
    };
    Droppable.prototype.registerElementEvents = function () {
        var eventNameToEventListenerDictionary = this.getElementEventsDictionary();
        return this.registerElementEventsWithDictionary(this.element, eventNameToEventListenerDictionary);
    };
    Droppable.prototype.registerVirtualInputElementEvents = function () {
        var eventNameToEventListenerDictionary = this.getVirtualInputElementEventsDictionary();
        return this.registerElementEventsWithDictionary(this.virtualInputElement, eventNameToEventListenerDictionary);
    };
    Droppable.prototype.getVirtualInputElementEventsDictionary = function () {
        return {
            change: this.onVirtualInputElementChange
        };
    };
    Droppable.prototype.getElementEventsDictionary = function () {
        return {
            dragover: this.onElementDragOver,
            dragleave: this.onElementDragLeave,
            drop: this.onElementDrop,
            click: this.onElementClick,
            focus: this.onElementFocus,
            focusout: this.onElementFocusOut
        };
    };
    Droppable.prototype.onElementDragOver = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.add(this.dragOverClass);
    };
    Droppable.prototype.onElementDragLeave = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.remove(this.dragOverClass);
    };
    Droppable.prototype.onElementDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.remove(this.dragOverClass);
        this.onDroppableElementChange(e);
    };
    Droppable.prototype.onElementClick = function () {
        if (this.isClickable)
            this.promptForFiles();
    };
    Droppable.prototype.onElementKeyDown = function (e) {
        if (e['keyCode'] === Droppable.ENTER_KEY_CODE) {
            this.promptForFiles();
            this.element.blur();
        }
    };
    Droppable.prototype.onElementFocus = function () {
        this.elementKeyDownEventRemover = this.registerElementEventsWithDictionary(this.element, {
            keydown: this.onElementKeyDown
        });
    };
    Droppable.prototype.onElementFocusOut = function () {
        if (this.elementKeyDownEventRemover)
            this.elementKeyDownEventRemover();
    };
    Droppable.prototype.onVirtualInputElementChange = function (e) {
        this.onDroppableElementChange(e);
        this.virtualInputElement.value = '';
    };
    Droppable.prototype.onDroppableElementChange = function (event) {
        var files;
        if (event['dataTransfer']) {
            files = event['dataTransfer'].files;
        }
        else if (event['target']) {
            files = event['target'].files;
        }
        else {
            throw Error('Fired event contains no files');
        }
        // Files is FileList, we convert to array
        var filesArray = Array.from(files);
        this.setLatestDrop(filesArray);
    };
    Droppable.prototype.setLatestDrop = function (files) {
        this.latestDroppedFiles = files;
        this.emitFilesWereDropped(files);
    };
    Droppable.prototype.emitFilesWereDropped = function (files) {
        this.onFilesDroppedEventListeners.forEach(function (listener) {
            listener(files);
        });
    };
    Droppable.prototype.registerElementEventsWithDictionary = function (element, eventNameToEventListenerDictionary) {
        var _this = this;
        var eventRemovers = [];
        Object.keys(eventNameToEventListenerDictionary).forEach(function (eventName) {
            var eventListener = eventNameToEventListenerDictionary[eventName];
            var boundEventListener = eventListener.bind(_this);
            element.addEventListener(eventName, boundEventListener);
            eventRemovers.push(function () { return element.removeEventListener(eventName, boundEventListener); });
        });
        return function () { return eventRemovers.forEach(function (eventRemover) { return eventRemover(); }); };
    };
    Droppable.ENTER_KEY_CODE = 13;
    return Droppable;
}());
exports.default = Droppable;
//# sourceMappingURL=droppable.js.map