<template>
  <div class="battery-wrapper">
    <div class="battery-top"></div>

    <div class="battery-body">
      <div class="battery-fill"></div>

      <div class="battery-icon">
        <svg viewBox="0 0 24 24">
          <path d="M11 21h-1l1.5-6H9l4-10h1l-1.5 6h2L11 21z" />
        </svg>
      </div>

      <!-- Деления -->
      <div class="battery-divider" style="bottom: 15%;"></div>
      <div class="battery-divider" style="bottom: 30%;"></div>
      <div class="battery-divider" style="bottom: 45%;"></div>
      <div class="battery-divider" style="bottom: 60%;"></div>
      <div class="battery-divider" style="bottom: 75%;"></div>
      <div class="battery-divider" style="bottom: 90%;"></div>
    </div>

    <!-- Стикер -->
    <div class="battery-sticker" v-html="stickerText"></div>
  </div>
</template>

<script setup>
defineProps({
  stickerText: {
    type: String,
    default: '⚡ до <strong>72 годин</strong> без світла'
  }
})
</script>

<style scoped>
.battery-wrapper {
  position: relative;
  width: 80px;
  height: 140px;
  margin: 0 auto;
}

.battery-top {
  position: absolute;
  top: calc(50% - 38px);
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 7px;
  background: #2e7d32;
  border: 2px solid #1b5e20;
  border-radius: 4px;
  z-index: 2;
}

.battery-body {
  width: 50px;
  height: 100px;
  background: #f5f5f5;
  border: 3px solid #1b5e20;
  border-radius: 12px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}

.battery-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  animation: fill-battery 25s ease-in-out infinite;
  z-index: 1;
}

@keyframes fill-battery {
  0% {
    height: 100%;
    background: linear-gradient(to top, #43a047, #a5d6a7);
  }
  25% {
    height: 75%;
    background: linear-gradient(to top, #fdd835, #fff176);
  }
  50% {
    height: 40%;
    background: linear-gradient(to top, #ffb300, #ffca28);
  }
  75% {
    height: 15%;
    background: linear-gradient(to top, #e53935, #ef5350);
  }
  100% {
    height: 100%;
    background: linear-gradient(to top, #43a047, #a5d6a7);
  }
}

.battery-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 48px;
  height: 48px;
}

.battery-icon svg {
  width: 100%;
  height: 100%;
  fill: #ffd700;
  opacity: 0.95;
  animation: flash 2s infinite ease-in-out;
}

@keyframes flash {
  0%, 100% {
    opacity: 0.85;
  }
  50% {
    opacity: 1;
  }
}

.battery-divider {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.15);
  left: 0;
  z-index: 4;
}

/* Стикер */
.battery-sticker {
  position: absolute;
  top: 35px;
  right: -45px;
  transform: rotate(45deg);
  background: #ffeb3b;
  color: #000;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid #fbc02d;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', sans-serif;
  z-index: 5;
  white-space: nowrap;
}
</style>
