'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

export default function ChildrenLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        {children}
      </main>
    </QueryClientProvider>
  )
}