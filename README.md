# droppable

A library to give file dropping super-powers to any HTML element.

[![Build Status](https://travis-ci.org/lifenautjoe/droppable.svg?branch=master)](https://travis-ci.org/lifenautjoe/droppable) ![Human Friendly](https://img.shields.io/badge/human-friendly-brightgreen.svg) [![Coverage Status](https://coveralls.io/repos/github/lifenautjoe/droppable/badge.svg?branch=master)](https://coveralls.io/github/lifenautjoe/droppable?branch=master)

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Basic usage](#basic-usage)
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
  * [Clean up](#clean-up)
- [Development](#development)
  * [Clone the repository](#clone-the-repository)

## Motivation

Wouldn't it be great if you could drop files in any HTML element and retrieve them by listening to a simple event?

This library does just that 🎉

## Features

* Restrict drop to single or multiple files
* CSS class added when files are being dragged on top of the HTML element (configurable)
* Clicking on the html element also prompts user for files (configurable)
* Zero dependencies
* Tiny! (~4 KB Minified)

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
droppable.cleanUp();
````

## Installation

```bash
npm install droppable
```

## Advanced usage

### Create a droppable element

````typescript
const Noel = require('Noel');

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


### Clean up
The library attaches several events to the HTML element which is made droppable.
When you're done remember to call the `cleanUp` function
```typescript
droppable.cleanUp();
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
