<template>
  <div class="game-cell hide-cell" v-on:click="handler" :class="{
    'show-cell': isShowCell
  }">
    <h1 class="game-symbol-x hide-symbol" :class="{
      'show-symbol': symbol != '_',
    }">{{ symbol }}</h1>
  </div>
</template>

<script>
export default {
  name: 'GameCell',
  data() {
    return {
      isShowCell: false
    }
  },
  props: {
    symbol: {
      type: String,
      default: 'X'
    },
    transitionDelay: {
      type: Number,
      default: 0
    },
    row: Number,
    col: Number,
  },
  methods: {
    handler() {
      this.$emit('move', { row: this.row, col: this.col });
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShowCell = true;
    }, Math.round(this.transitionDelay))
  }
}
</script>

<style>
.game-cell {
  flex: 1 0 30%;
  border-radius: 10px;
  background-color: aliceblue;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 120ms all ease;
}

.game-cell:hover {
  background-color: rgb(217, 229, 240);
}

.game-cell:active {
  background-color: rgb(225, 235, 243);
}

.game-symbol-x {
  font-weight: bolder;
  color: rgb(64, 110, 160)
}

.hide-symbol {
  scale: 0;
  opacity: 0;
  transition: 100ms all ease;
}

.hide-cell {
  scale: 0;
  transition: 200ms all ease;
}

.show-symbol {
  opacity: 1;
  scale: 1;
}

.show-cell {
  scale: 1;
}

.game-symbol-o {
  color: rgb(87, 88, 153)
}
</style>