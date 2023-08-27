<template>
  <h3 v-if="loading">Loading</h3>
  <div class="game-board">
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <GameCell v-for="(cell, colIndex) in row" :key="colIndex" :symbol="cell" :row="rowIndex" :col="colIndex"
        @move="handleMove" :showCommandFromParent="command[rowIndex][colIndex]" />
    </template>
  </div>
</template>

<script>
import GameCell from './GameCell.vue'
import findBestMove from '../../game logic/computerMove'
export default {
  name: 'GameBoard',
  components: {
    GameCell
  },
  data() {
    return {
      board: [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
      ],
      command: [
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ],
      loading: false,
      isXTurn: true
    }
  },
  methods: {
    opponentMove() {
      return new Promise((resolve) => {
        // const { bestMove } = findBestMove(this.board);
        // console.log(bestMove)
        // resolve(bestMove)
        findBestMove(this.board).then(({ bestMove }) => resolve(bestMove));
      })
    },
    handleMove(value) {
      const timeout = setTimeout(() => {
        this.loading = true;
      }, 50);
      const { row, col } = value;
      this.board[row][col] = 'X';
      // this.isXTurn = !this.isXTurn;
      console.log(this.board);
      // return;
      setTimeout(() => {
        this.opponentMove()
          .then((bestMove) => {
            console.log(bestMove);
            this.board[bestMove.row][bestMove.col] = 'O';
            this.command[bestMove.row][bestMove.col] = true;
            this.loading = false;
            clearTimeout(timeout)
          })
      }, 50)
      console.log("AFter")
    }
  }
}
</script>

<style>
.game-board {
  width: 500px;
  height: 500px;
  border-radius: 10px;
  /* background-color: aliceblue; */
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; */
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  padding: 13px;
}
</style>