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

                mockFn.mockRestore();
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

                mockFn.mockRestore();
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
            it('should add the given listener to the filesWereDroppedEvent', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const mockFn = jest.spyOn(droppable['filesWereDroppedEvent'], 'on');
                const eventListener = () => {};
                droppable.onFilesDropped(eventListener);

                expect(mockFn).toHaveBeenCalledWith(eventListener);
            });
        });

        describe('getLatestDroppedFiles()', () => {
            describe('when latestDroppedFiles is defined', () => {
                it('should return it', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });
                    const fakeDroppedFiles: File[] = [];
                    droppable['latestDroppedFiles'] = fakeDroppedFiles;

                    const latestDroppedFiles = droppable.getLatestDroppedFiles();

                    expect(latestDroppedFiles).toBe(fakeDroppedFiles);
                });
            });

            describe('when latestDroppedFiles is not defined', () => {
                it('should return an empty array', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const latestDroppedFiles = droppable.getLatestDroppedFiles();

                    expect(latestDroppedFiles).toBeInstanceOf(Array);
                    expect(latestDroppedFiles.length).toBe(0);
                });
            });
        });

        describe('promptForFiles()', () => {
            it('should trigger a click on the virtualInputElement', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const mock = jest.spyOn(droppable['virtualInputElement'], 'click');
                droppable.promptForFiles();

                expect(mock).toHaveBeenCalled();
            });
        });

        describe('registerVirtualInputElementEvents()', () => {
            it(`should get the virtual input element eventsDictionary and call registerElementEventsWithDictionary(this.virtualInputElement, eventsDictionary) and return the remover function`, () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const fakeEventsDictionary = {};
                const getVirtualInputElementEventsDictionaryMock = jest.spyOn(droppable, 'getVirtualInputElementEventsDictionary').mockImplementation(() => {
                    return fakeEventsDictionary;
                });

                const fakeRemoverFunction = () => {};

                const registerElementEventsWithDictionaryMock = jest.spyOn(droppable, 'registerElementEventsWithDictionary').mockImplementation(() => {
                    return fakeRemoverFunction;
                });

                const fakeVirtualInputElement = document.createElement('input');
                droppable['virtualInputElement'] = fakeVirtualInputElement;

                const result = droppable['registerVirtualInputElementEvents']();

                expect(getVirtualInputElementEventsDictionaryMock).toHaveBeenCalled();
                expect(registerElementEventsWithDictionaryMock).toHaveBeenCalledWith(fakeVirtualInputElement, fakeEventsDictionary);
                expect(result).toEqual(fakeRemoverFunction);

                getVirtualInputElementEventsDictionaryMock.mockClear();

                getVirtualInputElementEventsDictionaryMock.mockRestore();
                registerElementEventsWithDictionaryMock.mockRestore();
            });
        });

        describe('registerElementEvents()', () => {
            it(`should get the element eventsDictionary and call registerElementEventsWithDictionary(this.element, eventsDictionary) and return the remover function`, () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const fakeEventsDictionary = {};
                const getElementEventsDictionaryMock = jest.spyOn(droppable, 'getElementEventsDictionary').mockImplementation(() => {
                    return fakeEventsDictionary;
                });

                const fakeRemoverFunction = () => {};

                const registerElementEventsWithDictionaryMock = jest.spyOn(droppable, 'registerElementEventsWithDictionary').mockImplementation(() => {
                    return fakeRemoverFunction;
                });

                const fakeElement = document.createElement('input');
                droppable['element'] = fakeElement;

                const result = droppable['registerElementEvents']();

                expect(getElementEventsDictionaryMock).toHaveBeenCalled();
                expect(registerElementEventsWithDictionaryMock).toHaveBeenCalledWith(fakeElement, fakeEventsDictionary);
                expect(result).toEqual(fakeRemoverFunction);

                getElementEventsDictionaryMock.mockClear();

                getElementEventsDictionaryMock.mockRestore();
                registerElementEventsWithDictionaryMock.mockRestore();
            });
        });

        describe('setLatestDrop(files)', () => {
            it('should set latestDroppedFiles to the given value', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const fakeFiles: File[] = [];

                droppable['setLatestDrop'](fakeFiles);

                expect(droppable['latestDroppedFiles']).toEqual(fakeFiles);
            });

            it('should call emitFilesWereDropped(files)', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const mockFn = jest.spyOn(droppable, 'emitFilesWereDropped');

                const fakeFiles: File[] = [];

                droppable['setLatestDrop'](fakeFiles);

                expect(mockFn).toHaveBeenCalledWith(fakeFiles);
            });
        });

        describe('emitFilesWereDropped(files)', () => {
            it('should call filesWereDroppedEvent.emit(files)', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const mockFn = spyOn(droppable['filesWereDroppedEvent'], 'emit');

                const fakeFiles: File[] = [];

                droppable['emitFilesWereDropped'](fakeFiles);

                expect(mockFn).toHaveBeenCalledWith(fakeFiles);
            });
        });

        describe('onElementClick()', () => {
            describe('when isClickable is true', () => {
                it('should call promptForFiles()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = spyOn(droppable, 'promptForFiles');

                    droppable['isClickable'] = true;

                    droppable['onElementClick']();

                    expect(mockFn).toHaveBeenCalled();
                });
            });

            describe('when isClickable is false', () => {
                it('should not call promptForFiles()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = spyOn(droppable, 'promptForFiles');

                    droppable['isClickable'] = false;

                    droppable['onElementClick']();

                    expect(mockFn).not.toHaveBeenCalled();
                });
            });
        });

        describe('onElementDragOver(event)', () => {
            let fakeEvent: any;

            beforeEach(() => {
                fakeEvent = {
                    preventDefault: jest.fn(),
                    stopPropagation: jest.fn()
                };
            });

            it('should call event.preventDefault()', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable['onElementDragOver'](fakeEvent);

                expect(fakeEvent.preventDefault).toHaveBeenCalled();
            });

            it('should call event.stopPropagation()', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable['onElementDragOver'](fakeEvent);

                expect(fakeEvent.stopPropagation).toHaveBeenCalled();
            });

            it('should add the dragOverClass to the element', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable['onElementDragOver'](fakeEvent);

                expect(element.classList.contains(droppable['dragOverClass'])).toBe(true);
            });
        });

        describe('onElementDragLeave(event)', () => {
            let fakeEvent: any;

            beforeEach(() => {
                fakeEvent = {
                    preventDefault: jest.fn(),
                    stopPropagation: jest.fn()
                };
            });

            it('should call event.preventDefault()', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable['onElementDragLeave'](fakeEvent);

                expect(fakeEvent.preventDefault).toHaveBeenCalled();
            });

            it('should call event.stopPropagation()', () => {
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                element.classList.add(droppable['dragOverClass']);

                droppable['onElementDragLeave'](fakeEvent);

                expect(fakeEvent.stopPropagation).toHaveBeenCalled();
            });

            it('should remove the dragOverClass from the element', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable['onElementDragLeave'](fakeEvent);

                expect(element.classList.contains(droppable['dragOverClass'])).toBe(false);
            });
        });

        describe('onVirtualInputElementChange(event)', () => {
            it('should call onDroppableElementChange(event)', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const mockFn = jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                const fakeEvent = {};

                droppable['onVirtualInputElementChange'](fakeEvent);

                expect(mockFn).toHaveBeenCalledWith(fakeEvent);
            });
        });

        describe('onDroppableElementChange(event)', () => {
            describe('when the event has dataTransfer', () => {
                it('should call setLatestDrop with the files from event.dataTransfer.files', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    let files;
                    const mockFn = jest.spyOn(droppable, 'setLatestDrop').mockImplementation(filesArray => {
                        files = filesArray;
                    });

                    const file = new Blob([], { type: 'text/csv' });

                    const fakeEvent = {
                        dataTransfer: {
                            files: [file]
                        }
                    };

                    droppable['onDroppableElementChange'](fakeEvent);

                    expect(mockFn).toHaveBeenCalled();
                    expect(files).toContain(file);
                });
            });

            describe('when the event has a target', () => {
                it('should call setLatestDrop wit the files from event.target.files', () => {});
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
