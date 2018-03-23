/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
export default class Droppable {
    private dragOverClass;
    private appendStatusClasses;
    private isClickable;
    private element;
    private elementEventsRemover;
    private virtualInputElement;
    private virtualInputElementEventsRemover;
    private latestDroppedFiles;
    private onFilesDroppedEventListeners;
    constructor(config: DroppableSettings);
    private static makeVirtualInputElement();
    onFilesDropped(listener: FilesWereDroppedEventListener): EventRemover;
    cleanUp(): void;
    getLatestDroppedFiles(): File[];
    promptForFiles(): void;
    setIsClickable(clickable: boolean): void;
    setAcceptsMultipleFiles(acceptsMultipleFiles: boolean): void;
    setAppendStatusClasses(appendStatusClasses: boolean): void;
    private registerElementEvents();
    private registerVirtualInputElementEvents();
    private getVirtualInputElementEventsDictionary();
    private getElementEventsDictionary();
    private onElementDragOver(e);
    private onElementDragLeave(e);
    private onElementDrop(e);
    private onElementClick();
    private onVirtualInputElementChange(e);
    private onDroppableElementChange(event);
    private setLatestDrop(files);
    private emitFilesWereDropped(files);
    private registerElementEventsWithDictionary(element, eventNameToEventListenerDictionary);
}
export interface DroppableSettings {
    element: HTMLElement;
    appendStatusClasses?: boolean;
    acceptsMultipleFiles?: boolean;
    isClickable?: boolean;
}
export declare type EventRemover = () => void;
export declare type FilesWereDroppedEventListener = (files: File[]) => any;
