<script setup lang="ts">
import { computed, ref } from 'vue';
import VImageCropDialog from '../src/components/VImageCropDialog.vue';

const open = ref(false);
const image = ref('https://picsum.photos/seed/test01/600/600');
const result = ref<File | null>(null);
const url = computed(() => result.value ? URL.createObjectURL(result.value) : null);
</script>

<template>
  <div>
    <VBtn @click="open = true">Selecionar imagem</VBtn>

    <VImageCropDialog
      v-model="open"
      :url="image"
      @update:file="result = $event"
    />

    <div v-if="result">
      <h3>Resultado</h3>
      <table>
        <tr>
          <td>Nome</td>
          <td>{{ result.name }}</td>
        </tr>
        <tr>
          <td>Tipo</td>
          <td>{{ result.type }}</td>
        </tr>
        <tr>
          <td>Tamanho</td>
          <td>{{ result.size }}</td>
        </tr>
        <tr>
          <td>Preview</td>
          <td>
            <img v-if="url" :src="url">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
