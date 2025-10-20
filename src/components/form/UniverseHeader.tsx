import React from 'react';

type Props = {
  bgUrl: string;
  logoUrl: string;
  onClickGeneral?: () => void;
  onClickMatches?: () => void;
};

const UniverseHeader = ({
  bgUrl,
  logoUrl,
  onClickGeneral,
  onClickMatches,
}: Props) => {
  return (
    <header className="uheader">
      {/* Banner de fondo */}
      <div
        className="uheader__hero"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <img className="uheader__logo" src={logoUrl} alt="Universo Bicolor" />
      </div>

      {/* Texto descriptivo */}
      <p className="uheader__lead">
        Revisa los datos y el historial de todos los jugadores convocados rumbo
        al Mundial 2030 actualizado fecha a fecha.
      </p>

      {/* Botones */}
      <div className="uheader__cta">
        <button
          className="btn btn--primary"
          type="button"
          onClick={onClickGeneral}
        >
          INFORMACIÓN GENERAL
        </button>
        <button
          className="btn btn--neutral"
          type="button"
          onClick={onClickMatches}
        >
          VER TODOS LOS PARTIDOS
        </button>
      </div>
    </header>
  );
}

export default UniverseHeader
