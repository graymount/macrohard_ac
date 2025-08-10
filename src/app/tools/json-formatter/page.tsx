'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Download, FileJson, Trash2, Check } from 'lucide-react'

// export const metadata: Metadata = {
//   title: 'JSON Formatter - Beautify, Minify & Validate JSON Online',
//   description: 'Free online JSON formatter, validator and minifier. Format messy JSON data with proper indentation. Validate JSON syntax and minify for production.',
//   keywords: 'json formatter, json beautifier, json validator, json minifier, format json online',
// }

export default function JsonFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = (minify = false) => {
    setError('')
    setCopied(false)
    
    if (!input.trim()) {
      setError('Please enter JSON data')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = minify 
        ? JSON.stringify(parsed) 
        : JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    if (!output) return
    
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadJson = () => {
    if (!output) return
    
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  const loadSample = () => {
    const sample = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "traveling"],
  "active": true
}`
    setInput(sample)
    setError('')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FileJson className="h-10 w-10 text-blue-600" />
          JSON Formatter
        </h1>
        <p className="text-muted-foreground">
          Format, validate, and minify JSON data instantly. Perfect for developers working with APIs and configuration files.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
            <CardDescription>Paste or type your JSON data here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadSample}
                >
                  Load Sample
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAll}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full h-96 p-4 font-mono text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                spellCheck={false}
              />
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => formatJson(false)}
                  className="flex-1"
                >
                  Format JSON
                </Button>
                <Button 
                  onClick={() => formatJson(true)}
                  variant="secondary"
                  className="flex-1"
                >
                  Minify JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
            <CardDescription>Your formatted JSON will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadJson}
                  disabled={!output}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-96 p-4 font-mono text-sm border rounded-md bg-muted/30 resize-none focus:outline-none"
                spellCheck={false}
              />
              
              {output && (
                <div className="text-sm text-muted-foreground">
                  Size: {new Blob([output]).size} bytes | 
                  Lines: {output.split('\n').length}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features and SEO Content */}
      <div className="mt-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">✨ Format & Beautify</h3>
                <p className="text-sm text-muted-foreground">
                  Transform messy JSON into readable format with proper indentation and syntax highlighting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">✅ Validate Syntax</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly detect and highlight JSON syntax errors with detailed error messages.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📦 Minify JSON</h3>
                <p className="text-sm text-muted-foreground">
                  Compress JSON by removing unnecessary whitespace for production use.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔒 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. No data is sent to any server.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Paste your JSON data in the input field on the left</li>
              <li>Click "Format JSON" to beautify or "Minify JSON" to compress</li>
              <li>The tool will validate your JSON and show any syntax errors</li>
              <li>Copy the formatted result or download it as a file</li>
            </ol>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Common Use Cases</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>Format API responses for better readability</li>
                <li>Validate configuration files before deployment</li>
                <li>Debug JSON parsing errors in applications</li>
                <li>Minify JSON data to reduce file size</li>
                <li>Convert between formatted and compact JSON</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}