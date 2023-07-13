<template>
  <div>
    <div class="crop-container mx-auto" style="max-height: 300px max-width: 300px">
      <img :src="imageUploadFile" ref="imageCrop" alt="" class="d-none">
    </div>
    
    <button @click="close">Close</button>
    <button @click="save">Save</button>
  </div>
</template>

<script setup>
import Cropper from 'cropperjs';

  const emit = defineEmits(['childEvent', 'imageCropped']);
  let imageCrop = ref();
  let cropper = '';
  let croppable = false;
  let croppedImage = ref('');

  const props = defineProps({
    close: Function,
    imageUploadFile: String,
  })

  function save() {
    croppedImage.value = cropper.getCroppedCanvas().toDataURL('image/jpeg');
    emit('imageCropped', croppedImage.value);
  }

  onMounted(async () => {
    const image = imageCrop.value;
    if (image) {
      cropper = new Cropper(image, {
        dragMode: 'move',
        dragCrop: false,
        zoomable: true,
        minContainerWidth: 300,
        minContainerHeight: 300,
        minCropBoxWidth: 300,
        minCropBoxHeight: 300,
        cropBoxMovable: false,
        guides: false,
        center: true,
        checkCrossOrigin: false,
        viewMode: 1,
        autoCropArea: 1,
        restore: false,
        modal: false,
        highlight: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        ready: function () {
          croppable = true;
        },
        crop(event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
        }
      })
    } else {
      console.log('please upload a file');
    }
  })
</script>

<style lang="scss">
  .crop-container {

  }
  .cropper-crop-box {
    background-color: white;
  }
</style>