type SectionLabelProps = {
  index: string;
  children: string;
};

/**
 * The identity motif: a brass index and label over a hairline rule.
 * Repeated at the top of every section so the page reads as one hand.
 */
export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="eyebrow tabular-nums">{index}</span>
      <span className="rule min-w-8 flex-1" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
