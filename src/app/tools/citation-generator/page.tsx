'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Plus, Trash2, BookOpen, FileText, Users, Globe } from 'lucide-react'

// Citation styles
type CitationStyle = 'apa' | 'mla' | 'chicago' | 'harvard'
type SourceType = 'book' | 'journal' | 'website' | 'newspaper'

interface Citation {
  id: string
  style: CitationStyle
  sourceType: SourceType
  authors: string[]
  title: string
  year: string
  publisher?: string
  url?: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  accessDate?: string
  publicationDate?: string
  websiteName?: string
  newspaperName?: string
  edition?: string
  city?: string
}

export default function CitationGeneratorPage() {
  const [citations, setCitations] = useState<Citation[]>([])
  const [currentCitation, setCurrentCitation] = useState<Citation>({
    id: Date.now().toString(),
    style: 'apa',
    sourceType: 'book',
    authors: [''],
    title: '',
    year: '',
  })
  const [generatedCitations, setGeneratedCitations] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const formatAuthorAPA = (authors: string[]): string => {
    if (authors.length === 0 || !authors[0]) return ''
    
    const formattedAuthors = authors.filter(a => a).map(author => {
      const parts = author.trim().split(' ')
      if (parts.length >= 2) {
        const lastName = parts[parts.length - 1]
        const initials = parts.slice(0, -1).map(name => name[0]?.toUpperCase() + '.').join(' ')
        return `${lastName}, ${initials}`
      }
      return author
    })

    if (formattedAuthors.length === 1) return formattedAuthors[0]
    if (formattedAuthors.length === 2) return formattedAuthors.join(' & ')
    if (formattedAuthors.length <= 20) {
      return formattedAuthors.slice(0, -1).join(', ') + ', & ' + formattedAuthors[formattedAuthors.length - 1]
    }
    return formattedAuthors.slice(0, 19).join(', ') + ', ... ' + formattedAuthors[formattedAuthors.length - 1]
  }

  const formatAuthorMLA = (authors: string[]): string => {
    if (authors.length === 0 || !authors[0]) return ''
    
    const validAuthors = authors.filter(a => a)
    if (validAuthors.length === 1) {
      const parts = validAuthors[0].trim().split(' ')
      if (parts.length >= 2) {
        const lastName = parts[parts.length - 1]
        const firstName = parts.slice(0, -1).join(' ')
        return `${lastName}, ${firstName}`
      }
      return validAuthors[0]
    }
    if (validAuthors.length === 2) {
      return validAuthors.join(' and ')
    }
    return validAuthors[0] + ' et al.'
  }

  const generateCitation = (citation: Citation): string => {
    const { style, sourceType, authors, title, year, publisher, url, journal, volume, issue, pages, doi, accessDate, websiteName } = citation

    switch (style) {
      case 'apa':
        switch (sourceType) {
          case 'book':
            return `${formatAuthorAPA(authors)}. (${year}). *${title}*. ${publisher || 'Publisher'}.`
          case 'journal':
            let journalCitation = `${formatAuthorAPA(authors)}. (${year}). ${title}. *${journal}*`
            if (volume) journalCitation += `, *${volume}*`
            if (issue) journalCitation += `(${issue})`
            if (pages) journalCitation += `, ${pages}`
            journalCitation += '.'
            if (doi) journalCitation += ` https://doi.org/${doi}`
            return journalCitation
          case 'website':
            return `${formatAuthorAPA(authors)}. (${year}). *${title}*. ${websiteName || 'Website'}. ${url || ''}`
          case 'newspaper':
            return `${formatAuthorAPA(authors)}. (${year}). ${title}. *${citation.newspaperName || 'Newspaper'}*, ${pages || 'pp.'}.`
          default:
            return ''
        }
      
      case 'mla':
        switch (sourceType) {
          case 'book':
            return `${formatAuthorMLA(authors)}. *${title}*. ${publisher || 'Publisher'}, ${year}.`
          case 'journal':
            let mlaJournal = `${formatAuthorMLA(authors)}. "${title}." *${journal}*`
            if (volume) mlaJournal += `, vol. ${volume}`
            if (issue) mlaJournal += `, no. ${issue}`
            mlaJournal += `, ${year}`
            if (pages) mlaJournal += `, pp. ${pages}`
            mlaJournal += '.'
            return mlaJournal
          case 'website':
            return `${formatAuthorMLA(authors)}. "${title}." *${websiteName || 'Website'}*, ${year}, ${url || ''}.`
          case 'newspaper':
            return `${formatAuthorMLA(authors)}. "${title}." *${citation.newspaperName || 'Newspaper'}*, ${year}, ${pages || 'pp.'}.`
          default:
            return ''
        }
      
      case 'chicago':
        switch (sourceType) {
          case 'book':
            return `${authors.join(' and ')}. *${title}*. ${citation.city ? citation.city + ': ' : ''}${publisher || 'Publisher'}, ${year}.`
          case 'journal':
            let chicagoJournal = `${authors.join(' and ')}. "${title}." *${journal}* ${volume}`
            if (issue) chicagoJournal += `, no. ${issue}`
            chicagoJournal += ` (${year})`
            if (pages) chicagoJournal += `: ${pages}`
            chicagoJournal += '.'
            return chicagoJournal
          case 'website':
            return `${authors.join(' and ')}. "${title}." ${websiteName || 'Website'}. Accessed ${accessDate || 'Date'}. ${url || ''}.`
          case 'newspaper':
            return `${authors.join(' and ')}. "${title}." *${citation.newspaperName || 'Newspaper'}*, ${year}.`
          default:
            return ''
        }
      
      case 'harvard':
        switch (sourceType) {
          case 'book':
            return `${authors.join(' & ')} ${year}, *${title}*, ${publisher || 'Publisher'}.`
          case 'journal':
            let harvardJournal = `${authors.join(' & ')} ${year}, '${title}', *${journal}*`
            if (volume) harvardJournal += `, vol. ${volume}`
            if (issue) harvardJournal += `, no. ${issue}`
            if (pages) harvardJournal += `, pp. ${pages}`
            harvardJournal += '.'
            return harvardJournal
          case 'website':
            return `${authors.join(' & ')} ${year}, *${title}*, ${websiteName || 'Website'}, viewed ${accessDate || 'Date'}, <${url || 'URL'}>.`
          case 'newspaper':
            return `${authors.join(' & ')} ${year}, '${title}', *${citation.newspaperName || 'Newspaper'}*, ${pages || 'p.'}.`
          default:
            return ''
        }
      
      default:
        return ''
    }
  }

  const addAuthor = () => {
    setCurrentCitation({
      ...currentCitation,
      authors: [...currentCitation.authors, '']
    })
  }

  const removeAuthor = (index: number) => {
    setCurrentCitation({
      ...currentCitation,
      authors: currentCitation.authors.filter((_, i) => i !== index)
    })
  }

  const updateAuthor = (index: number, value: string) => {
    const newAuthors = [...currentCitation.authors]
    newAuthors[index] = value
    setCurrentCitation({
      ...currentCitation,
      authors: newAuthors
    })
  }

  const addCitation = () => {
    const newCitation = {
      ...currentCitation,
      id: Date.now().toString()
    }
    setCitations([...citations, newCitation])
    
    // Generate all citations
    const allCitations = [...citations, newCitation]
    const formatted = allCitations.map(c => generateCitation(c)).join('\n\n')
    setGeneratedCitations(formatted)
    
    // Reset form
    setCurrentCitation({
      id: Date.now().toString(),
      style: currentCitation.style,
      sourceType: currentCitation.sourceType,
      authors: [''],
      title: '',
      year: '',
    })
  }

  const removeCitation = (id: string) => {
    const newCitations = citations.filter(c => c.id !== id)
    setCitations(newCitations)
    const formatted = newCitations.map(c => generateCitation(c)).join('\n\n')
    setGeneratedCitations(formatted)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCitations)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Citation Generator</h1>
        <p className="text-xl text-muted-foreground">
          Generate accurate citations in APA, MLA, Chicago, and Harvard formats for your academic papers.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Citation Details</CardTitle>
            <CardDescription>Enter the source information to generate a citation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="style">Citation Style</Label>
                <Select
                  value={currentCitation.style}
                  onValueChange={(value: CitationStyle) => 
                    setCurrentCitation({ ...currentCitation, style: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA 7th Edition</SelectItem>
                    <SelectItem value="mla">MLA 9th Edition</SelectItem>
                    <SelectItem value="chicago">Chicago 17th Edition</SelectItem>
                    <SelectItem value="harvard">Harvard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sourceType">Source Type</Label>
                <Select
                  value={currentCitation.sourceType}
                  onValueChange={(value: SourceType) => 
                    setCurrentCitation({ ...currentCitation, sourceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="journal">Journal Article</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="newspaper">Newspaper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Authors */}
            <div>
              <Label>Authors</Label>
              {currentCitation.authors.map((author, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    placeholder="First Last (e.g., John Smith)"
                    value={author}
                    onChange={(e) => updateAuthor(index, e.target.value)}
                  />
                  {currentCitation.authors.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeAuthor(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addAuthor}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Author
              </Button>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder={currentCitation.sourceType === 'book' ? 'Book Title' : 'Article Title'}
                value={currentCitation.title}
                onChange={(e) => setCurrentCitation({ ...currentCitation, title: e.target.value })}
              />
            </div>

            {/* Year */}
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                placeholder="2024"
                value={currentCitation.year}
                onChange={(e) => setCurrentCitation({ ...currentCitation, year: e.target.value })}
              />
            </div>

            {/* Conditional Fields based on Source Type */}
            {currentCitation.sourceType === 'book' && (
              <>
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    placeholder="Publisher Name"
                    value={currentCitation.publisher || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, publisher: e.target.value })}
                  />
                </div>
                {currentCitation.style === 'chicago' && (
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City of Publication"
                      value={currentCitation.city || ''}
                      onChange={(e) => setCurrentCitation({ ...currentCitation, city: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}

            {currentCitation.sourceType === 'journal' && (
              <>
                <div>
                  <Label htmlFor="journal">Journal Name</Label>
                  <Input
                    id="journal"
                    placeholder="Journal of Academic Studies"
                    value={currentCitation.journal || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, journal: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="volume">Volume</Label>
                    <Input
                      id="volume"
                      placeholder="12"
                      value={currentCitation.volume || ''}
                      onChange={(e) => setCurrentCitation({ ...currentCitation, volume: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue">Issue</Label>
                    <Input
                      id="issue"
                      placeholder="3"
                      value={currentCitation.issue || ''}
                      onChange={(e) => setCurrentCitation({ ...currentCitation, issue: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      id="pages"
                      placeholder="123-145"
                      value={currentCitation.pages || ''}
                      onChange={(e) => setCurrentCitation({ ...currentCitation, pages: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="doi">DOI (optional)</Label>
                  <Input
                    id="doi"
                    placeholder="10.1234/example"
                    value={currentCitation.doi || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, doi: e.target.value })}
                  />
                </div>
              </>
            )}

            {currentCitation.sourceType === 'website' && (
              <>
                <div>
                  <Label htmlFor="websiteName">Website Name</Label>
                  <Input
                    id="websiteName"
                    placeholder="Website Name"
                    value={currentCitation.websiteName || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, websiteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/article"
                    value={currentCitation.url || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, url: e.target.value })}
                  />
                </div>
                {(currentCitation.style === 'chicago' || currentCitation.style === 'harvard') && (
                  <div>
                    <Label htmlFor="accessDate">Access Date</Label>
                    <Input
                      id="accessDate"
                      placeholder="March 15, 2024"
                      value={currentCitation.accessDate || ''}
                      onChange={(e) => setCurrentCitation({ ...currentCitation, accessDate: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}

            {currentCitation.sourceType === 'newspaper' && (
              <>
                <div>
                  <Label htmlFor="newspaperName">Newspaper Name</Label>
                  <Input
                    id="newspaperName"
                    placeholder="The New York Times"
                    value={currentCitation.newspaperName || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, newspaperName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pages">Page(s)</Label>
                  <Input
                    id="pages"
                    placeholder="A1, A4"
                    value={currentCitation.pages || ''}
                    onChange={(e) => setCurrentCitation({ ...currentCitation, pages: e.target.value })}
                  />
                </div>
              </>
            )}

            <Button 
              onClick={addCitation} 
              className="w-full"
              disabled={!currentCitation.title || !currentCitation.year || !currentCitation.authors[0]}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Citation
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Citations</CardTitle>
              <CardDescription>Your formatted citations will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {citations.length > 0 ? (
                <div className="space-y-4">
                  {citations.map(citation => (
                    <div key={citation.id} className="p-3 bg-muted rounded-lg relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeCitation(citation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <p className="pr-8" dangerouslySetInnerHTML={{ 
                        __html: generateCitation(citation).replace(/\*(.*?)\*/g, '<em>$1</em>') 
                      }} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No citations generated yet. Fill in the form and click "Add Citation" to start.
                </p>
              )}
            </CardContent>
          </Card>

          {citations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Bibliography</CardTitle>
                <CardDescription>Copy all citations for your reference list</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedCitations}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="w-full mt-4"
                  variant={copied ? 'secondary' : 'default'}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy All Citations'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Citation Generator</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <ol className="space-y-2">
              <li>Select your preferred citation style (APA, MLA, Chicago, or Harvard)</li>
              <li>Choose the type of source you're citing (Book, Journal, Website, or Newspaper)</li>
              <li>Fill in the required information for your source</li>
              <li>Click "Add Citation" to generate the formatted citation</li>
              <li>Add multiple citations to build your bibliography</li>
              <li>Copy all citations when you're done</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Citation Style Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">APA (American Psychological Association)</h3>
              <p className="text-muted-foreground">
                Commonly used in Psychology, Education, and Social Sciences. Features author-date format with 
                emphasis on publication year.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">MLA (Modern Language Association)</h3>
              <p className="text-muted-foreground">
                Primarily used in Humanities, especially Literature and Language studies. Uses author-page format 
                for in-text citations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Chicago Style</h3>
              <p className="text-muted-foreground">
                Used in History and some Social Sciences. Offers both notes-bibliography and author-date systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Harvard Style</h3>
              <p className="text-muted-foreground">
                Popular in UK and Australian universities. Similar to APA with author-date format but with 
                different formatting conventions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Accurate Citations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Always double-check generated citations against official style guides</li>
              <li>Include all author names when available (the generator will format them correctly)</li>
              <li>For websites, include access dates when required by your style guide</li>
              <li>Use DOIs for journal articles when available - they're more reliable than URLs</li>
              <li>Be consistent with your citation style throughout your paper</li>
              <li>Pay attention to italicization and punctuation - these details matter</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}