import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import hljsVuePlugin from '@highlightjs/vue-plugin';

import { createApp } from 'vue';
import App from './App.vue';

hljs.registerLanguage('csharp', csharp);

createApp(App).use(hljsVuePlugin).mount('#app');
