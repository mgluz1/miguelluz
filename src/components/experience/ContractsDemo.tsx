import type { CSSProperties } from "react";
import { Window } from "../ui/Window";

/**
 * Ilustração de uma planilha de controle de vigência com alertas.
 * Dados sintéticos — não representa contratos ou documentos internos.
 */
const ROWS = [
  { id: "Contrato 00/2026-A", obj: "Serviço fictício A", days: 9, state: "alert" },
  { id: "Contrato 00/2026-B", obj: "Serviço fictício B", days: 38, state: "warn" },
  { id: "Contrato 00/2025-C", obj: "Serviço fictício C", days: 142, state: "ok" },
  { id: "Contrato 00/2025-D", obj: "Serviço fictício D", days: 210, state: "ok" },
] as const;

const LABEL = { alert: "renovar", warn: "acompanhar", ok: "vigente" };

export function ContractsDemo() {
  return (
    <figure className="contracts">
      <Window title="controle-vigencia.xlsx" aside={<span className="contracts__badge mono">1 alerta</span>}>
        <table className="contracts__table">
          <thead>
            <tr className="mono">
              <th scope="col">Contrato</th>
              <th scope="col">Vence em</th>
              <th scope="col">Situação</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.id} className={`contracts__row--${r.state}`} style={{ "--r": i } as CSSProperties}>
                <td>
                  <span className="contracts__id">{r.id}</span>
                  <span className="contracts__obj">{r.obj}</span>
                </td>
                <td className="mono">{r.days} dias</td>
                <td>
                  <span className={`contracts__chip contracts__chip--${r.state} mono`}>{LABEL[r.state]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Window>
      <figcaption className="contracts__caption mono">
        Ilustração com dados sintéticos · alertas de prazo em planilha automatizada.
      </figcaption>
    </figure>
  );
}
