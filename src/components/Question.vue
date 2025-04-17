<template>
  <div>
    <h2 class="text-lg font-bold mb-4" v-html="question.question" />
    <div v-for="option in question.options" :key="option" class="mb-2">
      <button @click="select(option)" class="px-4 py-2 bg-blue-500 text-white rounded">
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '../stores/quizStore'
import { useQuizStore } from '../stores/quizStore'

const props = defineProps<{ question: Question }>()
const store = useQuizStore()

function select(option: string) {
  store.answer(option)
}
</script>

  