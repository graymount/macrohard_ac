import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - Macrohard Academic Tools',
  description: 'Terms of Service for Macrohard Academic Tools. Read our terms and conditions for using our free academic tools and services.',
  keywords: 'terms of service, terms and conditions, user agreement, academic tools terms, legal terms',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ScrollText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground">
          Effective Date: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold mb-2">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              These Terms of Service ("Terms") govern your use of Macrohard Academic Tools website and services. 
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any 
              part of these terms, you do not have permission to access our services.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Definitions and Acceptance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1.1 Definitions</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>"Service"</strong> refers to the Macrohard Academic Tools website and all associated tools</li>
                <li><strong>"User", "You"</strong> refers to individuals accessing or using our Service</li>
                <li><strong>"Content"</strong> refers to text, data, information, or materials processed through our tools</li>
                <li><strong>"Academic Tools"</strong> refers to all educational utilities provided on our platform</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">1.2 Acceptance</h3>
              <p className="text-muted-foreground">
                By accessing and using Macrohard Academic Tools, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service and our Privacy Policy. These Terms apply to all 
                visitors, users, and others who access or use the Service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">1.3 Eligibility</h3>
              <p className="text-muted-foreground">
                Our Service is available to users of all ages. However, if you are under 13 years old, you should 
                use our Service under the supervision of a parent or guardian who agrees to these Terms.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Macrohard Academic Tools provides free, browser-based academic utilities designed to assist students, 
              educators, and researchers in their academic work. Our services include but are not limited to:
            </p>
            <div>
              <h3 className="font-semibold mb-2">2.1 Academic Writing Tools</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Citation generators (APA, MLA, Chicago, Harvard)</li>
                <li>Bibliography formatters</li>
                <li>Word and character counters</li>
                <li>Text analysis and comparison tools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.2 Scientific and Mathematical Tools</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Scientific calculators</li>
                <li>Unit converters</li>
                <li>Statistical calculators</li>
                <li>LaTeX converters and editors</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.3 Data Processing Tools</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>JSON formatters and validators</li>
                <li>CSV/TSV converters</li>
                <li>Base64 encoding/decoding</li>
                <li>Hash generators for data integrity</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.4 Key Features</h3>
              <p className="text-muted-foreground">
                All tools operate entirely within your browser using client-side JavaScript. No user data is 
                transmitted to our servers, ensuring complete privacy and data security. Tools are free to use 
                without registration or account creation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. License to Use Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">3.1 Grant of License</h3>
              <p className="text-muted-foreground">
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
                revocable license to access and use our Service for legitimate academic and educational purposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3.2 Permitted Uses</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access and use tools for personal academic work</li>
                <li>Use tools for educational instruction and research</li>
                <li>Share links to our tools with others</li>
                <li>Incorporate tool outputs into your academic work with proper attribution</li>
                <li>Use tools for legitimate commercial academic services (tutoring, editing)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3.3 License Restrictions</h3>
              <p className="text-muted-foreground">
                This license does not allow you to reproduce, duplicate, copy, sell, resell, or exploit any 
                portion of the Service without express written permission from us.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Prohibited Uses and Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You agree not to use the Service in any way that:
            </p>
            <div>
              <h3 className="font-semibold mb-2">4.1 Violates Laws or Regulations</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violates any applicable federal, state, local, or international law</li>
                <li>Infringes on intellectual property rights of others</li>
                <li>Constitutes academic dishonesty or plagiarism</li>
                <li>Violates academic integrity policies of educational institutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.2 Harms the Service or Others</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Attempts to gain unauthorized access to our systems</li>
                <li>Interferes with or disrupts the Service or servers</li>
                <li>Introduces viruses, malware, or other harmful code</li>
                <li>Uses automated systems, bots, or scrapers without permission</li>
                <li>Attempts to probe, scan, or test system vulnerabilities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.3 Misuses the Service</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Reverse engineers or attempts to extract source code</li>
                <li>Modifies, adapts, or hacks the Service</li>
                <li>Creates derivative works based on the Service</li>
                <li>Uses the Service to develop competing products</li>
                <li>Removes, obscures, or alters legal notices</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Disclaimers and Warranties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">5.1 "As Is" Service</h3>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">5.2 No Guarantee of Accuracy</h3>
              <p className="text-muted-foreground">
                We do not warrant or guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>The accuracy, reliability, or completeness of any tool outputs</li>
                <li>That the Service will be uninterrupted, secure, or error-free</li>
                <li>That defects will be corrected in a timely manner</li>
                <li>That the Service will meet your specific academic requirements</li>
                <li>The quality of any tools, services, or information obtained</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">5.3 Academic Responsibility</h3>
              <p className="text-muted-foreground">
                You acknowledge that you are solely responsible for verifying the accuracy and appropriateness 
                of all tool outputs for your specific academic purposes. Always consult official style guides 
                and institutional requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">6.1 Exclusion of Damages</h3>
              <p className="text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MACROHARD ACADEMIC TOOLS, ITS AFFILIATES, 
                OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Loss of profits, data, or academic work</li>
                <li>Academic penalties or consequences</li>
                <li>Errors or inaccuracies in tool outputs</li>
                <li>Service interruptions or system failures</li>
                <li>Unauthorized access to or alteration of your transmissions or data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">6.2 Maximum Liability</h3>
              <p className="text-muted-foreground">
                Our total liability to you for all claims arising from or related to the Service shall not 
                exceed the amount you have paid us in the past twelve months, which for free users is zero dollars ($0).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">6.3 Jurisdictional Limitations</h3>
              <p className="text-muted-foreground">
                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, 
                so some of the above exclusions may not apply to you.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Privacy and Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">7.1 Privacy Policy</h3>
              <p className="text-muted-foreground">
                Your use of our Service is also governed by our Privacy Policy, which is incorporated into 
                these Terms by reference. Please review our Privacy Policy to understand our practices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">7.2 Data Processing</h3>
              <p className="text-muted-foreground">
                All data processing occurs client-side in your browser. We do not collect, store, or have 
                access to the content you process through our tools. Your academic work remains completely 
                private and under your control.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">7.3 Analytics and Cookies</h3>
              <p className="text-muted-foreground">
                We use Google Analytics and display Google AdSense advertisements. These services may use 
                cookies and collect certain anonymous usage data as described in our Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">8.1 Our Intellectual Property</h3>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are owned by Macrohard Academic 
                Tools and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws. Our trademarks and trade dress may not be used without our prior 
                written consent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">8.2 User Content</h3>
              <p className="text-muted-foreground">
                You retain all rights to the content you process through our tools. We claim no ownership or 
                control over your academic work. By using our Service, you grant us no rights to your content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">8.3 Feedback</h3>
              <p className="text-muted-foreground">
                Any feedback, suggestions, or ideas you provide about the Service may be used by us without 
                any obligation to compensate you and without any retention of confidentiality.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Third-Party Services and Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">9.1 Third-Party Services</h3>
              <p className="text-muted-foreground">
                Our Service uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li><strong>Google Analytics:</strong> For usage analytics</li>
                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                <li><strong>Cloudflare:</strong> For content delivery and security</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                These services have their own terms and privacy policies. Your use of our Service constitutes 
                acceptance of these third-party terms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">9.2 External Links</h3>
              <p className="text-muted-foreground">
                Our Service may contain links to third-party websites. We are not responsible for the content, 
                privacy policies, or practices of these external sites. We encourage you to review the terms 
                and privacy policies of any third-party sites you visit.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You agree to defend, indemnify, and hold harmless Macrohard Academic Tools and its affiliates, 
              officers, directors, employees, and agents from and against any claims, damages, obligations, 
              losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
              <li>Your use of and access to the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content processed through the Service</li>
              <li>Any damage caused to third parties through your use of the Service</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">11.1 Termination by You</h3>
              <p className="text-muted-foreground">
                You may stop using our Service at any time without notice to us.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">11.2 Termination by Us</h3>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your access to the Service immediately, without 
                prior notice or liability, for any reason, including if you breach these Terms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">11.3 Effect of Termination</h3>
              <p className="text-muted-foreground">
                Upon termination, your right to use the Service will immediately cease. All provisions of these 
                Terms that by their nature should survive termination shall survive.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Governing Law and Disputes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">12.1 Governing Law</h3>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">12.2 Dispute Resolution</h3>
              <p className="text-muted-foreground">
                Any disputes arising from these Terms or your use of the Service shall be resolved through 
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">12.3 Class Action Waiver</h3>
              <p className="text-muted-foreground">
                You agree to resolve any disputes on an individual basis and waive your right to participate 
                in any class action lawsuit or class-wide arbitration.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Modifications to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a 
              revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-muted-foreground">
              Your continued use of the Service after such modifications constitutes your acceptance of the 
              updated Terms. If you do not agree to the new Terms, please stop using the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14. Miscellaneous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">14.1 Entire Agreement</h3>
              <p className="text-muted-foreground">
                These Terms constitute the entire agreement between you and Macrohard Academic Tools regarding 
                the use of the Service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">14.2 Severability</h3>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will 
                continue to be valid and enforceable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">14.3 Waiver</h3>
              <p className="text-muted-foreground">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver 
                of those rights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">14.4 Assignment</h3>
              <p className="text-muted-foreground">
                You may not assign or transfer these Terms without our prior written consent. We may assign 
                our rights and obligations without restriction.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>15. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> legal@macrohard-academic.com</p>
              <p><strong>Website:</strong> https://macrohard-academic.com/contact</p>
              <p><strong>Response Time:</strong> 3-5 business days for legal inquiries</p>
            </div>
            <p className="text-muted-foreground mt-4">
              For general support questions, please contact support@macrohard-academic.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}