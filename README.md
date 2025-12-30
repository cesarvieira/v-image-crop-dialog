# V-Image-Crop-Dialog

A Vue 3 dialog component for image cropping, built with Vuetify 3 and TypeScript. Based on `vue-advanced-cropper` for a powerful and intuitive cropping experience.

## Features

- 🎨 Full integration with **Vuetify 3**
- 🔄 Support for **rectangular** and **circular** cropping
- 🖼️ Support for images via **File** or **URL**
- 🔧 Advanced controls: rotation, flip, zoom, and reset
- 📐 Customizable aspect ratio
- 🎯 Configurable output dimensions
- 💾 Automatic export in WebP format
- 📱 Fully responsive
- 🎭 TypeScript support
- 🎨 Customizable icons and button text

## Requirements

- Vue 3.5+
- Vuetify 3.11+

## Installation

```bash
npm install @cesarv/v-image-crop-dialog
```

## Usage

### Setup

If you're using the component as a plugin:

```typescript
import { createApp } from 'vue';
import VImageCropDialog from '@cesarv/v-image-crop-dialog';

const app = createApp(App);
app.use(VImageCropDialog);
```

Or import the component directly:

```html
<script setup lang="ts">
import { VImageCropDialog } from '@cesarv/v-image-crop-dialog';
import '@cesarv/v-image-crop-dialog/dist/v-image-crop-dialog.css';
</script>
```

### Basic Example

```html
<template>
  <div>
    <VBtn @click="open = true">Open Cropper</VBtn>
    
    <VImageCropDialog
      v-model="open"
      :url="imageUrl"
      @update:file="handleCroppedImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VImageCropDialog } from '@cesarv/v-image-crop-dialog';

const open = ref(false);
const imageUrl = ref('https://example.com/image.jpg');

const handleCroppedImage = (file: File) => {
  console.log('Cropped image:', file);
  // Upload or process the file here
};
</script>
```

## Examples

### Cropping with File

```html
<template>
  <div>
    <input type="file" @change="handleFileSelect" accept="image/*" />
    
    <VImageCropDialog
      v-model="open"
      :file="selectedFile"
      @update:file="handleCroppedImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
const selectedFile = ref<File | null>(null);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    open.value = true;
  }
};

const handleCroppedImage = (file: File) => {
  console.log('Cropped image:', file);
};
</script>
```

### Circular Crop with Fixed Aspect Ratio

```html
<template>
  <VImageCropDialog
    v-model="open"
    :url="imageUrl"
    stencil="circle"
    :aspect-ratio="1"
    @update:file="handleCroppedImage"
  />
</template>
```

### Custom Dimensions

```html
<template>
  <VImageCropDialog
    v-model="open"
    :url="imageUrl"
    :img-width="800"
    :img-height="600"
    :aspect-ratio="4/3"
    @update:file="handleCroppedImage"
  />
</template>
```

### Persistent Dialog

```html
<template>
  <VImageCropDialog
    v-model="open"
    :url="imageUrl"
    persistent
    max-width="800px"
    @update:file="handleCroppedImage"
  />
</template>
```

### Custom Icons and Button Text

```html
<template>
  <VImageCropDialog
    v-model="open"
    :url="imageUrl"
    icon-rotate-right="mdi-rotate-clockwise"
    icon-flip-horizontal="mdi-swap-horizontal"
    crop-button-text="Confirm"
    icon-crop="mdi-check-circle"
    @update:file="handleCroppedImage"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Controls dialog visibility |
| `file` | `File \| null` | `null` | Image file to crop |
| `url` | `string \| null` | `null` | Image URL to crop |
| `stencil` | `'rect' \| 'circle'` | `'rect'` | Type of crop stencil |
| `imgWidth` | `number` | `undefined` | Output image width in pixels |
| `imgHeight` | `number` | `undefined` | Output image height in pixels |
| `aspectRatio` | `number` | `undefined` | Crop aspect ratio (e.g., 16/9, 1) |
| `persistent` | `boolean` | `false` | Prevents dialog from closing when clicking outside |
| `maxWidth` | `string \| number` | `'auto'` | Maximum dialog width |
| `iconFlipVertical` | `string` | `'mdi-flip-vertical'` | Icon for vertical flip control |
| `iconFlipHorizontal` | `string` | `'mdi-flip-horizontal'` | Icon for horizontal flip control |
| `iconRotateRight` | `string` | `'mdi-rotate-right'` | Icon for rotate right control |
| `iconRotateLeft` | `string` | `'mdi-rotate-left'` | Icon for rotate left control |
| `iconZoomIn` | `string` | `'mdi-magnify-plus-outline'` | Icon for zoom in control |
| `iconZoomOut` | `string` | `'mdi-magnify-minus-outline'` | Icon for zoom out control |
| `iconReset` | `string` | `'mdi-refresh'` | Icon for reset control |
| `iconCrop` | `string` | `'mdi-check'` | Icon for crop button |
| `cropButtonText` | `string` | `'Crop'` | Text for crop button |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when dialog visibility changes |
| `update:file` | `File` | Emitted when image is cropped, returns WebP file |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `activator` | `activatorProps` | Slot for element that activates the dialog |
| `crop-button` | `{ processing: boolean, crop: () => void }` | Slot for custom crop button |

### Activator Slot

Use the activator slot to customize the element that opens the dialog:

```html
<template>
  <VImageCropDialog v-model="open" :url="imageUrl">
    <template #activator="{ props: activatorProps }">
      <VBtn v-bind="activatorProps" color="primary">
        Crop Image
      </VBtn>
    </template>
  </VImageCropDialog>
</template>
```

### Crop Button Slot

Use the crop-button slot to completely customize the crop button:

```html
<template>
  <VImageCropDialog v-model="open" :url="imageUrl">
    <template #crop-button="{ processing, crop }">
      <VBtn
        color="success"
        :loading="processing"
        @click="crop"
      >
        <VIcon icon="mdi-check" start />
        Confirm Crop
      </VBtn>
    </template>
  </VImageCropDialog>
</template>
```

## Cropper Controls

The component includes built-in controls for:

- **Rotate**: Rotate image 90° left or right
- **Flip**: Flip image horizontally or vertically
- **Zoom**: Zoom in or out
- **Reset**: Restore image to original state

These controls are displayed as floating buttons over the cropper and can be customized via icon props.

## Notes

- The cropped image is always exported in **WebP** format
- If `imgWidth` and `imgHeight` are not specified, the image will maintain its original dimensions
- The component requires either `file` or `url` to be provided to function
- Make sure Vuetify is properly configured in your project
- All icon props accept Material Design Icons (mdi-*) or any icon string compatible with Vuetify's VIcon component

## License

ISC

## Author

[Cesar Vieira](https://github.com/cesarvieira)
