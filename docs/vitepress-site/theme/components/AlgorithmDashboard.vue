<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { problems } from '../data/problems'

const statuses = ['未练习', '熟练', '需复习', '不会'] as const
type Status = typeof statuses[number]

const state = ref<Record<string, { status: Status; lastPractice?: string }>>({})

function statusKey(id: string) { return `joy-notes:status:${id}` }
function lastKey(id: string) { return `joy-notes:last-practice:${id}` }

function refresh() {
  if (typeof window === 'undefined') return
  const next: Record<string, { status: Status; lastPractice?: string }> = {}
  for (const p of problems) {
    const savedStatus = localStorage.getItem(statusKey(p.id)) as Status | null
    next[p.id] = {
      status: savedStatus && statuses.includes(savedStatus) ? savedStatus : '未练习',
      lastPractice: localStorage.getItem(lastKey(p.id)) || undefined
    }
  }
  state.value = next
}

function setStatus(id: string, status: Status) {
  localStorage.setItem(statusKey(id), status)
  refresh()
}

function onStatusChange(id: string, event: Event) {
  const status = (event.target as HTMLSelectElement).value as Status
  setStatus(id, status)
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit' }).format(new Date(iso))
}

const practicedCount = computed(() => Object.values(state.value).filter((x) => x.lastPractice).length)
const fluentCount = computed(() => Object.values(state.value).filter((x) => x.status === '熟练').length)
const reviewCount = computed(() => Object.values(state.value).filter((x) => x.status === '需复习' || x.status === '不会').length)

function onPracticeUpdate() { refresh() }

onMounted(() => {
  refresh()
  window.addEventListener('joy-notes-practice-updated', onPracticeUpdate)
  window.addEventListener('storage', refresh)
})
onBeforeUnmount(() => {
  window.removeEventListener('joy-notes-practice-updated', onPracticeUpdate)
  window.removeEventListener('storage', refresh)
})
</script>

<template>
  <div>
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="dashboard-number">{{ practicedCount }} / {{ problems.length }}</div>
        <div>已练习题目</div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-number">{{ fluentCount }}</div>
        <div>标记为熟练</div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-number">{{ reviewCount }}</div>
        <div>需要重点复习</div>
      </div>
    </div>

    <table class="problem-table">
      <thead>
        <tr>
          <th>题目</th>
          <th>难度</th>
          <th>标签</th>
          <th>状态</th>
          <th>最近练习</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in problems" :key="p.id">
          <td><a :href="withBase(p.href)">{{ p.number }}. {{ p.title }}</a></td>
          <td>{{ p.difficulty }}</td>
          <td>{{ p.tags.join(' / ') }}</td>
          <td>
            <select
              class="dashboard-select"
              :value="state[p.id]?.status || '未练习'"
              @change="onStatusChange(p.id, $event)"
            >
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
          </td>
          <td>{{ formatDate(state[p.id]?.lastPractice) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
