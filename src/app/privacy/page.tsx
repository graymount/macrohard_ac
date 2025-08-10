import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy - Macrohard Academic Tools',
  description: 'Privacy Policy for Macrohard Academic Tools - Learn how we protect your privacy and handle your data with complete transparency',
  keywords: 'privacy policy, data protection, academic tools privacy, student privacy, GDPR, CCPA',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Effective Date: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          At Macrohard Academic Tools, we take your privacy seriously. This Privacy Policy explains how we handle information 
          when you use our website and academic tools. We are committed to maintaining the trust and confidence of our users, 
          especially students, educators, and researchers who rely on our tools for their academic work.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Do NOT Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Your Academic Data is Safe:</strong> All our academic tools (citation generators, calculators, converters, etc.) 
              operate entirely within your browser. We do NOT collect, store, or have access to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Text you input for citations or analysis</li>
              <li>Research data or academic content</li>
              <li>Calculations or conversions you perform</li>
              <li>Personal academic information (grades, GPA, etc.)</li>
              <li>Any files you process with our tools</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This data remains exclusively on your device and is never transmitted to our servers or any third party.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Information We Automatically Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">2.1 Analytics Data</h3>
              <p className="text-muted-foreground mb-3">
                We use Google Analytics 4 to understand how our website is used. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Usage Information:</strong> Pages visited, tools used (not the data within them), time spent</li>
                <li><strong>Device Information:</strong> Browser type, operating system, screen resolution</li>
                <li><strong>Geographic Information:</strong> Country and city (based on IP address)</li>
                <li><strong>Traffic Sources:</strong> How you arrived at our website</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.2 Technical Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>IP addresses (anonymized by Google Analytics)</li>
                <li>Browser and device capabilities</li>
                <li>Error logs for troubleshooting</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. How We Use Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">The limited information we collect is used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Improve our tools and develop new features</li>
              <li>Understand which tools are most helpful to students and educators</li>
              <li>Fix technical issues and improve performance</li>
              <li>Analyze traffic patterns and optimize user experience</li>
              <li>Generate aggregated statistics about tool usage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Cookies and Local Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">4.1 Essential Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Theme Preference:</strong> Stores your light/dark mode selection</li>
                <li><strong>Language Preference:</strong> Remembers your language choice (if applicable)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.2 Analytics Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Google Analytics cookies (_ga, _gid) for usage statistics</li>
                <li>These help us understand how to improve our services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.3 Advertising Cookies</h3>
              <p className="text-muted-foreground">
                We display Google AdSense advertisements to keep our tools free. AdSense may use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Serve relevant advertisements</li>
                <li>Prevent showing the same ads repeatedly</li>
                <li>Detect and prevent fraudulent activity</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">We use the following third-party services:</p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Google Analytics</p>
                <p className="text-sm text-muted-foreground">For website analytics. <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
              </div>
              <div>
                <p className="font-semibold">Google AdSense</p>
                <p className="text-sm text-muted-foreground">For displaying advertisements. <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">How Google uses data</a></p>
              </div>
              <div>
                <p className="font-semibold">Cloudflare</p>
                <p className="text-sm text-muted-foreground">For content delivery and security. <a href="https://www.cloudflare.com/privacypolicy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect our website and infrastructure:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HTTPS encryption for all data transmission</li>
              <li>Regular security updates and monitoring</li>
              <li>Cloudflare DDoS protection and Web Application Firewall</li>
              <li>No server-side storage of user-input data</li>
              <li>Client-side processing ensures your data never leaves your device</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">7.1 Opt-Out Options</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use browser settings to block or delete cookies</li>
                <li>Install Google Analytics Opt-out Browser Add-on</li>
                <li>Use ad-blocking software to prevent advertisements</li>
                <li>Enable "Do Not Track" in your browser</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">7.2 Data Portability</h3>
              <p className="text-muted-foreground">
                Since we don't store your academic data, there's nothing to export. All your work remains on your device.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy (COPPA Compliance)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website is designed for students of all ages. We do not knowingly collect personal information from 
              children under 13. Since our tools don't require registration or collect personal data, children can safely 
              use our academic tools for their educational needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. International Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our services are available globally. By using our website, you consent to the collection and processing of 
              information as described in this policy. We comply with applicable data protection laws including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>GDPR (European Union):</strong> We process data lawfully with legitimate interests</li>
              <li><strong>CCPA (California):</strong> California residents have specific privacy rights</li>
              <li><strong>LGPD (Brazil):</strong> Brazilian users' data is processed in compliance with LGPD</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated 
              "Effective Date." For significant changes, we may provide additional notice on our homepage. Continued use 
              of our services after changes constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@macrohard-academic.com</p>
              <p><strong>Website:</strong> https://macrohard-academic.com/contact</p>
              <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
            <p className="text-muted-foreground mt-4">
              For academic institutions with specific privacy requirements, please contact us for detailed information 
              about our data handling practices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}