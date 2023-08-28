<template>
  <div class="game-cell hide-cell" v-on:click="handler" :class="{
    'show-cell': isShowCell
  }">
    <h1 class="game-symbol-x hide-symbol" :class="{
      'show-symbol': symbol != '_',
      'color-pink': symbol === 'X',
      'color-white': symbol === 'O',
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
  flex: 1 0 28%;
  border-radius: 10px;
  background-color: #ebebeb3f;
  box-shadow: #9c2f3d 0px 4px 6px -1px, #a72f3f 0px 2px 4px -1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 120ms all ease;
  border: 3px solid transparent;
  aspect-ratio: 1 / 1;
}

.color-pink {
  color: hsl(49, 100%, 54%)
}

.color-white {
  color: #ffffff
}

/* .game-cell:hover {
  background-color: #433d6b;
  border: 3px solid rgb(148, 118, 161);
  box-shadow: #514981 0px 4px 6px -1px, #4f458f 0px 2px 4px -1px;
} */

.game-cell:active {
  background-color: #ebebeb1e;
}

.game-symbol-x {
  font-weight: bolder;
  /* color: rgb(64, 110, 160) */
}

.hide-symbol {
  scale: 0;
  opacity: 0;
  transition: 100ms all ease;
}

.hide-cell {
  scale: 0;
  opacity: 0;
  transition: 200ms all ease;
}

.show-symbol {
  opacity: 1;
  scale: 1.4;
}

.show-cell {
  opacity: 1;
  scale: 1;
}

.game-symbol-o {
  color: rgb(87, 88, 153)
}

@media screen and (max-width: 600px) {
  .game-cell {
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.322) 0px 2px 4px -1px, rgba(0, 0, 0, 0.267) 0px 1px 3px -1px;
  }

  .show-symbol {
    opacity: 1;
    scale: 1;
  }
}
</style>