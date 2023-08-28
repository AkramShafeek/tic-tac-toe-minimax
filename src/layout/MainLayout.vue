<template>
  <div class="main-layout">
    <h2 v-show="gameStatus != ''">{{ gameStatus }}</h2>
    <OptionsButtons v-if="!showBoard" @player-selection="handlePlayerSelection" />
    <template v-if="showBoard">
      <GameBoard @game-over="handleGameOver" :playerOption="playerOption"/>
    </template>
  </div>
</template>
<script>
import OptionsButtons from '@/components/OptionsButtons.vue'
import GameBoard from '../components/board/GameBoard.vue'
export default {
  name: 'MainLayout',
  data() {
    return {
      gameStatus: '',
      showBoard: false,
      playerOption: '_'
    }
  },
  components: {
    GameBoard,
    OptionsButtons
  },
  methods: {
    handleGameOver(winner) {
      if (winner === 'X')
        this.gameStatus = "Player X won"
      else if (winner === 'O')
        this.gameStatus = "Player O won"
      else if (winner === 'draw')
        this.gameStatus = "Game is a draw"
    },
    handlePlayerSelection(playerOption) {
      this.playerOption = playerOption;
      
      // delaying a bit to provide smooth transition
      setTimeout(() => {
        this.showBoard = true;
      }, 400);
    }
  }
}
</script>

<style>
.main-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  color: rgb(37, 71, 102)
}
</style>