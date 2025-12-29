import type { App } from 'vue';
import VImageCropDialog from './components/VImageCropDialog.vue';

export { VImageCropDialog };

export default {
  install(app: App) {
    app.component('VImageCropDialog', VImageCropDialog);
  },
};
