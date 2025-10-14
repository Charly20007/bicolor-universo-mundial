import { useMemo, useState } from "react";

export type PlayerRow = {
  id: string | number;
  name: string;
  position: string;
  avatarUrl?: string;
  pitchImgUrl?: string;
  matches: number;
  minutes: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
};

type SortKey = keyof Pick<
  PlayerRow,
  "name" | "position" | "matches" | "minutes" | "goals" | "assists" | "yellow" | "red"
>;

type Props = {
  rows: PlayerRow[];
  onRowClick?: (row: PlayerRow) => void;
};

export default function PlayerTable({ rows, onRowClick }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const sorted = useMemo(() => {
    const clone = [...rows];
    clone.sort((a, b) => {
      const va = a[sortKey] as any;
      const vb = b[sortKey] as any;
      if (typeof va === "string") return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortAsc ? va - vb : vb - va;
    });
    return clone;
  }, [rows, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="pt">
      <div className="pt__table" role="table" aria-label="Tabla de futbolistas">
        {/* Header */}
        <div className="pt__row pt__row--head" role="row">
          <div className="pt__cell pt__cell--player" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("name")}>
              Jugador <SortIcon active={sortKey === "name"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell pt__cell--pos" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("position")}>
              Posición <SortIcon active={sortKey === "position"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("matches")}>
              Partidos <SortIcon active={sortKey === "matches"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("minutes")}>
              Minutos <SortIcon active={sortKey === "minutes"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("goals")}>
              Goles <SortIcon active={sortKey === "goals"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell" role="columnheader">
            <button type="button" className="pt__sort" onClick={() => handleSort("assists")}>
              Asistencias <SortIcon active={sortKey === "assists"} asc={sortAsc} />
            </button>
          </div>
          <div className="pt__cell pt__cell--card" role="columnheader" title="Amarillas">
            <span className="pt__card pt__card--y" aria-hidden />
            <SortIcon
              small
              active={sortKey === "yellow"}
              asc={sortAsc}
              onClick={() => handleSort("yellow")}
              asButton
            />
          </div>
          <div className="pt__cell pt__cell--card" role="columnheader" title="Rojas">
            <span className="pt__card pt__card--r" aria-hidden />
            <SortIcon
              small
              active={sortKey === "red"}
              asc={sortAsc}
              onClick={() => handleSort("red")}
              asButton
            />
          </div>
        </div>

        {/* Rows */}
        {sorted.map((r) => (
          <div key={r.id} className="pt__row" role="row" onClick={() => onRowClick?.(r)}>
            <div className="pt__cell pt__cell--player" role="cell">
              <div className="pt__avatarWrap">
                {r.avatarUrl ? (
                  <img className="pt__avatar" src={r.avatarUrl} alt={r.name} />
                ) : (
                  <span className="pt__avatar pt__avatar--placeholder" aria-hidden />
                )}
              </div>
              <div className="pt__name">
                <span className="pt__nameTop">{r.name.split(" ")[0]}</span>
                <span className="pt__nameBottom">{r.name.split(" ").slice(1).join(" ")}</span>
              </div>
            </div>

            <div className="pt__cell pt__cell--pos" role="cell">
              {r.pitchImgUrl ? (
                <img
                  className="pt__pitch"
                  src={r.pitchImgUrl}
                  alt={`Mapa posición ${r.position}`}
                />
              ) : (
                <span className="pt__pitch pt__pitch--placeholder" aria-hidden />
              )}
            </div>

            <div className="pt__cell" role="cell">
              {r.matches}
            </div>
            <div className="pt__cell" role="cell">
              {r.minutes}
            </div>
            <div className="pt__cell" role="cell">
              {r.goals}
            </div>
            <div className="pt__cell" role="cell">
              {r.assists}
            </div>
            <div className="pt__cell pt__cell--cardVal" role="cell">
              {r.yellow}
            </div>
            <div className="pt__cell pt__cell--cardVal" role="cell">
              {r.red}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ——— Ícono de ordenar ——— */
function SortIcon({
  active,
  asc,
  small,
  onClick,
  asButton,
}: {
  active?: boolean;
  asc?: boolean;
  small?: boolean;
  onClick?: () => void;
  asButton?: boolean;
}) {
  const cls = [
    "pt__sortIcon",
    active ? "is-active" : "",
    asc ? "is-asc" : "is-desc",
    small ? "is-sm" : "",
  ].join(" ");
  const content = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10l5-6 5 6H7zm0 4l5 6 5-6H7z" fill="currentColor" />
    </svg>
  );
  if (asButton) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-label="Ordenar">
        {content}
      </button>
    );
  }
  return <span className={cls}>{content}</span>;
}
