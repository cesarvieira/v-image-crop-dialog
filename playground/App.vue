<script setup lang="ts">
import { computed, ref } from 'vue';
import VImageCropDialog from '../src/index.ts';
import { useLocale } from 'vuetify';

const open = ref(false);
const image = ref('https://picsum.photos/seed/test01/600/600');
const result = ref<File | null>(null);
const url = computed(() => result.value ? URL.createObjectURL(result.value) : null);

const { t } = useLocale();
</script>

<template>
  <div>
    <VBtn @click="open = true">
      {{ t('$vuetify.open') }}
    </VBtn>

    <VImageCropDialog
      v-model="open"
      :url="image"
      @update:file="result = $event"
    />

    <div v-if="result">
      <h3>Result</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{{ result.name }}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{{ result.type }}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{{ result.size }}</td>
          </tr>
          <tr>
            <td>Preview</td>
            <td>
              <img v-if="url" :src="url">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
