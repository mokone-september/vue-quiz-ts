import { defineStore } from 'pinia'

export interface Question {
  question: string
  correct_answer: string
  incorrect_answers: string[]
  options: string[]
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [] as Question[],
    currentIndex: 0,
    score: 0,
    loading: false,
    error: null as string | null
  }),
  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    isFinished: (state) => state.currentIndex >= state.questions.length
  },
  actions: {
    async fetchQuestions(amount = 10) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`)
        const data = await res.json()
        this.questions = data.results.map((q: any) => ({
          ...q,
          options: shuffle([...q.incorrect_answers, q.correct_answer])
        }))
        this.currentIndex = 0
        this.score = 0
      } catch (err) {
        this.error = 'Failed to load questions.'
      } finally {
        this.loading = false
      }
    },
    answer(selected: string) {
      if (selected === this.currentQuestion.correct_answer) {
        this.score++
      }
      this.currentIndex++
    },
    restart() {
      this.questions = []
      this.currentIndex = 0
      this.score = 0
    }
  }
})

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5)
}
