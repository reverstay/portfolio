export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted shrink-0 whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}
