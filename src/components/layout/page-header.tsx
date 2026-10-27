export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="mb-10 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description && (
        <p className="max-w-prose text-muted-foreground">{description}</p>
      )}
    </header>
  )
}
