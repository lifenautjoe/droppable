// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...}

import Noel from 'noel';
import { NoelEvent } from 'noel/dist/types/event';
import { NoelConfig } from 'noel/dist/types/interfaces';
import { NoelEventListener } from 'noel/dist/types/types';
import { NoelEventListenerManager } from 'noel/dist/types/event-listener-manager';

/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */

export default class Droppable {
    private appendStatusClasses: boolean;
    private isClickable: boolean;

    private filesWereDroppedEvent: NoelEvent;
    private element: HTMLElement;

    private elementEventsRemover: Function;

    private virtualInputElement: HTMLInputElement;
    private virtualInputElementEventsRemover: Function;

    private latestDroppedFiles: File[] = [];

    private eventEmitter: Noel;

    constructor(config: DroppableSettings) {
        config = config || {};

        if (!config.element) {
            throw new Error('config.element: HTMLElement is required');
        }

        this.setIsClickeable(config.isClickable || true);
        this.setAcceptsMultipleFiles(config.acceptsMultipleFiles || true);
        this.setAppendStatusClasses(config.acceptsMultipleFiles || true);

        this.eventEmitter = new Noel(
            config.eventConfig || {
                replay: true,
                replayBufferSize: 1
            }
        );

        this.filesWereDroppedEvent = this.eventEmitter.getEvent('drop');

        this.element = config.element;
        this.elementEventsRemover = this.registerElementEvents();

        this.virtualInputElement = Droppable.makeVirtualInputElement();

        this.virtualInputElementEventsRemover = this.registerVritualInputElementEvents();
    }

    private static makeVirtualInputElement() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.style.display = 'none';
        return input;
    }

    onFilesDropped(listener: NoelEventListener): NoelEventListenerManager {
        return this.filesWereDroppedEvent.on(listener);
    }

    cleanUp() {
        this.elementEventsRemover();
        this.virtualInputElementEventsRemover();
    }

    getLatestDroppedFiles(): File[] {
        return this.latestDroppedFiles || [];
    }

    promptForFiles(): void {
        this.virtualInputElement.click();
    }

    setIsClickeable(clickeable: boolean) {
        this.isClickable = clickeable;
    }

    setAcceptsMultipleFiles(acceptsMultipleFiles: boolean) {
        this.virtualInputElement.setAttribute('multiple', acceptsMultipleFiles.toString());
    }

    setAppendStatusClasses(appendStatusClasses: boolean) {
        this.appendStatusClasses = appendStatusClasses;
    }

    private registerElementEvents(): Function {
        const eventNameToEventListenerDictionary = this.getElementEventNameToEventListenerDictionary();
        return this.registerElementEventsWithEventNameToEventListenerDictionary(this.element, eventNameToEventListenerDictionary);
    }

    private registerVritualInputElementEvents(): Function {
        const eventNameToEventListenerDictionary = this.getVirtualInputElementEventNameToEventListenerDictionary();
        return this.registerElementEventsWithEventNameToEventListenerDictionary(this.virtualInputElement, eventNameToEventListenerDictionary);
    }

    private getVirtualInputElementEventNameToEventListenerDictionary() {
        return {
            change: this.onVirtualInputElementChange
        };
    }

    private getElementEventNameToEventListenerDictionary() {
        return {
            dragover: this.onElementDragover,
            dragleave: this.onElementDragLeave,
            drop: this.onElementDrop,
            click: this.onElementClick
        };
    }

    private onElementDragover(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.add('dragover');
    }

    private onElementDragLeave(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.remove('dragover');
    }

    private onElementDrop(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.remove('dragover');
        this.onDroppableElementChange(e);
    }

    private onElementClick() {
        if (this.isClickable) this.promptForFiles();
    }

    private onVirtualInputElementChange(e: Event) {
        this.onDroppableElementChange(e);
    }

    private onDroppableElementChange(event: { [key: string]: any }) {
        let files;
        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;
        }

        // Files is FileList, we convert to array
        const filesArray: File[] = Array.from(files);
        this.setLatestDrop(filesArray);
    }

    private setLatestDrop(files: Array<File>) {
        this.latestDroppedFiles = files;
        this.emitFilesWereDropped(files);
    }

    private emitFilesWereDropped(files: Array<File>) {
        this.filesWereDroppedEvent.emit(files);
    }

    private registerElementEventsWithEventNameToEventListenerDictionary(element: HTMLElement, eventNameToEventListenerDictionary: { [key: string]: EventListener }): Function {
        const eventRemovers: Array<Function> = [];

        Object.keys(eventNameToEventListenerDictionary).forEach(eventName => {
            const eventListener = eventNameToEventListenerDictionary[eventName];
            element.addEventListener(eventName, eventListener.bind(this));
            eventRemovers.push(() => element.removeEventListener(eventName, eventListener));
        });

        return () => eventRemovers.forEach(eventRemover => eventRemover());
    }
}

export interface DroppableSettings {
    element: HTMLElement;
    appendStatusClasses?: boolean;
    acceptsMultipleFiles?: boolean;
    isClickable?: boolean;
    eventConfig?: NoelConfig;
}
