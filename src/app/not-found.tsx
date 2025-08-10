import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 min-h-[70vh] flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-8xl font-bold text-primary">404</h1>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg mt-2">
            Oops! The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tech-news" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Browse Tech News
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4 text-center">Popular Pages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <Link href="/tech-news" className="text-primary hover:underline">
                Tech News
              </Link>
              <Link href="/musk-news" className="text-primary hover:underline">
                Musk Updates
              </Link>
              <Link href="/ai-tools" className="text-primary hover:underline">
                AI Tools
              </Link>
              <Link href="/startup" className="text-primary hover:underline">
                Startup Hub
              </Link>
              <Link href="/developer" className="text-primary hover:underline">
                Developer Hub
              </Link>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}