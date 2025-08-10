'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Type, 
  Hash, 
  Clock, 
  BarChart3, 
  Copy,
  Trash2,
  Download,
  Upload
} from 'lucide-react'

interface TextStatistics {
  words: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  readingTime: string
  speakingTime: string
  averageWordLength: number
  longestWord: string
  mostCommonWords: Array<{ word: string; count: number }>
  lexicalDiversity: number
  syllables: number
  fleschReadingEase: number
  fleschKincaidGrade: number
}

export default function WordCounterProPage() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<TextStatistics>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min',
    speakingTime: '0 min',
    averageWordLength: 0,
    longestWord: '',
    mostCommonWords: [],
    lexicalDiversity: 0,
    syllables: 0,
    fleschReadingEase: 0,
    fleschKincaidGrade: 0
  })

  // Count syllables in a word (approximation)
  const countSyllables = (word: string): number => {
    word = word.toLowerCase()
    let count = 0
    let previousWasVowel = false
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = 'aeiou'.includes(word[i])
      if (isVowel && !previousWasVowel) {
        count++
      }
      previousWasVowel = isVowel
    }
    
    // Adjust for silent e
    if (word.endsWith('e') && count > 1) {
      count--
    }
    
    // Ensure at least 1 syllable for any word
    return Math.max(1, count)
  }

  // Calculate Flesch Reading Ease
  const calculateFleschReadingEase = (words: number, sentences: number, syllables: number): number => {
    if (words === 0 || sentences === 0) return 0
    return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  }

  // Calculate Flesch-Kincaid Grade Level
  const calculateFleschKincaidGrade = (words: number, sentences: number, syllables: number): number => {
    if (words === 0 || sentences === 0) return 0
    return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  }

  useEffect(() => {
    if (!text) {
      setStats({
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: '0 min',
        speakingTime: '0 min',
        averageWordLength: 0,
        longestWord: '',
        mostCommonWords: [],
        lexicalDiversity: 0,
        syllables: 0,
        fleschReadingEase: 0,
        fleschKincaidGrade: 0
      })
      return
    }

    // Basic counts
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    
    // Word count and analysis
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const wordCount = words.length
    
    // Sentence count (basic)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    
    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length
    
    // Reading and speaking time (avg 200 words/min reading, 150 words/min speaking)
    const readingMinutes = Math.ceil(wordCount / 200)
    const speakingMinutes = Math.ceil(wordCount / 150)
    const readingTime = readingMinutes === 1 ? '1 min' : `${readingMinutes} min`
    const speakingTime = speakingMinutes === 1 ? '1 min' : `${speakingMinutes} min`
    
    // Average word length
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0)
    const averageWordLength = wordCount > 0 ? Number((totalWordLength / wordCount).toFixed(1)) : 0
    
    // Longest word
    const longestWord = words.reduce((longest, word) => 
      word.length > longest.length ? word : longest, ''
    )
    
    // Word frequency analysis
    const wordFrequency: { [key: string]: number } = {}
    const cleanWords = words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    cleanWords.forEach(word => {
      if (word && word.length > 2) { // Ignore very short words
        wordFrequency[word] = (wordFrequency[word] || 0) + 1
      }
    })
    
    const mostCommonWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))
    
    // Lexical diversity (unique words / total words)
    const uniqueWords = new Set(cleanWords.filter(w => w.length > 0))
    const lexicalDiversity = wordCount > 0 
      ? Number(((uniqueWords.size / wordCount) * 100).toFixed(1))
      : 0
    
    // Count syllables
    const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0)
    
    // Readability scores
    const fleschReadingEase = calculateFleschReadingEase(wordCount, sentences, totalSyllables)
    const fleschKincaidGrade = calculateFleschKincaidGrade(wordCount, sentences, totalSyllables)

    setStats({
      words: wordCount,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      averageWordLength,
      longestWord,
      mostCommonWords,
      lexicalDiversity,
      syllables: totalSyllables,
      fleschReadingEase: Number(fleschReadingEase.toFixed(1)),
      fleschKincaidGrade: Number(fleschKincaidGrade.toFixed(1))
    })
  }, [text])

  const clearText = () => setText('')

  const copyText = () => {
    navigator.clipboard.writeText(text)
  }

  const exportStats = () => {
    const statsText = `Text Analysis Report
===================
Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ${stats.readingTime}
Speaking Time: ${stats.speakingTime}
Average Word Length: ${stats.averageWordLength}
Longest Word: ${stats.longestWord}
Lexical Diversity: ${stats.lexicalDiversity}%
Syllables: ${stats.syllables}
Flesch Reading Ease: ${stats.fleschReadingEase}
Flesch-Kincaid Grade: ${stats.fleschKincaidGrade}

Most Common Words:
${stats.mostCommonWords.map(w => `- ${w.word}: ${w.count}`).join('\n')}
`
    const blob = new Blob([statsText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-analysis.txt'
    a.click()
  }

  const getReadabilityLevel = (score: number): { level: string; color: string } => {
    if (score >= 90) return { level: 'Very Easy', color: 'text-green-600' }
    if (score >= 80) return { level: 'Easy', color: 'text-green-500' }
    if (score >= 70) return { level: 'Fairly Easy', color: 'text-blue-600' }
    if (score >= 60) return { level: 'Standard', color: 'text-blue-500' }
    if (score >= 50) return { level: 'Fairly Difficult', color: 'text-yellow-600' }
    if (score >= 30) return { level: 'Difficult', color: 'text-orange-600' }
    return { level: 'Very Difficult', color: 'text-red-600' }
  }

  const getGradeLevel = (grade: number): string => {
    if (grade < 1) return 'Pre-K'
    if (grade <= 12) return `Grade ${Math.round(grade)}`
    if (grade <= 16) return 'College'
    return 'Graduate'
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Word Counter Pro</h1>
        <p className="text-xl text-muted-foreground">
          Advanced text analysis with readability scores, word frequency, and detailed statistics
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
              <CardDescription>Paste or type your text for instant analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] font-sans"
              />
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={copyText}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={clearText}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear
                </Button>
                <Button variant="outline" size="sm" onClick={exportStats}>
                  <Download className="h-4 w-4 mr-2" /> Export Stats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Sidebar */}
        <div className="space-y-4">
          {/* Basic Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Words</span>
                </div>
                <span className="font-semibold">{stats.words}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Characters</span>
                </div>
                <span className="font-semibold">{stats.characters}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">No Spaces</span>
                </div>
                <span className="font-semibold">{stats.charactersNoSpaces}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Sentences</span>
                </div>
                <span className="font-semibold">{stats.sentences}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Paragraphs</span>
                </div>
                <span className="font-semibold">{stats.paragraphs}</span>
              </div>
            </CardContent>
          </Card>

          {/* Time Estimates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Estimates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Reading Time</span>
                </div>
                <span className="font-semibold">{stats.readingTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Speaking Time</span>
                </div>
                <span className="font-semibold">{stats.speakingTime}</span>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Word Length</span>
                <span className="font-semibold">{stats.averageWordLength}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Longest Word</span>
                <span className="font-semibold text-xs">{stats.longestWord || '-'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lexical Diversity</span>
                <span className="font-semibold">{stats.lexicalDiversity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Syllables</span>
                <span className="font-semibold">{stats.syllables}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Analysis */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Readability Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Readability Analysis</CardTitle>
            <CardDescription>Based on Flesch reading formulas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Flesch Reading Ease</span>
                <span className={`font-semibold ${getReadabilityLevel(stats.fleschReadingEase).color}`}>
                  {stats.fleschReadingEase}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Level: <span className={`font-medium ${getReadabilityLevel(stats.fleschReadingEase).color}`}>
                  {getReadabilityLevel(stats.fleschReadingEase).level}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, stats.fleschReadingEase))}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Flesch-Kincaid Grade</span>
                <span className="font-semibold">{Math.max(0, stats.fleschKincaidGrade).toFixed(1)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Reading Level: <span className="font-medium">{getGradeLevel(stats.fleschKincaidGrade)}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 border-t">
              <p className="mb-2"><strong>Score Interpretation:</strong></p>
              <ul className="space-y-1">
                <li>90-100: Very Easy (5th grade)</li>
                <li>80-90: Easy (6th grade)</li>
                <li>70-80: Fairly Easy (7th grade)</li>
                <li>60-70: Standard (8-9th grade)</li>
                <li>50-60: Fairly Difficult (10-12th grade)</li>
                <li>30-50: Difficult (College)</li>
                <li>0-30: Very Difficult (Graduate)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Word Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Words</CardTitle>
            <CardDescription>Top 5 most frequently used words</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.mostCommonWords.length > 0 ? (
              <div className="space-y-3">
                {stats.mostCommonWords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{item.word}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ 
                            width: `${(item.count / Math.max(...stats.mostCommonWords.map(w => w.count))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">
                Start typing to see word frequency analysis
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Section */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About Word Counter Pro</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Word Counter Pro is an advanced text analysis tool designed for students, writers, and professionals. 
              It provides comprehensive statistics about your text, including readability scores, word frequency analysis, 
              and time estimates for reading and speaking.
            </p>
            
            <h3>Key Features:</h3>
            <ul>
              <li><strong>Real-time Analysis:</strong> Get instant feedback as you type or paste text</li>
              <li><strong>Readability Scores:</strong> Flesch Reading Ease and Flesch-Kincaid Grade Level</li>
              <li><strong>Word Frequency:</strong> Identify your most commonly used words</li>
              <li><strong>Time Estimates:</strong> Calculate reading and speaking time</li>
              <li><strong>Lexical Diversity:</strong> Measure vocabulary richness</li>
              <li><strong>Export Statistics:</strong> Download your analysis results</li>
            </ul>

            <h3>Perfect for:</h3>
            <ul>
              <li>Academic essays and research papers</li>
              <li>Blog posts and articles</li>
              <li>Speeches and presentations</li>
              <li>Social media content</li>
              <li>Email and business communications</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Readability Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Flesch Reading Ease</h3>
              <p className="text-muted-foreground">
                This score rates text on a 100-point scale. Higher scores indicate easier readability. 
                The formula considers average sentence length and average syllables per word. 
                Most professional documents should aim for a score between 60-70.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Flesch-Kincaid Grade Level</h3>
              <p className="text-muted-foreground">
                This score corresponds to U.S. school grade levels. A score of 8.0 means an eighth-grader 
                can understand the text. Most professional writing should aim for grades 7-9 for broad accessibility.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Lexical Diversity</h3>
              <p className="text-muted-foreground">
                Measures the percentage of unique words in your text. Higher diversity often indicates 
                richer vocabulary and more engaging writing. Academic writing typically shows 40-60% diversity.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}