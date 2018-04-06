require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./assets/scripts/highlight.pack.exec');

import Droppable from 'droppable';
import Vue from 'vue/dist/vue.js'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'


document.addEventListener("DOMContentLoaded", () => {
    window['hljs'].initHighlightingOnLoad();
});


Vue.component('file-dropper', {
    template: `
<div class="column is-narrow">
    <div class="button is-primary droppable-item" ref="droppable-item">
        <div class="columns is-mobile has-text-centered is-centered">
            <div class="column is-12">
                <div>
                    <div class="icon">
                        <i class="fas fa-arrow-down"></i>
                    </div>
                </div>
                <strong>Drop a file here</strong>
                <div>
                    <i class="is-size-7">(Or click me)</i>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    mounted() {
        const droppableItem = this.$refs['droppable-item'];
        this.droppable = new Droppable({
            element: droppableItem
        });

        this.droppable.onFilesDropped(this.onFilesDropped);
    },
    destroy() {
        this.droppable.destroy();
    },
    methods: {
        onFilesDropped(files) {
            files.forEach((file) => {
                this.$toast.open({
                    duration: 5000,
                    message: `Got file ${file.name}`,
                    position: 'is-bottom',
                    type: 'is-success',
                    queue: false
                })
            });
        }
    }
});

Vue.use(Buefy);

new Vue({
    el: '#app'
});
