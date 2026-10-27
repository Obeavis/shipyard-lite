import type { Metadata } from "next"
import { Suspense } from "react"

import { Board, BoardSkeleton } from "@/components/issues/board"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Board" }

export default function BoardPage() {
  return (
    <>
      <PageHeader
        title="Board"
        description="Every issue, grouped by where it is in the flow."
      />
      <Suspense fallback={<BoardSkeleton />}>
        <Board />
      </Suspense>
    </>
  )
}
