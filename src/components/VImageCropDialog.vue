<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import type { CropperResult, ImageSize } from 'vue-advanced-cropper';
import { VDialog, VCard, VCardText, VCardActions, VBtn, VIcon } from 'vuetify/components';
import { useLocale } from 'vuetify';

interface Props {
  modelValue: boolean;
  stencil?: 'rect' | 'circle';
  imgWidth?: number;
  imgHeight?: number;
  persistent?: boolean;
  maxWidth?: string | number;
  file?: File | null;
  url?: string | null;
  aspectRatio?: number;
  icons?: {
    flipVertical?: string;
    flipHorizontal?: string;
    rotateRight?: string;
    rotateLeft?: string;
    zoomIn?: string;
    zoomOut?: string;
    reset?: string;
    crop?: string;
    cancel?: string;
  };
  labels?: {
    crop?: string;
    cancel?: string;
  };
}

const props = defineProps<Props>();
const { t } = useLocale();

const labels = computed(() => ({
  crop: props.labels?.crop || t('$vuetify.confirmEdit.ok'),
  cancel: props.labels?.cancel || t('$vuetify.confirmEdit.cancel'),
}));

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:file', value: File): void;
}>();

const fileName = ref<string>('image.webp');
const cropperEl = ref<typeof Cropper | null>(null);
const processing = ref(false);
const previewUrl = ref<string | null>(null);

const show = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const stencilComponent = computed(() =>
  props.stencil === 'circle' ? CircleStencil : undefined,
);

watch(() => props.file, (value) => {
  if (value) loadImage(value);
});

watch(() => props.url, (value) => {
  if (value) previewUrl.value = value;
});

watch(show, (value) => {
  if (!value) {
    fileName.value = 'image.webp';
    processing.value = false;
  }
});

const loadImage = (file: File) => {
  fileName.value = file.name.replace(/\.[^/.]+$/, '') + '.webp';
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(file);
};

const crop = async () => {
  if (!cropperEl.value) return;
  processing.value = true;

  const data = cropperEl.value['getResult']({
    size: { width: props.imgWidth, height: props.imgHeight },
    fillColor: 'transparent',
    mimeType: 'image/webp',
  }) as CropperResult;

  if (!data.canvas) {
    processing.value = false;
    return;
  }

  const blob = await new Promise<Blob>((resolve) => {
    data.canvas?.toBlob(blob => resolve(blob as Blob), 'image/webp');
  });
  const file = new File([blob], fileName.value, { type: 'image/webp' });

  emit('update:file', file);
  show.value = false;
};

const actions = computed(() => [
  { icon: props.icons?.flipVertical || 'mdi-flip-vertical', fn: () => cropperEl.value?.['flip'](true, false) },
  { icon: props.icons?.flipHorizontal || 'mdi-flip-horizontal', fn: () => cropperEl.value?.['flip'](false, true) },
  { icon: props.icons?.rotateRight || 'mdi-rotate-right', fn: () => cropperEl.value?.['rotate'](90) },
  { icon: props.icons?.rotateLeft || 'mdi-rotate-left', fn: () => cropperEl.value?.['rotate'](-90) },
  { icon: props.icons?.zoomIn || 'mdi-magnify-plus-outline', fn: () => cropperEl.value?.['zoom'](2) },
  { icon: props.icons?.zoomOut || 'mdi-magnify-minus-outline', fn: () => cropperEl.value?.['zoom'](0.5) },
  { icon: props.icons?.reset || 'mdi-refresh', fn: () => cropperEl.value?.['reset']() },
]);

const defaultSize = ({ imageSize }: { imageSize: ImageSize }) => {
  return {
    width: imageSize.width,
    height: imageSize.height,
  };
};

onMounted(() => {
  if (props.file) loadImage(props.file);
  else if (props.url) previewUrl.value = props.url;
});

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});
</script>

<template>
  <VDialog
    :model-value="show && props.file !== null"
    :persistent="props.persistent"
    :max-width="props.maxWidth || 'auto'"
    width="auto"
    @update:model-value="show = $event"
  >
    <template #activator="{ props: activatorProps }">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <VCard>
      <VCardText class="pb-4">
        <Cropper
          v-if="props.file !== null"
          ref="cropperEl"
          class="cropper"
          :src="previewUrl"
          :stencil-component="stencilComponent"
          :canvas="{
            maxHeight: props.imgHeight,
            maxWidth: props.imgWidth,
            mimeType: 'image/webp',
          }"
          :default-size="defaultSize"
          :stencil-props="{
            aspectRatio: props.aspectRatio,
          }"
        />
        <div class="cropper__controls">
          <div
            v-for="(btn, i) in actions"
            :key="i"
            class="cropper__button"
            @click="btn.fn"
          >
            <VIcon :icon="btn.icon" color="white" />
          </div>
        </div>
      </VCardText>
      <VCardActions class="pt-0 d-flex justify-space-between">
        <slot name="actions" :processing="processing" :crop="crop">
          <VBtn
            color="secondary"
            variant="tonal"
            class="ms-3 px-4"
            :loading="processing"
            @click="show = false"
          >
            {{ labels.cancel }} <VIcon :icon="props.icons?.cancel || 'mdi-close'" end />
          </VBtn>

          <VBtn
            color="primary"
            variant="tonal"
            class="me-3 px-4"
            :loading="processing"
            @click="crop"
          >
            {{ labels.crop }} <VIcon :icon="props.icons?.crop || 'mdi-crop'" end />
          </VBtn>
        </slot>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}

.cropper__controls {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.cropper__button {
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 42px;
  margin-left: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.3s;
}
.cropper__button:hover {
  background: black;
}
</style>
