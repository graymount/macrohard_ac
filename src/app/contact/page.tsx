import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MessageSquare, Clock, Globe, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Macrohard Academic Tools',
  description: 'Get in touch with Macrohard Academic Tools team. We are here to help with your questions about our academic tools and services.',
  keywords: 'contact, support, help, academic tools support, student help, technical support',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          We're here to help! Reach out to us for support, feedback, or partnership opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Email Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">General Inquiries</p>
            <a href="mailto:support@macrohard-academic.com" className="text-primary hover:underline">
              support@macrohard-academic.com
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Response time: 24-48 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle>Feedback & Suggestions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Share Your Ideas</p>
            <a href="mailto:feedback@macrohard-academic.com" className="text-primary hover:underline">
              feedback@macrohard-academic.com
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              We value your input!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Data Protection Inquiries</p>
            <a href="mailto:privacy@macrohard-academic.com" className="text-primary hover:underline">
              privacy@macrohard-academic.com
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              GDPR, CCPA compliance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Partnerships</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Business & Academic</p>
            <a href="mailto:partnerships@macrohard-academic.com" className="text-primary hover:underline">
              partnerships@macrohard-academic.com
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Collaboration opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">How do I report a bug or technical issue?</h3>
            <p className="text-muted-foreground">
              Please email us at support@macrohard-academic.com with details about the issue, including:
              the tool you were using, what you were trying to do, any error messages, and your browser/device information.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Are your tools really free?</h3>
            <p className="text-muted-foreground">
              Yes! All our academic tools are 100% free to use. We support the platform through non-intrusive 
              advertisements that don't interfere with tool functionality.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I use your tools for commercial purposes?</h3>
            <p className="text-muted-foreground">
              Our tools are primarily designed for academic and educational use. For commercial licensing 
              inquiries, please contact partnerships@macrohard-academic.com.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer API access to your tools?</h3>
            <p className="text-muted-foreground">
              Currently, all our tools are browser-based only. We're considering API access for the future. 
              If you're interested, let us know your use case via email.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How can I request a new tool or feature?</h3>
            <p className="text-muted-foreground">
              We love hearing from our users! Send your suggestions to feedback@macrohard-academic.com. 
              We review all requests and prioritize based on community needs.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Response Times</CardTitle>
          <CardDescription>When to expect a reply from our team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">General Support</p>
                <p className="text-sm text-muted-foreground">24-48 hours on business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Technical Issues</p>
                <p className="text-sm text-muted-foreground">12-24 hours for critical issues</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Partnership Inquiries</p>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Macrohard Academic Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Macrohard Academic Tools is dedicated to providing free, high-quality academic tools for students, 
            educators, and researchers worldwide. Our mission is to make academic work more efficient and 
            accessible to everyone, regardless of their economic background.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Our Commitment</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Always free for academic use</li>
              <li>Privacy-focused (client-side processing)</li>
              <li>No registration required</li>
              <li>Continuously improving based on user feedback</li>
              <li>Supporting students and educators globally</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Operating Hours</h3>
            <p className="text-muted-foreground">
              Our support team operates Monday through Friday, 9 AM - 6 PM EST. 
              Emails received outside these hours will be responded to on the next business day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            <p className="text-muted-foreground">
              We provide support in English and Chinese (中文). Please specify your preferred 
              language when contacting us.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
        <Globe className="h-8 w-8 mx-auto mb-3 text-primary" />
        <h2 className="text-xl font-semibold mb-2">Global Academic Community</h2>
        <p className="text-muted-foreground">
          Serving over 100,000 students and educators from 150+ countries
        </p>
      </div>
    </div>
  )
}