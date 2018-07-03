/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
export default class Droppable {
    private static ENTER_KEY_CODE;
    private dragOverClass;
    private appendStatusClasses;
    private isClickable;
    private element;
    private elementEventsRemover;
    private virtualInputElement;
    private virtualInputElementEventsRemover;
    private elementKeyDownEventRemover;
    private latestDroppedFiles;
    private onFilesDroppedEventListeners;
    constructor(config: DroppableSettings);
    private static makeVirtualInputElement();
    private static addAccessibilityAttributesToDroppableElement(element);
    private static removeAccessibilityAttributesToDroppableElement(element);
    onFilesDropped(listener: FilesWereDroppedEventListener): EventRemover;
    destroy(): void;
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
    private onElementKeyDown(e);
    private onElementFocus();
    private onElementFocusOut();
    private onVirtualInputElementChange(e);
    private onDroppableElementChange(event);
    private setLatestDrop(files);
    private emitFilesWereDropped(files);
    private registerElementEventsWithDictionary(element, eventNameToEventListenerDictionary);
}
export interface DroppableSettings {
    element: HTMLElement;
    dragOverClass?: string;
    appendStatusClasses?: boolean;
    acceptsMultipleFiles?: boolean;
    isClickable?: boolean;
}
export declare type EventRemover = () => void;
export declare type FilesWereDroppedEventListener = (files: File[]) => any;
