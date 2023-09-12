export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section className="flex flex-col items-center justify-center h-screen w-screen">
        {children}
      </section>
  )
}
