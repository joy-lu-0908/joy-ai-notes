<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { problemMap } from '../data/problems'

const props = defineProps<{ problemId: string }>()
const problem = computed(() => problemMap[props.problemId])

const code = ref('')
const compareMode = ref(false)
const loaded = ref(false)
const statusMessage = ref('')
const EditorComponent = shallowRef<any>(null)
const DiffComponent = shallowRef<any>(null)
const editorLoadError = ref(false)

const draftKey = computed(() => `joy-notes:draft:${props.problemId}`)
const attemptsKey = computed(() => `joy-notes:attempts:${props.problemId}`)
const lastPracticeKey = computed(() => `joy-notes:last-practice:${props.problemId}`)
const attempts = ref<Array<{ time: string; code: string }>>([])

const editorOptions = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: 'off',
  tabSize: 4,
  insertSpaces: true,
  padding: { top: 14, bottom: 14 }
}

function safeParseAttempts(raw: string | null) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistDraft() {
  if (!loaded.value || typeof window === 'undefined') return
  localStorage.setItem(draftKey.value, code.value)
}

function restoreStarter() {
  compareMode.value = false
  code.value = problem.value.starterCode
  statusMessage.value = '已恢复函数模板。'
}

function clearAll() {
  compareMode.value = false
  code.value = problem.value.blankCode
  statusMessage.value = '编辑器已完全清空。'
}

function saveAttempt() {
  const snapshot = { time: new Date().toISOString(), code: code.value }
  attempts.value = [snapshot, ...attempts.value].slice(0, 10)
  localStorage.setItem(attemptsKey.value, JSON.stringify(attempts.value))
  localStorage.setItem(lastPracticeKey.value, snapshot.time)
  window.dispatchEvent(new CustomEvent('joy-notes-practice-updated', { detail: { problemId: props.problemId } }))
}

function compareSolution() {
  if (typeof window !== 'undefined') saveAttempt()
  compareMode.value = true
  statusMessage.value = '本次答案已保存。左侧是你的答案，右侧是标准答案。'
}

function backToPractice() {
  compareMode.value = false
  statusMessage.value = '已返回练习模式，当前代码不会丢失。'
}

function loadAttempt(item: { time: string; code: string }) {
  compareMode.value = false
  code.value = item.code
  statusMessage.value = `已载入 ${formatTime(item.time)} 的历史答案。`
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
  }).format(d)
}

let saveTimer: ReturnType<typeof setTimeout> | null = null
watch(code, () => {
  if (!loaded.value || typeof window === 'undefined') return
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(persistDraft, 250)
})

onMounted(async () => {
  const saved = localStorage.getItem(draftKey.value)
  code.value = saved ?? problem.value.starterCode
  attempts.value = safeParseAttempts(localStorage.getItem(attemptsKey.value))
  loaded.value = true

  try {
    const mod = await import('monaco-editor-vue3')
    EditorComponent.value = mod.CodeEditor
    DiffComponent.value = mod.DiffEditor
  } catch (err) {
    console.error('Failed to load Monaco editor', err)
    editorLoadError.value = true
  }
})

onBeforeUnmount(() => {
  if (saveTimer) clearTimeout(saveTimer)
  persistDraft()
})
</script>

<template>
  <div v-if="problem" class="practice-shell">
    <div class="practice-head">
      <div class="practice-title">{{ problem.number }}. {{ problem.title }}</div>
      <span class="badge">{{ problem.difficulty }}</span>
      <span v-for="tag in problem.tags" :key="tag" class="badge">{{ tag }}</span>
    </div>

    <div class="practice-body">
      <div class="problem-statement">
        <h3>题目</h3>
        <pre>{{ problem.description }}</pre>
      </div>

      <template v-if="!editorLoadError">
        <div v-if="!compareMode" class="editor-wrap">
          <component
            :is="EditorComponent"
            v-if="EditorComponent"
            v-model:value="code"
            language="python"
            theme="vs"
            :options="editorOptions"
          />
          <div v-else style="padding: 18px">正在加载代码编辑器…</div>
        </div>

        <div v-else class="diff-wrap">
          <component
            :is="DiffComponent"
            v-if="DiffComponent"
            :original="code"
            :modified="problem.solutionCode"
            language="python"
            theme="vs"
            :options="{ ...editorOptions, readOnly: true, renderSideBySide: true }"
          />
          <div v-else style="padding: 18px">正在加载对比视图…</div>
        </div>
      </template>

      <textarea
        v-else
        v-model="code"
        aria-label="代码编辑器备用模式"
        style="width:100%;min-height:420px;padding:14px;font-family:monospace;background:#f3eee7;color:#3f3936;border:1px solid #d4ccc1;border-radius:10px"
      />

      <div class="practice-actions">
        <button v-if="!compareMode" @click="clearAll">完全清空</button>
        <button v-if="!compareMode" @click="restoreStarter">恢复函数模板</button>
        <button v-if="!compareMode" class="primary" @click="compareSolution">完成并对比标准答案</button>
        <button v-else class="primary" @click="backToPractice">返回继续修改</button>
        <button v-if="compareMode" @click="restoreStarter">重新练习</button>
      </div>

      <div v-if="statusMessage" class="practice-note">{{ statusMessage }}</div>
      <div class="practice-note">草稿自动保存在当前浏览器中；点击“完成并对比”时会保存一份历史答案。</div>

      <div v-if="compareMode">
        <h3>核心思路</h3>
        <ul>
          <li v-for="point in problem.keyPoints" :key="point">{{ point }}</li>
        </ul>
        <p><strong>复杂度：</strong>{{ problem.complexity }}</p>
        <h3>面试时怎么讲</h3>
        <p>{{ problem.interviewTalk }}</p>
      </div>

      <div v-if="attempts.length" class="history-box">
        <h3>最近答案</h3>
        <div v-for="item in attempts.slice(0, 5)" :key="item.time" class="history-row">
          <span>{{ formatTime(item.time) }}</span>
          <button @click="loadAttempt(item)">载入这版</button>
        </div>
      </div>
    </div>
  </div>
</template>
