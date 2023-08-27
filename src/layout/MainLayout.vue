<template>
  <div class="main-layout">
    <h2>Player 1 won</h2>
    <GameBoard />
  </div>
</template>
<script>
import GameBoard from '../components/board/GameBoard.vue'
export default {
  name: 'MainLayout',
  components: {
    GameBoard
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