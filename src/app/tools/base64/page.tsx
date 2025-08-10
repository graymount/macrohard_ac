'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ArrowUpDown, Binary, Check, Trash2 } from 'lucide-react'

export default function Base64Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const processBase64 = () => {
    setError('')
    setCopied(false)
    
    if (!input.trim()) {
      setError('Please enter some text')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
      }
    } catch (e) {
      setError(mode === 'encode' 
        ? 'Failed to encode text' 
        : 'Invalid Base64 string')
      setOutput('')
    }
  }

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput('')
    setError('')
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

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('Hello, World! 👋\nThis is a test message.')
    } else {
      setInput('SGVsbG8sIFdvcmxkISDwn5GOClRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uu')
    }
    setError('')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Binary className="h-10 w-10 text-green-600" />
          Base64 Encoder/Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode and decode Base64 strings instantly. Perfect for encoding binary data, API keys, and text content.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </CardTitle>
            <CardDescription>
              {mode === 'encode' 
                ? 'Enter plain text to encode to Base64'
                : 'Enter Base64 string to decode'}
            </CardDescription>
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
                placeholder={mode === 'encode' 
                  ? 'Enter text to encode...' 
                  : 'Enter Base64 string to decode...'}
                className="w-full h-64 p-4 font-mono text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                spellCheck={false}
              />
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={processBase64}
                  className="flex-1"
                >
                  {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                </Button>
                <Button 
                  onClick={swapMode}
                  variant="secondary"
                  disabled={!output}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Swap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </CardTitle>
            <CardDescription>
              {mode === 'encode' 
                ? 'Your encoded Base64 string'
                : 'Your decoded text'}
            </CardDescription>
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
              </div>
              
              <textarea
                value={output}
                readOnly
                placeholder={mode === 'encode' 
                  ? 'Base64 encoded string will appear here...'
                  : 'Decoded text will appear here...'}
                className="w-full h-64 p-4 font-mono text-sm border rounded-md bg-muted/30 resize-none focus:outline-none"
                spellCheck={false}
              />
              
              {output && (
                <div className="text-sm text-muted-foreground">
                  Input length: {input.length} characters | 
                  Output length: {output.length} characters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mode Toggle */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
            className="rounded-r-none"
          >
            Encode Mode
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
            className="rounded-l-none"
          >
            Decode Mode
          </Button>
        </div>
      </div>

      {/* Features and SEO Content */}
      <div className="mt-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About Base64 Encoding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
              It's commonly used for encoding data that needs to be stored and transferred over media designed 
              to deal with text.
            </p>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Common Use Cases:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encoding binary data for JSON or XML transmission</li>
                <li>Embedding images in HTML or CSS files</li>
                <li>Storing complex data in URLs</li>
                <li>Encoding authentication credentials</li>
                <li>Email attachments (MIME encoding)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Features:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Supports UTF-8 encoding including emojis and special characters</li>
                <li>Instant encoding and decoding with no server requests</li>
                <li>Privacy-focused: all processing happens in your browser</li>
                <li>Easy mode switching between encode and decode</li>
                <li>One-click copy to clipboard functionality</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Encoding Process:</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Takes your input text (including Unicode characters)</li>
                  <li>Converts it to binary representation</li>
                  <li>Groups binary data into 6-bit chunks</li>
                  <li>Maps each chunk to a Base64 character</li>
                  <li>Returns the encoded string</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Decoding Process:</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Takes the Base64 encoded string</li>
                  <li>Maps each character back to 6-bit binary</li>
                  <li>Combines the binary data</li>
                  <li>Converts back to original text format</li>
                  <li>Returns the decoded string</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}