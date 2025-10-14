import React from 'react'

type Props = {
  bgUrl: string
  logoUrl: string
  onClickGeneral?: () => void
  onClickMatches?: () => void
  onSearch?: (q: string) => void
}

export default function UniverseHeader({
  bgUrl,
  logoUrl,
  onClickGeneral,
  onClickMatches,
  onSearch,
}: Props) {
  const [q, setQ] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(q.trim())
  }

  return (
    <header className="uheader">
      {/* Banner de fondo */}
      <div className="uheader__hero" style={{ backgroundImage: `url(${bgUrl})` }}>
        <img className="uheader__logo" src={logoUrl} alt="Universo Bicolor" />
      </div>

      {/* Texto descriptivo */}
      <p className="uheader__lead">
        Revisa los datos y el historial de todos los jugadores convocados
        rumbo al Mundial 2030 actualizado fecha a fecha.
      </p>

      {/* Botones */}
      <div className="uheader__cta">
        <button className="btn btn--primary" type="button" onClick={onClickGeneral}>
          INFORMACIÓN GENERAL
        </button>
        <button className="btn btn--neutral" type="button" onClick={onClickMatches}>
          VER TODOS LOS PARTIDOS
        </button>
      </div>

      {/* Buscador */}
      <form className="uheader__search" onSubmit={handleSubmit} role="search">
        <input
          type="search"
          placeholder="Busca un jugador"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Busca un jugador"
        />
        <button type="submit" aria-label="Buscar">
          {/* ícono lupa */}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79L20 21.5 21.5 20l-6-6zM6.5 11a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </header>
  )
}
