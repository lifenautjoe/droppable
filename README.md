<img alt="droppable logo" src="https://github.com/lifenautjoe/droppable-website/blob/fade7e64b1d8e4790296ec3761e77204c1621082/src/assets/logo-2.png?raw=true" width="250">

A javascript library to give file dropping super-powers to any HTML element.

[![Build Status](https://travis-ci.org/lifenautjoe/droppable.svg?branch=master)](https://travis-ci.org/lifenautjoe/droppable) ![Human Friendly](https://img.shields.io/badge/human-friendly-brightgreen.svg) [![Coverage Status](https://coveralls.io/repos/github/lifenautjoe/droppable/badge.svg?branch=master)](https://coveralls.io/github/lifenautjoe/droppable?branch=master)[![npm version](https://badge.fury.io/js/droppable.svg)](https://badge.fury.io/js/droppable)

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Basic usage](#basic-usage)
- [Browser Compatibility](#browser-compatibility)
- [Installation](#installation)
- [Advanced usage](#advanced-usage)
  * [Create a droppable element](#create-a-droppable-element)
  * [Listen for dropped files](#listen-for-dropped-files)
  * [Remove listener for dropped files](#remove-listener-for-dropped-files)
  * [Get the latest dropped files](#get-the-latest-dropped-files)
  * [Trigger prompt for files](#trigger-prompt-for-files)
  * [Enable prompt for files when clicked](#enable-prompt-for-files-when-clicked)
  * [Disable prompt for files when clicked](#disable-prompt-for-files-when-clicked)
  * [Enable multiple files drop](#enable-multiple-files-drop)
  * [Disable multiple files drop](#disable-multiple-files-drop)
  * [Enable append CSS class when files are dragged on element](#enable-append-css-class-when-files-are-dragged-on-element)
  * [Disable append CSS class when files are dragged on element](#disable-append-css-class-when-files-are-dragged-on-element)
  * [Destroy](#destroy)
- [FAQ](#faq)
  * [My droppable element has a border around it when focused](#my-droppable-element-has-a-border-around-it-when-focused)
  * [I want to add a style to my droppable element when focused](#i-want-to-add-a-style-to-my-droppable-element-when-focused)
- [Development](#development)
  * [Clone the repository](#clone-the-repository)

## Motivation

Wouldn't it be great if you could drop files in any HTML element allowing you to style the item however you like?

Well now you can!  🎉

## Features

* Restrict drop to single or multiple files
* CSS class added when files are being dragged on top of the HTML element (configurable)
* Clicking on the html element also prompts user for files (configurable)
* Zero dependencies
* Tiny! (~4 KB Minified)
* Accessibility support

## Basic usage

````typescript
const Droppable = require('droppable');

const droppable = new Droppable({
    element: document.querySelector('#my-droppable-element')
})

droppable.onFilesDropped((files) => {
    console.log('Files were dropped:', files);
});

// Clean up when you're done!
droppable.destroy();
````

## Browser Compatibility

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ✔                                                                                 | ✔                                                                                    | 10+ ✔                                                                                                                        | ✔                                                                              | ✔                                                                                 | ✔                                                                           |


## Installation

```bash
npm install droppable
```

## Advanced usage

### Create a droppable element

````typescript
const Droppable = require('droppable');

const droppable = new Droppable({
    element: document.querySelector('#my-droppable-element')
});
````

### Listen for dropped files
```typescript
droppable.onFilesDropped((files) => {
    console.log('Files were dropped:', files);
});
```

### Remove listener for dropped files
`onFilesDropped` returns a function which when called removes the event listener
```typescript
const eventRemover = droppable.onFilesDropped((files) => {
    console.log('Files were dropped on the element:', files);
});

eventRemover();
```

### Get the latest dropped files
```typescript
const latestDroppedFiles = droppable.getLatestDroppedFiles();
```

### Trigger prompt for files
Sometimes you will want to prompt the user for files without him dropping files or clicking the element.
```typescript
droppable.promptForFiles();
```

### Enable prompt for files when clicked
**This is by default `true`**

The user will be prompted for files when the droppable element is clicked

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    isClickable: true
})

// On runtime
droppable.setIsClickable(true);
```

### Disable prompt for files when clicked

The user won't be prompted for files when the droppable element is clicked

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    isClickable: false
})

// On runtime
droppable.setIsClickable(false);
```

### Enable multiple files drop
**This is by default `true`**

The user will be able to drop or select multiple files.

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    acceptsMultipleFiles: true
})

// On runtime
droppable.setAcceptsMultipleFiles(true);
```

### Disable multiple files drop

The user will be able to drop or select one single file.

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    acceptsMultipleFiles: false
})

// On runtime
droppable.setAcceptsMultipleFiles(false);
```

### Enable append CSS class when files are dragged on element
**This is by default `true`**

The class `dragover` will be added to the droppable element when files are being dragged on it.

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    appendStatusClasses: true
})

// On runtime
droppable.setAppendStatusClasses(true);
```

### Disable append CSS class when files are dragged on element

The class `dragover` won't be added to the droppable element when files are being dragged on it.

```typescript
// On instantiation
const droppable = new Droppable({
    element,
    appendStatusClasses: false
})

// On runtime
droppable.setAppendStatusClasses(false);
```


### Destroy
The library attaches several events to the HTML element made droppable.
The `destroy` function not only removes all of them but also the onFilesDropped listeners.

```typescript
droppable.destroy();
```

## FAQ

### My droppable element has a border around it when focused

The library makes the droppable elements accesible, this means that they can get focused by the user.

Your browser by default adds an outline to the focused items. To remove it, in your css:

```css
    #your-droppable-item:focus{
        outline: 0;
    }

```

### I want to add a style to my droppable element when focused

In your css:

```css
    #your-droppable-item:focus:not(:active){
        // Here you can do anything! For example adding a shadow
        box-shadow: 0 0 0 0.125em rgba(111, 14, 217, 0.25);
    }
```

## Development

### Clone the repository

```bash
git clone git@github.com:lifenautjoe/droppable.git
```

### Use npm commands

* `npm t`: Run test suite
* `npm start`: Runs `npm run build` in watch mode
* `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
* `npm run test:prod`: Run linting and generate coverage
* `npm run build`: Generate bundles and typings, create docs
* `npm run lint`: Lints code
* `npm run commit`: Commit using conventional commit style \([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:\)

Author [Joel Hernandez](https://instagram.com/lifenautjoe)
