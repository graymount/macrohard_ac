import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Globe, Shield, Zap, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - DevToolbox',
  description: 'Learn about DevToolbox - Your trusted collection of free online developer tools',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          About DevToolbox
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional developer tools that work entirely in your browser. 
          Fast, free, and privacy-focused.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>Making developers' lives easier</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              DevToolbox provides essential developer tools that are fast, free, and respect your privacy. 
              Every tool runs entirely in your browser - no data is sent to servers, no registration required, 
              and no tracking beyond basic analytics. We believe developer tools should be accessible to everyone.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <CardTitle>Tools We Offer</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Data Tools:</strong> JSON formatter, CSV converter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Encoding:</strong> Base64, URL encoder, HTML entities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Security:</strong> Hash generators, password tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Generators:</strong> QR codes, Lorem ipsum, UUIDs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Text Tools:</strong> Diff checker, word counter</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                <CardTitle>Privacy First</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your data never leaves your browser. All processing happens client-side using JavaScript.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">✅ No Server Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Everything runs locally in your browser
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">✅ No Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    Use all tools without creating an account
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">✅ No Data Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    We don't store or log your data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle>Built for Developers</CardTitle>
                <CardDescription>By developers who understand your needs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-muted-foreground">
                No loading times, no server round-trips. Tools work instantly as you type.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-muted-foreground">
                All tools are responsive and work perfectly on mobile devices and tablets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dark Mode Support</h3>
              <p className="text-muted-foreground">
                Built-in theme toggle for comfortable use during those late-night coding sessions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Open Source Friendly</h3>
              <p className="text-muted-foreground">
                We use and support open source technologies. Built with Next.js, React, and Tailwind CSS.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Frontend Stack</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Next.js 14 with App Router</li>
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Radix UI components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Static site generation</li>
                  <li>• Edge runtime compatible</li>
                  <li>• Optimized bundle size</li>
                  <li>• PWA capabilities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose DevToolbox?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ No ads or popups</li>
                <li>✓ No rate limiting</li>
                <li>✓ No file size restrictions</li>
                <li>✓ Works offline once loaded</li>
              </ul>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Copy to clipboard support</li>
                <li>✓ Download results as files</li>
                <li>✓ Keyboard shortcuts</li>
                <li>✓ Regular updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Ready to boost your productivity? Explore our collection of developer tools.
              Everything is free, no signup required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/">
                  Browse All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tools/json-formatter">
                  Try JSON Formatter
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}