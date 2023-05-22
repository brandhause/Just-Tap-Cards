<template>
  <div
    class="outer-modal"
    :style="{ 'align-items': align }"
    @click.self="clickOutside"
  >
    <div
      class="inner-modal mx-auto"
      :style="{
        width: width + 'px',
        height: height + 'px',
        'border-radius': radius + 'px',
      }"
    >
      <div class="close-modal">
        <span @click="clickOutside">
          <svg width="24" height="24" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        </span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    width: {
      type: [Number, String],
      default: 576,
    },
    height: {
      type: [Number, String],
      default: 379,
    },
    radius: {
      type: [Number, String],
      default: 8,
    },
    align: {
      type: [Number, String],
      default: 'center',
    },
  })

  const emit = defineEmits(['closeModal']);

  function clickOutside() {
    emit('closeModal')
  }
</script>
<style lang="scss">
.outer-modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;

  .inner-modal {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    position: relative;
    z-index: 1002;

    .close-modal {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 16px;
      top: 16px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000000;
        background: #f5f5f5;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
