
require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./assets/scripts/highlight.pack.exec');

import Droppable from 'droppable';

document.addEventListener("DOMContentLoaded", () => {
    window['hljs'].initHighlightingOnLoad();
});
