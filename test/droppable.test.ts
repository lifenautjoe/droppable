import Droppable from '../src/droppable';

const defaults = {
    appendStatusClasses: true,
    isClickable: true,
    acceptsMultipleFiles: true
};

/**
 * Droppable
 */
describe('Droppable', () => {
    afterEach(() => {
        expect.hasAssertions();
    });

    describe('class', () => {
        describe('makeVirtualInputElement()', () => {
            it('should return an HTMLInputElement of type file and display none', () => {
                const inputElement = Droppable['makeVirtualInputElement']();
                expect(inputElement).toBeInstanceOf(HTMLInputElement);
                expect(inputElement.type).toBe('file');
                expect(inputElement.style.display).toBe('none');
            });
        });
    });

    describe('instance', () => {
        describe('constructor(config)', () => {
            describe('when no config.element is given', () => {
                it('should throw an error', () => {
                    expect(() => {
                        const droppable = new Droppable();
                    }).toThrow();
                });
            });

            describe('when config.element is given', () => {
                it('should store it', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });
                    expect(droppable['element']).toBe(element);
                });
            });

            describe('when config.appendStatusClasses is given', () => {
                it('should call setAppendStatusClasses() with the given value', () => {
                    const mockFn = jest.spyOn(Droppable.prototype, 'setAppendStatusClasses');
                    const appendStatusClasses = !defaults.appendStatusClasses;

                    const element = document.createElement('div');

                    new Droppable({
                        element,
                        appendStatusClasses
                    });

                    expect(mockFn).toHaveBeenCalledWith(appendStatusClasses);

                    mockFn.mockRestore();
                });
            });

            describe('when config.acceptsMultipleFiles is given', () => {
                it('should call setAcceptsMultipleFiles() with the given value', () => {
                    const mockFn = jest.spyOn(Droppable.prototype, 'setAcceptsMultipleFiles');
                    const acceptsMultipleFiles = !defaults.acceptsMultipleFiles;

                    const element = document.createElement('div');

                    new Droppable({
                        element,
                        acceptsMultipleFiles
                    });

                    expect(mockFn).toHaveBeenCalledWith(acceptsMultipleFiles);

                    mockFn.mockRestore();
                });
            });

            describe('when config.isClickable is given', () => {
                it('should call setIsClickable() with the given value', () => {
                    const mockFn = jest.spyOn(Droppable.prototype, 'setIsClickable');
                    const isClickable = !defaults.isClickable;

                    const element = document.createElement('div');

                    new Droppable({
                        element,
                        isClickable
                    });

                    expect(mockFn).toHaveBeenCalledWith(isClickable);

                    mockFn.mockRestore();
                });
            });

            describe('when config.eventConfig is given', () => {
                it('should override the default eventConfig value', () => {
                    const eventConfig = {};
                    const element = document.createElement('div');
                    const mock = jest.fn();

                    class NoelMock {
                        constructor(...args: any[]) {
                            mock(...args);
                        }

                        getEvent() {}
                    }

                    const originalNoel = Droppable['Noel'];
                    Droppable['Noel'] = NoelMock;

                    new Droppable({
                        element,
                        eventConfig
                    });

                    expect(mock).toHaveBeenCalledWith(eventConfig);

                    Droppable['Noel'] = originalNoel;
                });
            });

            it('should call eventDispatcher.getEvent() and store it as the filesWereDroppedEvent', () => {
                const element = document.createElement('div');
                const fakeEvent = {
                    on: () => {},
                    emit: () => {}
                };

                class NoelMock {
                    getEvent() {
                        return fakeEvent;
                    }
                }

                const originalNoel = Droppable['Noel'];
                Droppable['Noel'] = NoelMock;

                const droppable = new Droppable({
                    element
                });

                expect(droppable['filesWereDroppedEvent']).toBe(fakeEvent);

                Droppable['Noel'] = originalNoel;
            });

            it('should call registerElementEvents() and store the events remover as elementEventsRemover', () => {
                const eventRemover = () => {};

                const mockFn = jest.spyOn(Droppable.prototype, 'registerElementEvents').mockImplementation(() => {
                    return eventRemover;
                });

                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                expect(mockFn).toHaveBeenCalled();

                expect(droppable['elementEventsRemover']).toBe(eventRemover);

                mockFn.mockRestore();
            });

            it('should call Droppable.makeVirtualInputElement() and store the result as virtualInputElement', () => {
                const inputElement = document.createElement('input');

                const mockFn = jest.spyOn(Droppable, 'makeVirtualInputElement').mockImplementation(() => {
                    return inputElement;
                });
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                expect(mockFn).toHaveBeenCalled();

                expect(droppable['virtualInputElement']).toEqual(inputElement);
            });

            it('should call registerVirtualInputElementEvents() and store the events remover as virtualInputElementEventsRemover', () => {
                const fakeEventRemover = () => {};

                const mockFn = jest.spyOn(Droppable.prototype, 'registerVirtualInputElementEvents').mockImplementation(() => {
                    return fakeEventRemover;
                });
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                expect(mockFn).toHaveBeenCalled();

                expect(droppable['virtualInputElementEventsRemover']).toEqual(fakeEventRemover);
            });

            it('should have default config values', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                expect(droppable['appendStatusClasses']).toBe(defaults.appendStatusClasses);
                expect(droppable['isClickable']).toBe(defaults.isClickable);
                expect(droppable['virtualInputElement'].hasAttribute('multiple')).toBe(true);
            });
        });

        describe('setAcceptsMultipleFiles(acceptsMultipleFiles: boolean)', () => {
            it('should set the given value as the attribute "multiple" of the virtualInputElement', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const acceptsMultipleFiles = !defaults.acceptsMultipleFiles;

                droppable.setAcceptsMultipleFiles(acceptsMultipleFiles);

                expect(droppable['virtualInputElement'].getAttribute('multiple')).toBe(acceptsMultipleFiles.toString());
            });
        });

        describe('setIsClickable(isClickable)', () => {
            it('should set the given value as value of instance attribute isClickable', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const isClickable = !defaults.isClickable;

                droppable.setIsClickable(isClickable);

                expect(droppable['isClickable']).toBe(isClickable);
            });
        });

        describe('setAppendStatusClasses(appendStatusClasses: boolean)', () => {
            it('should set the given value as value of instance attribute appendStatusClasses', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const appendStatusClasses = !defaults.appendStatusClasses;

                droppable.setAppendStatusClasses(appendStatusClasses);

                expect(droppable['appendStatusClasses']).toBe(appendStatusClasses);
            });
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
