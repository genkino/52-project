import '../globals.css'
import { sitePath } from '@/lib/site'

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" type="image/svg+xml" href={sitePath('/favicon.svg')} /></head>
      <body>{children}</body>
    </html>
  )
}
