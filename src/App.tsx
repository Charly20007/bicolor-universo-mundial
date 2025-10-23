import { useState } from "react";
import "./scss/_fonts.scss";

import "./scss/header.scss";
import "./scss/universe-header.scss";
import "./scss/FooterCredits.scss";
import "./scss/PlayerTable.scss";
import "./scss/match-accordion.scss";

import Header from "./components/common/Header";
import UniverseHeader from "./components/form/UniverseHeader";
import FooterCredits from "./components/common/Footer";
import PlayersPage from "./components/Page/PlayersPage";
import MatchesPage from "./components/Page/MatchesPage";

type View = "general" | "matches";

const App = () => {
  const [view, setView] = useState<View>("general");

  // base pública: respeta tu "homepage" en package.json
  const base = process.env.PUBLIC_URL || "";

  return (
    <>
      <Header />

      <UniverseHeader
        bgUrl={`${base}/img/universoBicolor.png`}
        mobileBgUrl={`${base}/img/MOBILE.png`}
        onClickGeneral={() => setView("general")}
        onClickMatches={() => setView("matches")}
      />

      {view === "general" ? <PlayersPage /> : <MatchesPage />}

      <FooterCredits
        logoUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/fichajes-futbol-peruano-transferencias-ventas-prestamos-pases-libres-2005-actualidad-historial/img/logo.png"
        logoAlt="El Comercio"
        credits={[
          { label: "Investigación", name: "Raúl Castillo" },
          { label: "Diseño", name: "Christian Marlow" },
          { label: "Programación", name: "David Condori" },
        ]}
      />
    </>
  );
};

export default App;
