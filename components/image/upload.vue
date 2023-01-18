<template>
	<div>
		<input type="file" id="image-upload" accept="image/*" @change="uploadImage" />
		<div id="image-display"></div>
	</div>
</template>
<script setup>
	const props = defineProps({
		uploadImage: Function,
	})
	</script>
<style>
#image-display {
	width: 375px;
	height: 211px;
	border: 1px solid #000;
	background-size: cover;
	background-position: center;
}
</style>
