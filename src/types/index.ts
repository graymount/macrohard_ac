export interface Article {
  id: string
  title: string
  summary: string
  content?: string
  url: string
  imageUrl?: string
  author?: string
  publishedAt: Date
  source: string
  category: string
  tags: string[]
}

export enum ArticleCategory {
  TECH_NEWS = 'tech_news',
  MUSK_NEWS = 'musk_news', 
  AI_TOOLS = 'ai_tools',
  STARTUP = 'startup',
  INVESTMENT = 'investment',
  DEVELOPER = 'developer'
}

export interface RSSSource {
  id: string
  name: string
  url: string
  category: string
  isActive: boolean
}