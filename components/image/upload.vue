<template>
	<div>
		<div class="text-center">
			<div id="image-display" class="mb-4"></div>
			<input type="file" class="mb-4" id="image-upload" accept="image/*" @change="uploadImage" />
			<img class="mb-5 d-none" ref="cropper" src="https://picsum.photos/600">
			<button @click="cropImage">Crop</button>
		</div>
	</div>
</template>
<script setup>
import Cropper from 'cropperjs'

	let cropper = ref();
	const props = defineProps({
		uploadImage: Function,
	})

	onMounted(() => {
		const image = cropper.value
		cropper = new Cropper(image, {
		dragMode: 'move',
		zoomable: true,
		minContainerWidth: 275,
		minContainerHeight: 375,
		minCropBoxWidth: 275,
		minCropBoxHeight: 375,
		cropBoxMovable: false,
		guides: false,
		center: true,
		crop(event) {
			console.log(event.detail.x)
			console.log(event.detail.y)
			console.log(event.detail.width)
			console.log(event.detail.height)

			centerCropBox();
		}
		})
	});

	function centerCropBox() {
		console.log("test");
    }

	async function cropImage() {
		const canvas = cropper.getCroppedCanvas();
      	const dataUrl = canvas.toDataURL('image/jpeg')
      	console.log(dataUrl)
	}
</script>
<style>
#image-display {
	width: 100%;
	height: 211px;
	border: 1px solid #000;
	background-size: cover;
	background-position: center;
}

#image-upload {
	width: 210px;
}

.cropper-hidden {
    display: none !important;
}

</style>
