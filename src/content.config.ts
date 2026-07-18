import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * FANDEX 内容 Collection Schema 定义
 *
 * Astro 7 迁移说明：
 * - 原 src/content/config.ts 已迁移至 src/content.config.ts（Astro 6+ 要求）
 * - type: 'content' 已替换为 glob loader（Astro 6+ 移除 legacy content collections）
 * - glob pattern 同时匹配 .md 与 .mdx 文件
 *
 * Phase 1.5 扩展字段（向后兼容，所有新增字段均 optional 或带 default）：
 * - learningObjectives：学习目标（Bloom 分类法，3-7 条）
 * - exercises：习题（四类题型：填空、选择、代码修正、开放性问题）
 * - references：参考文献（ACM Reference Format）
 * - etymology：词源条目
 * - estimatedReadingTime：预估阅读时长（分钟）
 * - lastReviewed：最后审阅日期
 * - reviewer：审阅人
 *
 * 设计原则：
 * 1. 不破坏现有文档的 schema 校验
 * 2. 使用 z.discriminatedUnion 实现习题多态类型
 * 3. 保留 quiz 字段（向后兼容），exercises 为升级版
 */

// ============================================================
// 共享子 Schema 定义
// ============================================================

/**
 * 参考文献类型枚举
 * 用于 references 字段，标识参考文献的载体形式
 */
const ReferenceTypeSchema = z.enum([
  'book',
  'journal',
  'conference',
  'technical-report',
  'standard',
  'website',
  'documentation',
  'video',
  'course',
]);

/**
 * 参考文献条目 Schema
 * 遵循 ACM Reference Format 的字段划分
 */
const ReferenceSchema = z.object({
  type: ReferenceTypeSchema,
  authors: z.array(z.string()).default([]),
  year: z.number(),
  title: z.string(),
  venue: z.string().default(''),
  volume: z.number().optional(),
  issue: z.number().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
  accessedDate: z.coerce.date().optional(),
  version: z.string().optional(),
});

/**
 * 词源条目 Schema
 * 用于记录计算机术语的英文原词与词源说明
 */
const EtymologyEntrySchema = z.object({
  term: z.string(),
  english: z.string(),
  origin: z.string(),
});

/**
 * 习题类型枚举
 * 覆盖四类题型：填空、选择、代码修正、开放性问题
 */
const ExerciseTypeSchema = z.enum(['fill-blank', 'choice', 'code-fix', 'open-ended']);

/**
 * Bloom 认知层次枚举
 * 用于标注习题对应的学习目标层次
 */
const CognitiveLevelSchema = z.enum([
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
  'create',
]);

/**
 * 基础习题 Schema
 * 所有题型共享的公共字段，通过 type 字段区分子类型
 */
const BaseExerciseSchema = z.object({
  id: z.string(),
  type: ExerciseTypeSchema,
  cognitiveLevel: CognitiveLevelSchema,
  question: z.string(),
  hint: z.string().optional(),
  answer: z.string(),
  explanation: z.string().optional(),
  difficulty: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .default(3),
  estimatedTime: z.number().optional(),
});

/**
 * 填空题 Schema
 * 支持多空、大小写敏感配置
 */
const FillBlankExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('fill-blank'),
  blankCount: z.number(),
  answers: z.array(z.string()),
  caseSensitive: z.boolean().default(false),
});

/**
 * 选择题 Schema
 * 支持单选与多选（multiple=true 时使用 correctIndices）
 */
const ChoiceExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('choice'),
  options: z.array(z.string()),
  correctIndex: z.number(),
  multiple: z.boolean().default(false),
  correctIndices: z.array(z.number()).optional(),
});

/**
 * 代码修正题 Schema
 * 提供有缺陷的代码片段，要求学习者修正
 */
const CodeFixExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('code-fix'),
  buggyCode: z.string(),
  language: z.string(),
  fixedCode: z.string(),
  errorDescription: z.string(),
});

/**
 * 开放性问题 Schema
 * 适用于设计、论述类题目，提供评分关键点
 */
const OpenEndedExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('open-ended'),
  keyPoints: z.array(z.string()),
  minWords: z.number().optional(),
});

/**
 * 习题联合类型
 * 通过 type 字段做判别式联合，保证类型推导的精确性
 */
const ExerciseSchema = z.discriminatedUnion('type', [
  FillBlankExerciseSchema,
  ChoiceExerciseSchema,
  CodeFixExerciseSchema,
  OpenEndedExerciseSchema,
]);

// ============================================================
// docs Collection
// ============================================================

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    // === 现有字段（保持不变，向后兼容） ===
    title: z.string(),
    module: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    order: z.number().default(0),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    author: z.string().default('fanquanpp'),
    description: z.string().optional(),
    readingTime: z.number().optional(),
    related: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    quiz: z
      .array(
        z.union([
          z.object({
            type: z.literal('fill'),
            question: z.string(),
            answer: z.string(),
            hint: z.string().optional(),
          }),
          z.object({
            type: z.literal('choice'),
            question: z.string(),
            options: z.array(z.string()),
            answer: z.number(),
            explanation: z.string().optional(),
          }),
          z.object({
            type: z.literal('fix'),
            question: z.string(),
            code: z.string().optional(),
            answer: z.string(),
            explanation: z.string().optional(),
          }),
        ])
      )
      .default([]),
    // === 新增字段（Phase 1.5） ===
    learningObjectives: z
      .array(z.string())
      .default([])
      .describe('学习目标，遵循 Bloom 分类法，3-7 条'),
    exercises: z.array(ExerciseSchema).default([]).describe('习题列表，覆盖四类题型'),
    references: z
      .array(ReferenceSchema)
      .default([])
      .describe('参考文献列表，遵循 ACM Reference Format'),
    etymology: z
      .array(EtymologyEntrySchema)
      .default([])
      .describe('词源条目，计算机术语的英文原词与词源'),
    estimatedReadingTime: z.number().optional().describe('预估阅读时长（分钟）'),
    lastReviewed: z.coerce.date().optional().describe('最后审阅日期'),
    reviewer: z.string().optional().describe('审阅人'),
  }),
});

// ============================================================
// glossary Collection
// ============================================================

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    module: z.string(),
    updated: z.coerce.date().optional(),
    // 扩展字段
    english: z.string().optional().describe('英文原词'),
    etymology: z.string().optional().describe('词源说明'),
    definition: z.string().optional().describe('术语定义'),
    references: z.array(z.string()).default([]).describe('参考来源 URL 列表'),
    synonyms: z.array(z.string()).default([]).describe('同义词'),
    acronymFor: z.string().optional().describe('缩写展开（如果是缩写）'),
  }),
});

export const collections = { docs, glossary };
