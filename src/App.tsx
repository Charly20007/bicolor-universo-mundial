import { useState } from "react";
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

  return (
    <>
      <Header />
      <UniverseHeader
        bgUrl="https://elcomercio.pe/resizer/v2/6YPDFIHE3VDDRHWLZY7QZXBSTA.png?auth=49375be2f3ffd8da51a1fb192ee7b23b3dc6be223c45f95e0fea477f8d14b25e"
        onClickGeneral={() => setView("general")}
        onClickMatches={() => setView("matches")}
        mobileBgUrl="https://elcomercio.pe/resizer/v2/7QNEOIXVEFF6NJIFLLU35LYS5U.png?auth=528b607386375ca4d2d773d4b8e352498fe31358327b2eefa4eafe32fd9b08f4"
      />

      {view === "general" ? <PlayersPage /> 
      : <MatchesPage />}
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
