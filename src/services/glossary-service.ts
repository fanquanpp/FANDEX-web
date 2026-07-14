/**
 * 术语表服务模块
 * 封装 glossary Content Collection 的查询和搜索逻辑
 *
 * 设计原则：
 * - 所有 getCollection 调用仅限本模块内部
 * - 所有 async 函数均通过 try-catch 包裹，异常时返回安全默认值
 */
import { getCollection, type CollectionEntry } from 'astro:content';

/** 术语条目类型（从 Content Schema 推导） */
type GlossaryEntry = CollectionEntry<'glossary'>;

/**
 * 获取指定模块的术语表，按标题排序
 * @param moduleId - 模块 ID
 * @returns 按标题 localeCompare 排序后的术语条目数组；异常时返回空数组
 */
export async function getGlossaryByModule(moduleId: string): Promise<GlossaryEntry[]> {
  try {
    const glossary = await getCollection('glossary', ({ data }) => data.module === moduleId);
    return glossary.sort((a, b) => a.data.title.localeCompare(b.data.title));
  } catch {
    return [];
  }
}

/**
 * 获取所有术语条目
 * @returns 按标题排序的全部术语条目数组；异常时返回空数组
 */
export async function getAllGlossaryTerms(): Promise<GlossaryEntry[]> {
  try {
    const glossary = await getCollection('glossary');
    return glossary.sort((a, b) => a.data.title.localeCompare(b.data.title));
  } catch {
    return [];
  }
}

/**
 * 搜索术语条目（按标题模糊匹配，不区分大小写）
 * @param query - 搜索关键词
 * @returns 标题包含关键词的术语条目数组（按标题排序）；异常时返回空数组
 */
export async function searchGlossary(query: string): Promise<GlossaryEntry[]> {
  try {
    const glossary = await getCollection('glossary');
    const lowerQuery = query.toLowerCase();
    return glossary
      .filter(item => item.data.title.toLowerCase().includes(lowerQuery))
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
  } catch {
    return [];
  }
}

export type { GlossaryEntry };
