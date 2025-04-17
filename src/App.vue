<template>
  <main class="max-w-2xl mx-auto p-4">
    <div v-if="quiz.loading">Loading...</div>
    <div v-else-if="quiz.error">{{ quiz.error }}</div>
    <div v-else-if="quiz.isFinished">
      <h2 class="text-2xl font-bold">Quiz Finished!</h2>
      <p>Your score: {{ quiz.score }} / {{ quiz.questions.length }}</p>
      <button @click="restart" class="mt-4 px-4 py-2 bg-green-600 text-white rounded">Try Again</button>
    </div>
    <div v-else-if="quiz.questions.length">
      <Question :question="quiz.currentQuestion" />
    </div>
    <div v-else>
      <button @click="start" class="px-4 py-2 bg-blue-600 text-white rounded">Start Quiz</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuizStore } from './stores/quizStore'
import Question from './components/Question.vue'

const quiz = useQuizStore()

function start() {
  quiz.fetchQuestions()
}

function restart() {
  quiz.restart()
  quiz.fetchQuestions()
}
</script>

