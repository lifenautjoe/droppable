import Droppable from '../src/droppable';
/* tslint:disable */

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

        describe('addAccessibilityAttributesToDroppableElement(element)', () => {
            it('should add the tabindex attribute to the given element', () => {
                const element = document.createElement('div');

                Droppable['addAccessibilityAttributesToDroppableElement'](element);

                expect(element.tabIndex).toBeDefined();
            });

            it('should set the tabindex attribute of the given element to 0', () => {
                const element = document.createElement('div');

                Droppable['addAccessibilityAttributesToDroppableElement'](element);

                expect(element.tabIndex).toBe(0);
            });

            it('should add the role attribute to the given element', () => {
                const element = document.createElement('div');

                Droppable['addAccessibilityAttributesToDroppableElement'](element);

                expect(element['role']).toBeDefined();
            });

            it('should set the role attribute of the given element to button', () => {
                const element = document.createElement('div');

                Droppable['addAccessibilityAttributesToDroppableElement'](element);

                expect(element['role']).toBe('button');
            });
        });

        describe('removeAccessibilityAttributesToDroppableElement(element)', () => {
            it('should set the tabindex attribute of the given element to -1', () => {
                const element = document.createElement('div');
                element.tabIndex = 0;

                Droppable['removeAccessibilityAttributesToDroppableElement'](element);

                // Note: For some reason when calling deleteAttribute('tabIndex'), it is set to -1...
                expect(element.tabIndex).toBe(-1);
            });

            it('should remove the role attribute of the given element', () => {
                const element = document.createElement('div');
                element['role'] = 'button';

                Droppable['removeAccessibilityAttributesToDroppableElement'](element);

                expect(element['role']).toBeUndefined();
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

            it('should call addAccessibilityAttributesToDroppableElement(config.element)', () => {
                const mockFn = jest.spyOn(Droppable, 'addAccessibilityAttributesToDroppableElement').mockImplementation(() => {});

                const element = document.createElement('div');

                new Droppable({
                    element
                });

                expect(mockFn).toHaveBeenCalledWith(element);

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
            it('should add the given listener to the onFilesDroppedEventListeners', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const eventListener = () => {};
                droppable.onFilesDropped(eventListener);

                expect(droppable['onFilesDroppedEventListeners']).toContain(eventListener);
            });

            it('should return a function that removes the listener when called', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const eventListener = () => {};
                const eventRemover = droppable.onFilesDropped(eventListener);

                eventRemover();

                expect(droppable['onFilesDroppedEventListeners']).not.toContain(eventListener);
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
            it('should call the listeners in onFilesDroppedEventListeners with the files', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const listeners = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];

                listeners.forEach(listener => {
                    droppable['onFilesDroppedEventListeners'].push(listener);
                });

                const fakeFiles: File[] = [];

                droppable['emitFilesWereDropped'](fakeFiles);

                listeners.forEach(listener => {
                    expect(listener).toHaveBeenCalledWith(fakeFiles);
                });
            });
        });

        describe('onElementKeyDown(e)', () => {
            describe('when the key is enter', () => {
                it('should call promptForFiles()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = spyOn(droppable, 'promptForFiles');

                    const keyDownEvent = new KeyboardEvent('keydown', { keyCode: 13 });
                    droppable['onElementKeyDown'](keyDownEvent);

                    expect(mockFn).toHaveBeenCalled();
                });

                it('should call this.element.blur()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = spyOn(element, 'blur');

                    droppable['promptForFiles'] = () => {};

                    const keyDownEvent = new KeyboardEvent('keydown', { keyCode: 13 });
                    droppable['onElementKeyDown'](keyDownEvent);

                    expect(mockFn).toHaveBeenCalled();
                });
            });

            describe('when the key is not enter', () => {
                it('should not call promptForFiles()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = spyOn(droppable, 'promptForFiles');

                    const keyDownEvent = new KeyboardEvent('keydown', { keyCode: 14 });
                    droppable['onElementKeyDown'](keyDownEvent);

                    expect(mockFn).not.toHaveBeenCalled();
                });
            });
        });

        describe('onElementFocus()', () => {
            it('should call registerElementEventsWithDictionary(this.element,{keydown:this.onElementKeyDown}) and store the result in this.elementKeyDownEventRemover', () => {
                const fakeEventRemover = () => {};

                let callConfig;

                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const mockFn = jest.spyOn(droppable, 'registerElementEventsWithDictionary');

                mockFn.mockImplementation((element, config) => {
                    callConfig = config;
                    return fakeEventRemover;
                });

                droppable['onElementFocus']();

                expect(mockFn).toHaveBeenCalled();
                expect(callConfig['keydown']).toEqual(droppable['onElementKeyDown']);
                expect(droppable['elementKeyDownEventRemover']).toEqual(fakeEventRemover);
            });
        });

        describe('onElementFocusOut()', () => {
            describe('when this.elementKeyDownEventRemover is defined', () => {
                it('should call this.elementKeyDownEventRemover()', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    const mockFn = jest.fn();

                    droppable['elementKeyDownEventRemover'] = mockFn;

                    droppable['onElementFocusOut']();

                    expect(mockFn).toHaveBeenCalled();
                });
            });

            describe('when this.elementKeyDownEventRemover is not defined', () => {
                it('should not throw an error', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });
                    delete droppable['elementKeyDownEventRemover'];
                    expect(() => {
                        droppable['onElementFocusOut']();
                    }).not.toThrow();
                });
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

                droppable['onElementDragLeave'](fakeEvent);

                expect(fakeEvent.stopPropagation).toHaveBeenCalled();
            });

            it('should remove the dragOverClass from the element', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                element.classList.add(droppable['dragOverClass']);

                droppable['onElementDragLeave'](fakeEvent);

                expect(element.classList.contains(droppable['dragOverClass'])).toBe(false);
            });
        });

        describe('onElementDrop(event)', () => {
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

                jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                droppable['onElementDrop'](fakeEvent);

                expect(fakeEvent.preventDefault).toHaveBeenCalled();
            });

            it('should call event.stopPropagation()', () => {
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                droppable['onElementDrop'](fakeEvent);

                expect(fakeEvent.stopPropagation).toHaveBeenCalled();
            });

            it('should remove the dragOverClass from the element', () => {
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                element.classList.add(droppable['dragOverClass']);

                droppable['onElementDrop'](fakeEvent);

                expect(element.classList.contains(droppable['dragOverClass'])).toBe(false);
            });

            it('should call onDroppableElementChange(event)', () => {
                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                const mockFn = jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                droppable['onElementDrop'](fakeEvent);

                expect(mockFn).toHaveBeenCalledWith(fakeEvent);
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

            it("should set value='' on the virtualInputElement", () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });
                const mockFn = jest.spyOn(droppable, 'onDroppableElementChange').mockImplementation(() => {});

                const fakeEvent = {};

                droppable['onVirtualInputElementChange'](fakeEvent);

                expect(droppable['virtualInputElement'].value).toBe('');
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
                it('should call setLatestDrop with the files from event.target.files', () => {
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
                        target: {
                            files: [file]
                        }
                    };

                    droppable['onDroppableElementChange'](fakeEvent);

                    expect(mockFn).toHaveBeenCalled();
                    expect(files).toContain(file);
                });
            });

            describe('when the event has neither dataTransfer nor target', () => {
                it('should throw an Error', () => {
                    const element = document.createElement('div');
                    const droppable = new Droppable({
                        element
                    });

                    expect(() => {
                        droppable['onDroppableElementChange']({});
                    }).toThrow();
                });
            });
        });

        describe('destroy()', () => {
            it('should call removeAccessibilityAttributesToDroppableElement(this.element)', () => {
                const mockFn = jest.spyOn(Droppable, 'removeAccessibilityAttributesToDroppableElement').mockImplementation(() => {});

                const element = document.createElement('div');

                const droppable = new Droppable({
                    element
                });

                droppable.destroy();

                expect(mockFn).toHaveBeenCalledWith(element);

                mockFn.mockRestore();
            });

            it('should call the elementEventsRemover', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const mockFn = spyOn(droppable, 'virtualInputElementEventsRemover');

                droppable.destroy();

                expect(mockFn).toHaveBeenCalled();
            });

            it('should call the virtualInputElementEventsRemover', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const mockFn = jest.spyOn(droppable, 'elementEventsRemover');

                droppable.destroy();

                expect(mockFn).toHaveBeenCalled();
            });

            it('should set the onFilesDroppedEventListeners to an empty array', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                droppable.destroy();

                expect(droppable['onFilesDroppedEventListeners'].length).toBe(0);
            });
        });

        describe('getVirtualInputElementEventsDictionary()', () => {
            it('should return a dictionary with change as key and its matching event listener as value', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const result = droppable['getVirtualInputElementEventsDictionary']();

                expect(result['change']).toEqual(droppable['onVirtualInputElementChange']);
            });
        });

        describe('getElementEventsDictionary()', () => {
            it('should return a dictionary with dragover, dragleave, drop and click as keys and their matching event listeners as values', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const result = droppable['getElementEventsDictionary']();

                expect(result['dragover']).toEqual(droppable['onElementDragOver']);
                expect(result['dragleave']).toEqual(droppable['onElementDragLeave']);
                expect(result['drop']).toEqual(droppable['onElementDrop']);
                expect(result['click']).toEqual(droppable['onElementClick']);
            });
        });

        describe('registerElementEventsWithDictionary(element: HTMLElement, eventNameToEventListenerDictionary)', () => {
            it('should register the given event names with matching listeners on the element', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const eventsDictionary = {
                    testEvent() {
                        return this;
                    },
                    anotherTestEvent() {
                        return this;
                    }
                };

                const addedListeners = {};

                const fakeElement = document.createElement('div');

                const addEventListenerMockFn = jest.spyOn(fakeElement, 'addEventListener').mockImplementation((event, listener) => {
                    addedListeners[event] = listener;
                });

                droppable['registerElementEventsWithDictionary'](fakeElement, eventsDictionary);

                const eventKeys = Object.keys(eventsDictionary);
                expect(addEventListenerMockFn).toHaveBeenCalledTimes(eventKeys.length);

                eventKeys.forEach(key => {
                    expect(addedListeners[key]).toBeDefined();
                    // Test functions are bound
                    const listenerResult = addedListeners[key]();
                    expect(listenerResult).toEqual(droppable);
                });
            });

            it('should return a function that removes all events from the element when called', () => {
                const element = document.createElement('div');
                const droppable = new Droppable({
                    element
                });

                const eventsDictionary = {
                    testEvent() {},
                    anotherTestEvent() {}
                };

                const fakeElement = document.createElement('div');

                const addedListeners = [];

                jest.spyOn(fakeElement, 'addEventListener').mockImplementation((event, listener) => {
                    addedListeners[event] = listener;
                });

                const removeEventListenerMockFn = jest.spyOn(fakeElement, 'removeEventListener').mockImplementation(key => {
                    delete addedListeners[key];
                });

                const result = droppable['registerElementEventsWithDictionary'](fakeElement, eventsDictionary);

                result();

                const eventKeys = Object.keys(eventsDictionary);

                expect(removeEventListenerMockFn).toHaveBeenCalledTimes(eventKeys.length);

                eventKeys.forEach(key => {
                    expect(addedListeners[key]).not.toBeDefined();
                });
            });
        });
    });
});
