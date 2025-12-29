# V-Image-Crop-Dialog

Um componente Vue 3 dialog para recorte de imagens, construído com Vuetify 3 e TypeScript. Baseado em `vue-advanced-cropper` para uma experiência de recorte poderosa e intuitiva.

## ✨ Características

- 🎨 Integração completa com **Vuetify 3**
- 🔄 Suporte para recorte **retangular** e **circular**
- 🖼️ Suporte para imagens via **File** ou **URL**
- 🔧 Controles avançados: rotação, espelhamento, zoom e reset
- 📐 Aspect ratio personalizável
- 🎯 Dimensões de saída configuráveis
- 💾 Exportação automática em formato WebP
- 📱 Totalmente responsivo
- 🎭 TypeScript support

## 📋 Requisitos

- Vue 3.5+
- Vuetify 3.11+

## 📦 Instalação

```bash
npm install @cesarvieira/v-image-crop-dialog
```

## 🚀 Uso Básico

### 1. Registrar o componente (opcional)

Se você estiver usando o plugin como um módulo:

```typescript
import { createApp } from 'vue';
import VImageCropDialog from '@cesarvieira/v-image-crop-dialog';

const app = createApp(App);
app.use(VImageCropDialog);
```

Ou registre o componente diretamente:

```vue
<script setup lang="ts">
import { VImageCropDialog } from '@cesarvieira/v-image-crop-dialog';
import '@cesarvieira/v-image-crop-dialog/dist/v-image-crop-dialog.css';
</script>
```

### 2. Uso no template

```vue
<template>
  <div>
    <VBtn @click="open = true">Abrir Recortador</VBtn>
    
    <VImageCropDialog
      v-model="open"
      :url="imageUrl"
      @update:file="handleCroppedImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VImageCropDialog } from '@cesarvieira/v-image-crop-dialog';

const open = ref(false);
const imageUrl = ref('https://example.com/image.jpg');

const handleCroppedImage = (file: File) => {
  console.log('Imagem recortada:', file);
  // Faça upload ou processe o arquivo aqui
};
</script>
```

## 📖 Exemplos Avançados

### Recorte com arquivo (File)

```vue
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
  console.log('Imagem recortada:', file);
};
</script>
```

### Recorte circular com proporção fixa

```vue
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

### Recorte com dimensões personalizadas

```vue
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

### Dialog persistente com largura máxima

```vue
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

## 🔧 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `boolean` | `false` | Controla a visibilidade do dialog |
| `file` | `File \| null` | `null` | Arquivo de imagem a ser recortado |
| `url` | `string \| null` | `null` | URL da imagem a ser recortada |
| `stencil` | `'rect' \| 'circle'` | `'rect'` | Tipo de molde para recorte |
| `imgWidth` | `number` | `undefined` | Largura da imagem de saída (em pixels) |
| `imgHeight` | `number` | `undefined` | Altura da imagem de saída (em pixels) |
| `aspectRatio` | `number` | `undefined` | Proporção de aspecto do recorte (ex: 16/9, 1) |
| `persistent` | `boolean` | `false` | Se verdadeiro, o dialog não pode ser fechado clicando fora |
| `maxWidth` | `string \| number` | `'auto'` | Largura máxima do dialog |

## 📤 Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `update:modelValue` | `boolean` | Emitido quando o estado de visibilidade muda |
| `update:file` | `File` | Emitido quando a imagem é recortada, retorna o arquivo WebP |

## 🎯 Slots

| Slot | Props | Descrição |
|------|-------|-----------|
| `activator` | `activatorProps` | Slot para o elemento que ativa o dialog |

### Exemplo com slot activator

```vue
<template>
  <VImageCropDialog v-model="open" :url="imageUrl">
    <template #activator="{ props: activatorProps }">
      <VBtn v-bind="activatorProps" color="primary">
        Recortar Imagem
      </VBtn>
    </template>
  </VImageCropDialog>
</template>
```

## 🎮 Controles do Recortador

O componente inclui controles integrados para:

- 🔄 **Rotação**: Rotacionar imagem 90° para esquerda ou direita
- 🪞 **Espelhamento**: Inverter imagem horizontal ou verticalmente
- 🔍 **Zoom**: Ampliar ou reduzir a imagem
- 🔃 **Reset**: Restaurar imagem ao estado original

## 📝 Notas

- A imagem recortada é sempre exportada no formato **WebP**
- Se `imgWidth` e `imgHeight` não forem especificados, a imagem manterá suas dimensões originais
- O componente requer que `file` ou `url` seja fornecido para funcionar
- Certifique-se de que o Vuetify está configurado corretamente no seu projeto

## 📄 Licença

ISC

## 👤 Autor

Cesar Vieira
