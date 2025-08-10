import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileJson, 
  Hash, 
  QrCode, 
  FileText, 
  Binary,
  Type,
  Calculator,
  Palette,
  Clock,
  Link2,
  Code,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Academic Tools for Students & Researchers - Macrohard Academic',
  description: 'Free online academic tools for students, educators and researchers. Citation generator, GPA calculator, scientific calculator, unit converter, word counter and more. No registration required.',
  keywords: 'academic tools, citation generator, GPA calculator, scientific calculator, student tools, research tools, APA citation, MLA format, bibliography generator, free academic tools',
}

const tools = [
  {
    title: 'Citation Generator',
    description: 'Generate APA, MLA, Chicago & Harvard citations instantly',
    icon: FileText,
    href: '/tools/citation-generator',
    color: 'text-blue-600',
    category: 'Writing'
  },
  {
    title: 'Word Counter Pro',
    description: 'Advanced word, character, sentence and reading time analysis',
    icon: Type,
    href: '/tools/word-counter-pro',
    color: 'text-green-600',
    category: 'Writing'
  },
  {
    title: 'GPA Calculator',
    description: 'Calculate GPA with 4.0, 5.0 scales and grade predictions',
    icon: Calculator,
    href: '/tools/gpa-calculator',
    color: 'text-purple-600',
    category: 'Academic'
  },
  {
    title: 'Scientific Calculator',
    description: 'Advanced calculator for math, physics and engineering',
    icon: Calculator,
    href: '/tools/scientific-calculator',
    color: 'text-orange-600',
    category: 'Math'
  },
  {
    title: 'Unit Converter',
    description: 'Convert between metric, imperial and scientific units',
    icon: Binary,
    href: '/tools/unit-converter',
    color: 'text-indigo-600',
    category: 'Science'
  },
  {
    title: 'JSON Formatter',
    description: 'Format, validate and analyze JSON data for research',
    icon: FileJson,
    href: '/tools/json-formatter',
    color: 'text-red-600',
    category: 'Data'
  },
  {
    title: 'Base64 Encoder',
    description: 'Encode and decode data for academic projects',
    icon: Code,
    href: '/tools/base64',
    color: 'text-teal-600',
    category: 'Data'
  },
  {
    title: 'Hash Generator',
    description: 'Generate MD5, SHA hashes for data integrity',
    icon: Hash,
    href: '/tools/hash-generator',
    color: 'text-pink-600',
    category: 'Security'
  },
  {
    title: 'Text Compare',
    description: 'Compare texts and find differences for proofreading',
    icon: FileText,
    href: '/tools/text-compare',
    color: 'text-cyan-600',
    category: 'Writing'
  },
  {
    title: 'Pomodoro Timer',
    description: 'Study timer with focus sessions and breaks',
    icon: Clock,
    href: '/tools/pomodoro-timer',
    color: 'text-yellow-600',
    category: 'Study'
  },
  {
    title: 'LaTeX Converter',
    description: 'Convert LaTeX equations to Unicode and images',
    icon: Binary,
    href: '/tools/latex-converter',
    color: 'text-gray-600',
    category: 'Math'
  },
  {
    title: 'Bibliography Formatter',
    description: 'Format and organize reference lists',
    icon: FileText,
    href: '/tools/bibliography-formatter',
    color: 'text-amber-600',
    category: 'Writing'
  },
]

const categories = ['All', 'Writing', 'Academic', 'Math', 'Science', 'Data', 'Study', 'Security']

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Macrohard Academic Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Free academic tools for students, educators, and researchers. 
          Citation generators, calculators, and study aids - all working privately in your browser.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🎓</div>
          <h3 className="font-semibold mb-1">Academic Excellence</h3>
          <p className="text-sm text-muted-foreground">Tools designed for students and researchers</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold mb-1">100% Private</h3>
          <p className="text-sm text-muted-foreground">Your academic work stays on your device</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-semibold mb-1">Always Free</h3>
          <p className="text-sm text-muted-foreground">No registration or payment required</p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group block">
            <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 group-hover:scale-110 transition-transform duration-200`}>
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{tool.title}</CardTitle>
                    <span className="text-xs text-muted-foreground font-medium">{tool.category}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Academic Tools for Every Student</h2>
          <p>
            Macrohard Academic provides essential tools for students, educators, and researchers worldwide. 
            Our free online academic tools help you excel in your studies - from properly citing sources with our 
            citation generator to calculating your GPA, performing scientific calculations, and managing your study time. 
            Every tool is designed with academic excellence in mind.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Your Academic Data Stays Private</h2>
          <p>
            We understand the sensitive nature of academic work. That's why all our tools operate entirely in your 
            browser using client-side JavaScript. Your essays, research data, grades, and calculations never leave 
            your device. There's no cloud storage, no data collection, and no risk of your academic work being 
            accessed by others.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Essential Academic Tools</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Citation Generator:</strong> Create perfect APA, MLA, Chicago, and Harvard citations</li>
            <li><strong>GPA Calculator:</strong> Calculate and predict your academic performance</li>
            <li><strong>Word Counter Pro:</strong> Analyze essays with detailed statistics</li>
            <li><strong>Scientific Calculator:</strong> Solve complex mathematical problems</li>
            <li><strong>Unit Converter:</strong> Convert between metric, imperial, and scientific units</li>
            <li><strong>Pomodoro Timer:</strong> Optimize your study sessions with time management</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Supporting Academic Success</h2>
          <p>
            Macrohard Academic Tools is committed to supporting students and educators globally. Our tools are 
            completely free, require no registration, and work on any device. Whether you're writing a research paper, 
            preparing for exams, or managing coursework, our tools help you achieve academic excellence. Join thousands 
            of students who rely on our tools for their daily academic needs.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Why Choose Macrohard Academic?</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>100% Free:</strong> No hidden costs, subscriptions, or premium features</li>
            <li><strong>No Registration:</strong> Start using tools immediately without creating an account</li>
            <li><strong>Privacy Focused:</strong> Your academic work never leaves your browser</li>
            <li><strong>Academic Standards:</strong> Tools follow official citation styles and academic conventions</li>
            <li><strong>Mobile Friendly:</strong> Study anywhere with full mobile device support</li>
            <li><strong>Offline Capable:</strong> Once loaded, tools work without internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  )
}