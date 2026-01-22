import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import 'vuetify/styles';

const app = createApp(App);
app.use(createVuetify({
  components,
  directives,
}));
app.mount('#app');
