<template>
  <div>
    <form @submit.prevent="edit(user)">
			<div class="crop-container mx-auto" style="max-height: 300px max-width: 300px">
				<img class="mb-5" ref="cropper" src="https://picsum.photos/200">
			</div>
			<button @click="cropImage">Crop</button>
      <div>
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" name="first-name" class="form-control mb-3" v-model="user.fname" />
      </div>
      <div>
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" name="last-name" class="form-control mb-3" v-model="user.lname" />
      </div>
      <div>
        <label for="job-title">Job title:</label>
        <input type="text" id="job-title" name="job-title" class="form-control mb-3" v-model="user.jobTitle" />
      </div>
      <div>
        <label for="company">Company:</label>
        <input type="text" id="company" name="company" class="form-control mb-3" v-model="user.company" />
      </div>
      <div>
        <label for="category-work">Industry or Category of work:</label>
        <input type="text" id="category-work" name="category-work" class="form-control mb-3" v-model="user.categoryOfWork" />
      </div>
      <button class="save-btn" type="submit" @click="hideSave">Save</button>
    </form>
  </div>
</template>
<script setup>
import Cropper from 'cropperjs';

  const props = defineProps({
    edit: Function,
    currentUser: [Array, Object],
  });

  const user = ref({});
  let cropper = ref();

	function getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
  }

  function cropImage() {
		const canvas = cropper.getCroppedCanvas();
		const roundedCanvas = getRoundedCanvas(canvas);

      	const dataUrl = roundedCanvas.toDataURL('image/jpeg')
      	console.log(dataUrl)
	}

  const fullName = computed(() => {
    if (!props.currentUser && !props.currentUser.displayName) return [];
    return props.currentUser.displayName.split(' ');
  })

  function uploadImage(e) {
		user.value.file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			document.querySelector('#image-display').style.backgroundImage = `url(${reader.result})`
		};
		reader.readAsDataURL(user.value.file);
	}

  onMounted(() => {
    user.value = {
      fname: fullName.value[0],
      lname: fullName.value[1],
      jobTitle: props.currentUser.jobTitle,
      company: props.currentUser.company,
      categoryOfWork: props.currentUser.industryOrCategoryOfWork,
      getImageUrl: props.currentUser.profileImage
    };

    const image = cropper.value
		let croppable = false;
		cropper = new Cropper(image, {
			dragMode: 'move',
			zoomable: true,
			minContainerWidth: 300,
			minContainerHeight: 300,
			minCropBoxWidth: 300,
			minCropBoxHeight: 300,
			cropBoxMovable: false,
			guides: false,
			center: true,
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
  });
  
</script>
<style>
.crop-container {
	max-width: 300px;
	max-height: 300px;
}
.cropper-hidden {
    display: none !important;
}
</style>
