import type { Metadata } from "next"
import { Suspense } from "react"

import {
  StatusSummary,
  StatusSummarySkeleton,
} from "@/components/issues/status-summary"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Overview" }

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Where the work stands across the board right now."
      />
      <Suspense fallback={<StatusSummarySkeleton />}>
        <StatusSummary />
      </Suspense>
    </>
  )
}
