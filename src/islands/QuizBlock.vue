<!--
  知识检测组件
  支持三种题型：填空题(fill)、选择题(choice)、代码修正题(fix)
  提交后显示对错反馈、参考答案和解析
-->
<template>
  <div class="quiz-block" v-if="quiz.length > 0">
    <h3 class="quiz-title">知识检测</h3>
    <div class="quiz-list">
      <div v-for="(q, i) in quiz" :key="i" class="quiz-item" :class="getResultClass(i)">
        <!-- 题目：序号 + 类型标签 + 题目文字 -->
        <div class="quiz-question">
          <span class="quiz-number">{{ i + 1 }}</span>
          <span class="quiz-type-badge">{{ typeLabel(q.type) }}</span>
          {{ q.question }}
        </div>

        <!-- 填空题输入区 -->
        <div v-if="q.type === 'fill'" class="quiz-answer-area">
          <input
            v-model="answers[i]"
            class="quiz-input"
            placeholder="输入答案..."
            :disabled="submitted[i]"
            @keyup.enter="submitAnswer(i)"
          />
          <button v-if="!submitted[i]" class="quiz-submit-btn" @click="submitAnswer(i)">
            提交
          </button>
        </div>

        <!-- 选择题选项区 -->
        <div v-if="q.type === 'choice'" class="quiz-options">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="quiz-option"
            :class="{
              selected: selectedOption[i] === oi,
              correct: submitted[i] && oi === q.answer,
              wrong: submitted[i] && selectedOption[i] === oi && oi !== q.answer,
            }"
            :disabled="submitted[i]"
            @click="selectOption(i, oi)"
          >
            <!-- 选项字母标识 A/B/C/D -->
            <span class="option-letter">{{ String.fromCharCode(65 + oi) }}</span>
            {{ opt }}
          </button>
        </div>

        <!-- 代码修正题输入区 -->
        <div v-if="q.type === 'fix'" class="quiz-answer-area">
          <pre v-if="q.code" class="quiz-code">{{ q.code }}</pre>
          <textarea
            v-model="answers[i]"
            class="quiz-textarea"
            placeholder="输入修正后的代码或说明..."
            :disabled="submitted[i]"
            rows="2"
          ></textarea>
          <button v-if="!submitted[i]" class="quiz-submit-btn" @click="submitAnswer(i)">
            提交
          </button>
        </div>

        <!-- 提交后的反馈区域 -->
        <div v-if="submitted[i]" class="quiz-feedback">
          <span v-if="results[i] === true" class="feedback-correct">正确</span>
          <span v-else class="feedback-wrong">不正确</span>
          <!-- 填空题和修正题显示参考答案 -->
          <span v-if="q.type === 'fill'" class="feedback-answer">参考答案: {{ q.answer }}</span>
          <span v-if="q.type === 'fix'" class="feedback-answer">参考答案: {{ q.answer }}</span>
          <!-- 解析说明 -->
          <span v-if="q.explanation" class="feedback-explanation">{{ q.explanation }}</span>
          <!-- 答错时显示提示 -->
          <span v-if="q.hint && results[i] !== true" class="feedback-hint">提示: {{ q.hint }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// ========== 题目类型定义 ==========

/** 填空题 */
interface FillQ {
  type: 'fill';
  question: string;
  answer: string;
  hint?: string;
}
/** 选择题 */
interface ChoiceQ {
  type: 'choice';
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}
/** 代码修正题 */
interface FixQ {
  type: 'fix';
  question: string;
  code?: string;
  answer: string;
  explanation?: string;
}
type QuizItem = FillQ | ChoiceQ | FixQ;

const props = defineProps<{
  quiz: QuizItem[];
}>();

// ========== 响应式状态 ==========

/** 用户输入的答案（填空题/修正题） */
const answers = reactive<Record<number, string>>({});
/** 选择题选中的选项索引 */
const selectedOption = reactive<Record<number, number>>({});
/** 是否已提交 */
const submitted = reactive<Record<number, boolean>>({});
/** 判题结果：true=正确, false=错误, null=无法自动判断（修正题） */
const results = reactive<Record<number, boolean | null>>({});

// ========== 方法 ==========

/** 获取题目类型的中文标签 */
function typeLabel(type: string) {
  const map: Record<string, string> = { fill: '填空', choice: '选择', fix: '修正' };
  return map[type] || type;
}

/** 选择题：选中选项后立即提交 */
function selectOption(qi: number, oi: number) {
  selectedOption[qi] = oi;
  submitAnswer(qi);
}

/** 提交答案并判题 */
function submitAnswer(qi: number) {
  submitted[qi] = true;
  const q = props.quiz[qi];
  if (q.type === 'fill') {
    // 填空题：忽略大小写比较
    const userAns = (answers[qi] || '').trim().toLowerCase();
    const correctAns = q.answer.trim().toLowerCase();
    results[qi] = userAns === correctAns;
  } else if (q.type === 'choice') {
    // 选择题：比较选项索引
    results[qi] = selectedOption[qi] === q.answer;
  } else {
    // 修正题：无法自动判断
    results[qi] = null;
  }
}

/** 根据判题结果返回对应的 CSS 类名 */
function getResultClass(i: number) {
  if (!submitted[i]) return '';
  if (results[i] === true) return 'result-correct';
  if (results[i] === false) return 'result-wrong';
  return 'result-neutral';
}
</script>

<style scoped>
/* 测验区域整体样式 */
.quiz-block {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.quiz-title {
  font-family: var(--font-display);
  font-size: 1.1em;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.quiz-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* 单个题目卡片 */
.quiz-item {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-card);
}

/* 答对/答错时的边框颜色 */
.quiz-item.result-correct {
  border-color: #10b981;
}

.quiz-item.result-wrong {
  border-color: #ef4444;
}

/* 题目文字 */
.quiz-question {
  font-size: 0.92em;
  margin-bottom: var(--spacing-sm);
  line-height: 1.6;
}

/* 题号圆圈 */
.quiz-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75em;
  font-weight: 700;
  margin-right: 6px;
  flex-shrink: 0;
}

/* 题型标签 */
.quiz-type-badge {
  display: inline-block;
  padding: 1px 6px;
  background: var(--color-bg-hover);
  font-size: 0.75em;
  color: var(--color-text-secondary);
  margin-right: 6px;
}

/* 答案输入区域 */
.quiz-answer-area {
  display: flex;
  gap: var(--spacing-sm);
  align-items: flex-start;
  margin-top: var(--spacing-sm);
}

/* 填空输入框 */
.quiz-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.88em;
  font-family: var(--font-display);
  outline: none;
}

.quiz-input:focus {
  border-color: var(--color-primary);
}

/* 修正题文本域 */
.quiz-textarea {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.85em;
  font-family: var(--font-mono, monospace);
  outline: none;
  resize: vertical;
}

.quiz-textarea:focus {
  border-color: var(--color-primary);
}

/* 修正题代码展示区 */
.quiz-code {
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  font-size: 0.82em;
  margin-bottom: var(--spacing-xs);
  overflow-x: auto;
}

/* 提交按钮 */
.quiz-submit-btn {
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.85em;
  cursor: pointer;
  white-space: nowrap;
}

.quiz-submit-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* 选择题选项列表 */
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: var(--spacing-sm);
}

/* 单个选项按钮 */
.quiz-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 6px 10px;
  border: 1px solid var(--color-border-light);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.88em;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.quiz-option:hover:not(:disabled) {
  border-color: var(--color-primary);
}

/* 选中状态 */
.quiz-option.selected {
  border-color: var(--color-primary);
  background: var(--color-bg-hover);
}

/* 正确选项高亮 */
.quiz-option.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}

/* 错误选项高亮 */
.quiz-option.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}

/* 选项字母标识 */
.option-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-border);
  font-size: 0.78em;
  font-weight: 600;
  flex-shrink: 0;
}

/* 反馈区域 */
.quiz-feedback {
  margin-top: var(--spacing-sm);
  font-size: 0.85em;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: baseline;
}

.feedback-correct {
  color: #10b981;
  font-weight: 600;
}

.feedback-wrong {
  color: #ef4444;
  font-weight: 600;
}

.feedback-answer {
  color: var(--color-text-secondary);
}

.feedback-explanation {
  color: var(--color-text-secondary);
}

/* 提示文字：答错时显示 */
.feedback-hint {
  color: #f59e0b;
}
</style>
