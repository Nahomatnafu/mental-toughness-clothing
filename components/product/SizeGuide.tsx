import { sizeGuides, type SizeGuideKey } from "@/content/size-guide";
import type { Product } from "@/content/products";

export function SizeGuide({ guide, open, product }: { guide: SizeGuideKey; open?: boolean; product?: Product }) {
  if (product?.source) return <details className="disclosure" id="size-guide" open={open}>
    <summary>Size guide</summary>
    <div className="pb-6">
      {product.sizeChart ? <div className="overflow-x-auto"><table className="spec-table">
        <caption className="sr-only">{product.name} garment measurements in inches</caption>
        <thead><tr><th scope="col">Measurement</th>{product.sizeChart.sizes.map(s=><th scope="col" key={s}>{s}</th>)}</tr></thead>
        <tbody>{product.sizeChart.rows.map(row=><tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value,i)=><td key={i}>{value}</td>)}</tr>)}</tbody>
      </table></div> : <p className="text-body-sm text-bone">Sizes {product.sizes.join(", ")}. Available sizes vary by color. Contact us for help choosing your fit.</p>}
      {product.sizeChart ? <p className="mt-4 text-body-sm text-bone">Measurements in inches, with the garment laid flat. Compare with a similar item you already own.</p> : null}
    </div>
  </details>;
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
