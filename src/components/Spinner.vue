<template>
  <transition>
    <svg class="spinner" :class="{ show }" v-show="show" :height="diameter + 'px'" :width="diameter + 'px'" :viewbox="`0 0 ${diameter} ${diameter}`">
      <circle class="path" fill="none" stroke-width="2" stroke-linecap="round" :cx="diameter / 2" :cy="diameter / 2" :r="diameter / 2 - 4" />
    </svg>
  </transition>
</template>

<script>
export default {
  name: "spinner",
  props: ["show", "size"],
  computed: {
    diameter() {
      switch (this.size) {
        case "large":
          return 88;
        case "small":
          return 22;
        case "medium":
        default:
          return 44;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$dasharray: 122;

.spinner {
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke: darken(#42b983, 0.5);
  stroke-dasharray: $dasharray;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: $dasharray;
  }

  50% {
    stroke-dashoffset: $dasharray / 2;
    transform: rotate(140deg);
  }

  100% {
    stroke-dashoffset: $dasharray;
    transform: rotate(450deg);
  }
}
</style>
