<template>
	<div>
		<div class="text-center">
			<div id="image-display" class="mb-4"></div>
			<input type="file" class="mb-4" id="image-upload" accept="image/*" @change="uploadImage" />
		</div>
	</div>
</template>
<script setup>
	const props = defineProps({
		uploadImage: Function,
	})
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
</style>
