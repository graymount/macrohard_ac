'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Hash, Check, Trash2 } from 'lucide-react'

export default function HashGeneratorPage() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  })
  const [copied, setCopied] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Load crypto-js library dynamically
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const generateHashes = () => {
    if (!input.trim()) {
      setHashes({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
      })
      return
    }

    setIsProcessing(true)
    
    // Use Web Crypto API for SHA algorithms
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    
    // Generate hashes
    Promise.all([
      generateSHA('SHA-1', data),
      generateSHA('SHA-256', data),
      generateSHA('SHA-512', data)
    ]).then(([sha1, sha256, sha512]) => {
      // For MD5, we need to use a fallback or library
      const md5 = generateMD5(input)
      
      setHashes({
        md5,
        sha1,
        sha256,
        sha512
      })
      setIsProcessing(false)
    })
  }

  const generateSHA = async (algorithm: string, data: Uint8Array) => {
    const hashBuffer = await crypto.subtle.digest(algorithm, data.buffer as ArrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const generateMD5 = (text: string) => {
    // Simple MD5 implementation for client-side
    // Note: MD5 is not cryptographically secure and should not be used for security purposes
    if (typeof window !== 'undefined' && (window as any).CryptoJS) {
      return (window as any).CryptoJS.MD5(text).toString()
    }
    return 'MD5 library loading...'
  }

  const copyToClipboard = async (hash: string, type: string) => {
    if (!hash) return
    
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setHashes({
      md5: '',
      sha1: '',
      sha256: '',
      sha512: ''
    })
    setCopied('')
  }

  const loadSample = () => {
    setInput('Hello, World!')
  }

  // Auto-generate hashes when input changes
  useEffect(() => {
    generateHashes()
  }, [input])

  const hashTypes = [
    { 
      name: 'MD5', 
      key: 'md5', 
      description: '128-bit hash (32 hex characters)',
      color: 'text-red-600'
    },
    { 
      name: 'SHA-1', 
      key: 'sha1', 
      description: '160-bit hash (40 hex characters)',
      color: 'text-orange-600'
    },
    { 
      name: 'SHA-256', 
      key: 'sha256', 
      description: '256-bit hash (64 hex characters)',
      color: 'text-green-600'
    },
    { 
      name: 'SHA-512', 
      key: 'sha512', 
      description: '512-bit hash (128 hex characters)',
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Hash className="h-10 w-10 text-purple-600" />
          Hash Generator
        </h1>
        <p className="text-muted-foreground">
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Perfect for checksums, data integrity, and password hashing.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>Enter text to generate hash values</CardDescription>
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
              placeholder="Enter text to hash..."
              className="w-full h-32 p-4 font-mono text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              spellCheck={false}
            />
            
            {input && (
              <div className="text-sm text-muted-foreground">
                Input length: {input.length} characters | {new Blob([input]).size} bytes
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hash Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {hashTypes.map((type) => (
          <Card key={type.key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={`text-lg ${type.color}`}>{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(hashes[type.key as keyof typeof hashes], type.key)}
                  disabled={!hashes[type.key as keyof typeof hashes]}
                >
                  {copied === type.key ? (
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
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-muted/50 rounded-md break-all font-mono text-sm">
                {isProcessing ? (
                  <span className="text-muted-foreground">Generating...</span>
                ) : hashes[type.key as keyof typeof hashes] || (
                  <span className="text-muted-foreground">Enter text to generate hash</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Section */}
      <div className="mt-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About Hash Functions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              A hash function is a mathematical algorithm that maps data of arbitrary size to a fixed-size string of bytes. 
              The output, called a hash value or digest, is unique to the input data.
            </p>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Hash Algorithm Comparison:</h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-foreground">MD5 (Message Digest 5):</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>128-bit hash value (32 hexadecimal characters)</li>
                    <li>Fast but cryptographically broken - use only for checksums</li>
                    <li>Not recommended for security applications</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-foreground">SHA-1 (Secure Hash Algorithm 1):</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>160-bit hash value (40 hexadecimal characters)</li>
                    <li>Deprecated for security use but still used for checksums</li>
                    <li>Git uses SHA-1 for version control</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-foreground">SHA-256:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>256-bit hash value (64 hexadecimal characters)</li>
                    <li>Part of SHA-2 family, widely used and secure</li>
                    <li>Used in Bitcoin and blockchain technology</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-foreground">SHA-512:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>512-bit hash value (128 hexadecimal characters)</li>
                    <li>Stronger than SHA-256, used for high-security applications</li>
                    <li>Better performance on 64-bit systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>File Integrity:</strong> Verify files haven't been corrupted during transfer</li>
              <li><strong>Password Storage:</strong> Store password hashes instead of plain text (use with salt)</li>
              <li><strong>Digital Signatures:</strong> Create unique identifiers for documents</li>
              <li><strong>Checksums:</strong> Detect errors in data transmission</li>
              <li><strong>Data Deduplication:</strong> Identify duplicate files by comparing hashes</li>
              <li><strong>Caching:</strong> Generate cache keys based on content</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}