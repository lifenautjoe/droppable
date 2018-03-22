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

        describe('onFilesDropped()', () => {
            it('should add the listener to the filesWereDroppedEvent', () => {});
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
            it('should trigger a click on virtualInputElement', () => {});
        });

        describe('setAppendStatusClasses()', () => {
            it('should set the attribute appendStatusClasses', () => {});
        });

        describe('cleanUp()', () => {
            it('should call the elementEventsRemover', () => {});

            it('should call the virtualInputElementEventsRemover', () => {});
        });

        describe('registerElementEventsWithEventNameToEventListenerDictionary(element: HTMLElement, eventNameToEventListenerDictionary)', () => {
            it('should register the given event names with matching listeners on the element', () => {});
        });
    });
});
