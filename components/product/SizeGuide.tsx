import { sizeGuides, type SizeGuideKey } from "@/content/size-guide";

export function SizeGuide({ guide, open }: { guide: SizeGuideKey; open?: boolean }) {
  const g = sizeGuides[guide];
  return (
    <details className="disclosure" id="size-guide" open={open}>
      <summary>Size guide — {g.title.toLowerCase()}</summary>
      <div className="pb-6">
        <div className="overflow-x-auto">
          <table className="spec-table">
            <caption className="sr-only">{g.title} measurements in inches, garment laid flat</caption>
            <thead>
              <tr>
                <th scope="col">Size</th>
                {g.columns.map((c) => (
                  <th key={c} scope="col">
                    {c} (in)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.size}>
                  <td>{r.size}</td>
                  {g.columns.map((c) => (
                    <td key={c} className="text-bone">
                      {r.measurements[c]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-body-sm text-bone">{g.fitNote}</p>
        <ul className="mt-3 space-y-1.5 text-body-sm text-bone">
          {g.howToMeasure.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="eyebrow mt-4 text-ash">Typical figures for this garment type. Final measurements follow the chosen blank.</p>
      </div>
    </details>
  );
}
