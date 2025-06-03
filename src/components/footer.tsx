import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center text-center sm:text-left sm:justify-items-start">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Pokemon Cruise</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Cruises</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cruises?region=kanto" className="text-sm text-muted-foreground hover:text-foreground">
                  Kanto Region
                </Link>
              </li>
              <li>
                <Link href="/cruises?region=johto" className="text-sm text-muted-foreground hover:text-foreground">
                  Johto Region
                </Link>
              </li>
              <li>
                <Link href="/cruises?region=hoenn" className="text-sm text-muted-foreground hover:text-foreground">
                  Hoenn Region
                </Link>
              </li>
              <li>
                <Link href="/cruises/featured" className="text-sm text-muted-foreground hover:text-foreground">
                  Featured Cruises
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-bold">Pokemon Cruise</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
              &copy; {new Date().getFullYear()} Pokemon Cruise. All rights reserved. Pokemon and Pokemon character names are trademarks of Nintendo.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
