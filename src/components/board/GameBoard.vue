<template>
  <h3 v-if="loading">Loading</h3>
  <div class="game-board">
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <GameCell v-for="(cell, colIndex) in row" :key="colIndex" :symbol="cell" :row="rowIndex" :col="colIndex"
        @move="handleMove" :transitionDelay="(rowIndex * 3 + colIndex) * 100" />
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
  props: {
    playerOption: {
      type: String,
      default: "X"
    }
  },
  data() {
    return {
      board: [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
      ],
      isGameOver: false,
      winner: '_',
      loading: false,
      isXTurn: true
    }
  },
  emits: ['game-over'],
  methods: {
    opponentMove(player) {
      return new Promise((resolve, reject) => {

        // creating a local board for calculating the next move
        const localBoard = [];
        for (let row of this.board) {
          const localRow = [];
          for (let cell of row) {
            localRow.push(cell);
          }
          localBoard.push(localRow)
        }

        const move = findBestMove(localBoard, player);
        const { score, bestMove, isGameOver } = move;

        if (isGameOver)
          reject({ score, bestMove });
        else
          resolve(bestMove);
      })
    },
    handleMove(value) {
      const { row, col } = value;

      // if clicked on already played cell
      if (this.board[row][col] != '_')
        return;

      // player's move
      this.board[row][col] = this.playerOption;

      // delaying for 50ms to avoid blocking of response
      setTimeout(() => {
        this.opponentMove(this.playerOption === 'X' ? 'O' : 'X')
          .then((bestMove) => {
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.playerOption === 'X' ? 'O' : 'X';
          })
          .catch(({ score, bestMove }) => {
            console.log("game over")
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.playerOption === 'X' ? 'O' : 'X';
            this.isGameOver = true;
            this.winner = score > 0 ? 'X' : (score < 0 ? 'O' : 'draw');
            this.$emit('game-over', this.winner)
          })
      }, 50);

    }
  },
  mounted() {
    if (this.playerOption == 'O') {
      // after a small delay make the first move as X
      setTimeout(() => {
        this.opponentMove('X')
          .then((bestMove) => {
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = 'X';
          })
          .catch(({ score, bestMove }) => {
            console.log("game over")
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = 'X';
            this.isGameOver = true;
            this.winner = score > 0 ? 'X' : (score < 0 ? 'O' : 'draw');
            this.$emit('game-over', this.winner)
          })
      }, 1000);
    }
  },
}
</script>

<style>
.game-board {
  width: 500px;
  height: 500px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  padding: 13px;
}
</style>