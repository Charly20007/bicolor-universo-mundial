import { useMemo } from 'react';
import PlayerTable, { PlayerRow } from '../PlayerTable/PlayerTable';
import { useScores } from '../../hooks/userPlayer';

// Si quieres abreviar posición (Opcional)
const abbr = (pos?: string) => {
  if (!pos) return '';
  const p = pos.toLowerCase();
  if (p.includes('arquero')) return 'AR';
  if (p.includes('defensa')) return 'DF';
  if (p.includes('mediocampo') || p.includes('mediocampista') || p.includes('volante')) return 'MC';
  if (p.includes('delantero')) return 'DL';
  return pos.slice(0, 2).toUpperCase();
};

export default function PlayersPage() {
  const { data, isLoading, isError } = useScores();

  const rows: PlayerRow[] = useMemo(() => {
    if (!data) return [];
    return data.map((r, idx) => ({
      id: idx, // o usa un ID único si lo tienes en la hoja
      name: r.jugador,
      position: abbr(r.posicion),
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
    <PlayerTable
      rows={rows}
      onRowClick={(row) => {
        // Ejemplo: abrir modal o navegar
        console.log('Jugador seleccionado:', row);
      }}
    />
  );
}
