import Droppable from '../src/droppable';

/**
 * Droppable
 */
describe('Droppable', () => {
    describe('class', () => {
        describe('makeVirtualInputElement()', () => {
            it('should create a virtual hidden file input', () => {});
        });
    });

    describe('instance', () => {
        describe('constructor(config)', () => {
            describe('when no config.element is given', () => {
                it('should throw an error', () => {});
            });

            describe('when config.element is given', () => {
                it('should store it', () => {});
            });

            describe('when config.appendStatusClasses is given', () => {
                it('should call setAppendStatusClasses() with the given value', () => {});
            });

            describe('when config.acceptsMultipleFiles is given', () => {
                it('should call setAcceptsMultipleFiles() with the given value', () => {});
            });

            describe('when config.isClickable is given', () => {
                it('should call setIsClickeable() with the given value', () => {});
            });

            describe('when config.eventConfig is given', () => {
                it('should override the default eventConfig value', () => {});
            });

            describe('setAcceptsMultipleFiles(acceptsMultipleFiles: boolean)', () => {
                it('should set the given value as the attribute "multiple" of the virtualInputElement', () => {});
            });

            describe('setIsClickable(isClickable)', () => {
                it('should set the given value as value of instance attribute isClickable', () => {});
            });

            describe('setAppendStatusClasses(appendStatusClasses: boolean)', () => {
                it('should set the given value as value of instance attribute appendStatusClasses', () => {});
            });

            describe('should create the filesWereDroppedEvent', () => {});

            describe('should call registerElementEvents() and store the events remover as elementEventsRemover', () => {});

            describe('should create the elementEventsRemover and store it', () => {});

            describe('should call Droppable.makeVirtualInputElement() and store the result as virtualInputElement', () => {});

            describe('should call registerVirtualInputElementEvents() and store the events remover as virtualInputElementEventsRemover', () => {});

            it('should have default config values', () => {});
        });

        describe('onFilesDropped(listener)', () => {
            it('should add the given listener to the filesWereDroppedEvent', () => {});
        });

        describe('getLatestDroppedFiles()', () => {
            describe('when files were previously dropped', () => {
                it('should return an array containing the previously dropped files', () => {});
            });

            describe('when files were NOT previously dropped', () => {
                it('should return an empty array', () => {});
            });
        });

        describe('promptForFiles()', () => {
            it('should trigger a click on the virtualInputElement', () => {});
        });

        describe('registerVirtualInputElementEvents()', () => {
            it(`should get the virtual input element eventsDictionary and call registerElementEventsWithDictionary(this.virtualInputElement, eventsDictionary)`, () => {});
        });

        describe('registerElementEvents()', () => {
            it(`should get the element eventsDictionary and call registerElementEventsWithDictionary(this.element, eventsDictionary)`, () => {});
        });

        describe('setLatestDrop(files)', () => {
            it('should set latestDroppedFiles to the given value', () => {});

            it('should call emitFilesWereDropped(files)', () => {});
        });

        describe('emitFilesWereDropped(files)', () => {
            it('should call filesWereDroppedEvent.emit(files)', () => {});
        });

        describe('onElementClick()', () => {
            describe('when isClickable is true', () => {
                it('should call promptForFiles()', () => {});
            });

            describe('when isClickable is false', () => {
                it('should not call promptForFiles()', () => {});
            });
        });

        describe('onElementDragOver(event)', () => {
            it('should call event.preventDefault()', () => {});

            it('should call event.stopPropagation()', () => {});

            it('should add the Droppable.DRAG_OVER_CLASS', () => {});
        });

        describe('onElementDragLeave(event)', () => {
            it('should call event.preventDefault()', () => {});

            it('should call event.stopPropagation()', () => {});

            it('should remove the Droppable.DRAG_OVER_CLASS', () => {});
        });

        describe('onVirtualInputElementChange(event)', () => {
            it('should call onDroppableElementChange(event)', () => {});
        });

        describe('onDroppableElementChange(event)', () => {
            describe('when the event has dataTransfer', () => {
                it('should grab the files from event.dataTransfer.files', () => {});
            });

            describe('when the event has a target', () => {
                it('should grab the Files from event.target.files', () => {});
            });

            describe('when the event has neither dataTransfer nor target', () => {
                it('should throw an Error', () => {});
            });
        });

        describe('cleanUp()', () => {
            it('should call the elementEventsRemover', () => {});

            it('should call the virtualInputElementEventsRemover', () => {});
        });

        describe('getVirtualInputElementEventsDictionary()', () => {
            it('should return a dictionary with change as key and its matching event listener as value', () => {});
        });

        describe('getElementEventsDictionary()', () => {
            it('should return a dictionary with dragover, dragleave, drop and click as keys and their matching event listeners as values', () => {});
        });

        describe('registerElementEventsWithDictionary(element: HTMLElement, eventNameToEventListenerDictionary)', () => {
            it('should register the given event names with matching listeners on the element', () => {});

            it('should return a function that removes all events from the element when called', () => {});
        });
    });
});
