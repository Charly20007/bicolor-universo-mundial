// useScores.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { googleSheetKey, keyData, query, staleTime, sheetGid } from '../types/constants';
import { Row } from '../types/types';

const buildUrl = () => {
  const base = `https://docs.google.com/spreadsheets/d/${googleSheetKey}/gviz/tq`;
  const params = new URLSearchParams({
    tq: query,          // 'select *'
    tqx: 'out:json',
    gid: sheetGid,      // '0'
  });
  return `${base}?${params.toString()}`;
};

const getScores = async (): Promise<Row[]> => {
  const url = buildUrl();
  const { data } = await axios.get(url, { responseType: 'text' });

  const json = JSON.parse(
    data.replace(/^[^{]+/, '').replace(/[^}]+$/, '')
  );

  const rows = json.table.rows || [];

  return rows.map((r: any) => ({
    jugadorImagen: r.c[0]?.v || '',
    jugador: r.c[1]?.v || '',
    posicionImagen: r.c[2]?.v || '',
    posicion: r.c[3]?.v || '',
    partidos: Number(r.c[4]?.v || 0),
    minutos: Number(r.c[5]?.v || 0),
    goles: Number(r.c[6]?.v || 0),
    asistencias: Number(r.c[7]?.v || 0),
    tarjetasAmarillas: Number(r.c[8]?.v || 0),
    tarjetasRojas: Number(r.c[9]?.v || 0),
  }));
};

export const useScores = () =>
  useQuery<Row[]>({
    queryKey: [keyData, query, sheetGid, googleSheetKey],
    queryFn: getScores,
    staleTime,
    retry: 1,
  });

