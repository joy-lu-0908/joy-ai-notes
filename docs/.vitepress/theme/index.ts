import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PracticeProblem from './components/PracticeProblem.vue'
import AlgorithmDashboard from './components/AlgorithmDashboard.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PracticeProblem', PracticeProblem)
    app.component('AlgorithmDashboard', AlgorithmDashboard)
  }
} satisfies Theme
