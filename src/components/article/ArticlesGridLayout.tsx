'use client'

export default function ArticlesGridLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex justify-center mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-16 gap-y-8 auto-rows-[400px]">
        {children}
      </div>
    </div>
  )
}
