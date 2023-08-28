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
      opponent: '',
      player: '',
      isGameOver: false,
      winner: '_',
      loading: false,
      isXTurn: true
    }
  },
  emits: ['game-over'],
  methods: {
    opponentMove(opponentSymbol) {
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

        const move = findBestMove(localBoard, opponentSymbol);
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
      if (this.board[row][col] != '_' || this.isGameOver)
        return;

      // player's move
      this.board[row][col] = this.player;

      // delaying for 50ms to avoid blocking of response
      setTimeout(() => {
        this.opponentMove(this.opponent)
          .then((bestMove) => {
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.opponent;
          })
          .catch(({ score, bestMove }) => {
            console.log("game over")
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.opponent;
            this.isGameOver = true;
            this.winner = score > 0 ? 'X' : (score < 0 ? 'O' : 'draw');
            this.$emit('game-over', this.winner)
          })
      }, 50);

    }
  },
  mounted() {
    if (this.playerOption == 'O') {
      this.opponent = 'X';
      this.player = 'O'
      // after a small delay make the first move as X
      setTimeout(() => {
        this.opponentMove(this.opponent)
          .then((bestMove) => {
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.opponent;
          })
          .catch(({ score, bestMove }) => {
            console.log("game over")
            if (bestMove.row !== -1 && bestMove.col !== -1)
              this.board[bestMove.row][bestMove.col] = this.opponent;
            this.isGameOver = true;
            this.winner = score > 0 ? 'X' : (score < 0 ? 'O' : 'draw');
            this.$emit('game-over', this.winner)
          })
      }, 1000);
    }
    else {
      this.opponent = 'O';
      this.player = 'X'
    }
  },
}
</script>

<style>
.game-board {
  width: 500px;
  /* height: 500px; */
  width: 33%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  padding: 13px;  
}

@media screen and (max-width: 600px) {
  .game-board {
    width: 90%;
    gap: 9px;
    height: fit-content;
  }
}
</style>