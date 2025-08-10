import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer - Macrohard Academic Tools',
  description: 'Legal disclaimer for Macrohard Academic Tools. Important information about the use of our academic tools and services.',
  keywords: 'disclaimer, legal notice, terms of use, academic tools disclaimer, limitation of liability',
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
        <p className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold mb-2">Important Notice</h2>
            <p className="text-muted-foreground">
              The information and tools provided on Macrohard Academic Tools are for educational and informational 
              purposes only. While we strive for accuracy, we cannot guarantee that all information is complete, 
              accurate, or current at all times.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. General Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The tools and information provided on this website (macrohard-academic.com) are offered "as is" 
              without any warranties, expressed or implied. Macrohard Academic Tools makes no representations 
              or warranties of any kind concerning the accuracy, suitability, reliability, or completeness of 
              any information or tools provided.
            </p>
            <p className="text-muted-foreground">
              By using our website and tools, you acknowledge that you do so at your own risk and agree that 
              Macrohard Academic Tools shall not be liable for any damages or losses arising from your use of 
              our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Academic Use Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">2.1 Academic Integrity</h3>
              <p className="text-muted-foreground">
                Our tools are designed to assist with academic work, not to replace critical thinking or 
                original research. Users are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Ensuring their work complies with their institution's academic integrity policies</li>
                <li>Properly citing all sources according to required citation styles</li>
                <li>Verifying the accuracy of generated citations and calculations</li>
                <li>Not using our tools to engage in plagiarism or academic dishonesty</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.2 Not a Substitute for Professional Advice</h3>
              <p className="text-muted-foreground">
                Our tools should not be considered a substitute for professional academic guidance. Always 
                consult with your instructors, advisors, or academic support services for specific requirements 
                and standards.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Tool Accuracy and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">3.1 Citation Generator</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Citations should be reviewed and verified against official style guides</li>
                <li>Formatting may vary based on specific publisher or institutional requirements</li>
                <li>Users are responsible for ensuring citation accuracy and completeness</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3.2 Calculators and Converters</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Results should be verified independently for critical applications</li>
                <li>Rounding and precision may affect results</li>
                <li>Different institutions may use varying calculation methods</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3.3 Text Analysis Tools</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Word counts and analysis may differ from other tools</li>
                <li>Language detection and analysis features are estimates</li>
                <li>Results should not be the sole basis for academic decisions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, Macrohard Academic Tools, its operators, and affiliates 
              shall not be liable for any direct, indirect, incidental, special, consequential, or punitive 
              damages arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your use or inability to use our tools or website</li>
              <li>Any errors or omissions in the content or functionality</li>
              <li>Academic penalties resulting from improper use of our tools</li>
              <li>Loss of data or academic work</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any third-party content or conduct on our website</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Third-Party Content and Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites or display third-party content (including 
              advertisements). We do not endorse, guarantee, or assume responsibility for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The accuracy or reliability of third-party content</li>
              <li>Products or services offered by third parties</li>
              <li>Privacy practices of linked websites</li>
              <li>Content of advertisements displayed on our site</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Users should review the terms and privacy policies of any third-party sites they visit.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, and software, is the property of 
              Macrohard Academic Tools or its content suppliers and is protected by international copyright laws.
            </p>
            <p className="text-muted-foreground">
              Users may use our tools for personal, educational, and non-commercial purposes only. Any other 
              use, including reproduction, modification, distribution, or republication, without prior written 
              permission is strictly prohibited.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You agree to indemnify, defend, and hold harmless Macrohard Academic Tools, its operators, and 
              affiliates from any claims, losses, damages, liabilities, and expenses (including legal fees) 
              arising from your use of our website and tools, violation of these terms, or infringement of 
              any third-party rights.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Modifications and Interruptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Modify or discontinue any tool or service without notice</li>
              <li>Change features, functionality, or appearance at any time</li>
              <li>Impose limits on certain features or restrict access</li>
              <li>Terminate the website or any portion thereof</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We shall not be liable for any modification, suspension, or discontinuance of our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This disclaimer and your use of Macrohard Academic Tools shall be governed by and construed in 
              accordance with the laws of the United States, without regard to its conflict of law provisions. 
              Any disputes arising from this disclaimer or your use of our services shall be subject to the 
              exclusive jurisdiction of the courts in the United States.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this disclaimer, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> legal@macrohard-academic.com</p>
              <p><strong>Website:</strong> https://macrohard-academic.com/contact</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Your Acceptance</h3>
            <p className="text-muted-foreground">
              By using Macrohard Academic Tools, you signify your acceptance of this disclaimer. If you do not 
              agree with any part of this disclaimer, please do not use our website or tools. Your continued use 
              following the posting of changes will be deemed your acceptance of those changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}