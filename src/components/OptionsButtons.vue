<template>
  <button class="option-btn" @click="handler('X')">Play as X</button>
  <button class="option-btn" @click="handler('O')">Play as O</button>
</template>

<script>
export default {
  name: 'OptionsButton',
  emits: ['player-selection'],
  methods: {
    handler(playerOption) {
      this.$emit('player-selection',playerOption)
    }
  }
}
</script>

<style>
.option-btn {
  padding: 20px;
  background-color: rgb(112, 112, 216);
  font-family: 'Varela Round';
  border: none;
  border-radius: 10px;
  color: white;
  transition: 200ms ease all;
  cursor: pointer;
  font-size: large;
  box-shadow: rgba(0, 0, 0, 0.37) 0px 4px 6px -1px, rgba(0, 0, 0, 0.301) 0px 2px 4px -1px;
  transform: translateY(-2px);
}

.option-btn:hover {
  background-color: rgb(95, 95, 187);
}

.option-btn:active {
  background-color: rgb(112, 112, 216);
  box-shadow: none;
  transform: translateY(0px);
}
</style>