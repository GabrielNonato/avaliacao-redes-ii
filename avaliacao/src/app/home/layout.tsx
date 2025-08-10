export const metadata = {
  title: 'Next.js Application',
  description: 'This is a Next.js application built with TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="This is a Next.js application built with TypeScript" />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
