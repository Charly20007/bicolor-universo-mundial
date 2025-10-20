// src/components/PlayersPage/PlayersPage.tsx
import { useMemo, useState, FormEvent, useEffect } from 'react';
import { useScores } from '../../hooks/userPlayer';
import MatchAccordion from '../accordion/MatchAccordion';
import { PlayerRow } from '../../types/types';

// ——— Normaliza string (sin acentos, minúsculas) ———
function norm(s: string) {
  return s
    .normalize('NFD')
    // @ts-ignore — usar clase Unicode para diacríticos
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

type PlayersPageProps = {
  /** Query controlada por el padre (UniverseHeader). Si no la pasas, el componente es "no controlado". */
  query?: string;
  /** Callback opcional si quieres levantar el estado al padre. */
  onQueryChange?: (q: string) => void;
};
    
export default function MatchesPage({ query, onQueryChange }: PlayersPageProps) {
  const { data, isLoading, isError } = useScores();

  // Estado interno solo si no hay query controlada
  const [qLocal, setQLocal] = useState('');
  // Valor efectivo (controlado o no)
  const q = query ?? qLocal;

  // Si quieres que el input interno siga los cambios del padre:
  useEffect(() => {
    if (query !== undefined) setQLocal(query);
  }, [query]);

  const rows: PlayerRow[] = useMemo(() => {
    if (!data) return [];
    return data.map((r: any, idx: number) => ({
      id: idx,
      name: r.jugador,
      avatarUrl: r.jugadorImagen || undefined,
      pitchImgUrl: r.posicionImagen || undefined,
      matches: r.partidos ?? 0,
      minutes: r.minutos ?? 0,
      goals: r.goles ?? 0,
      assists: r.asistencias ?? 0,
      yellow: r.tarjetasAmarillas ?? 0,
      red: r.tarjetasRojas ?? 0,
    }));
  }, [data]);

  if (isLoading) return <p>Cargando jugadores…</p>;
  if (isError) return <p>Hubo un error al cargar los datos.</p>;

  return (
    <>
      <MatchAccordion dateLabel="10 de octubre de 2025 (Amistoso)" title="Chile 2 - 2 Perú" venue="Estadio Bicentenario de La Florida - CHILE" rows={rows} defaultOpen={true}/>
    </>
  );
}
