import './App.css';
import './scss/header.scss'
import './scss/universe-header.scss'
import "./scss/FooterCredits.scss";
import "./scss/PlayerTable.scss";

import Header from './components/common/Header';
import UniverseHeader from './components/form/UniverseHeader';
import FooterCredits from './components/common/Footer';
import PlayersPage from './components/PlayersPage/PlayersPage';

const App = () => {
  return (
    <>
      <Header />
      <UniverseHeader
        bgUrl="https://elcomercio.pe/resizer/v2/6YPDFIHE3VDDRHWLZY7QZXBSTA.png?auth=49375be2f3ffd8da51a1fb192ee7b23b3dc6be223c45f95e0fea477f8d14b25e"
        logoUrl="https://elcomercio.pe/resizer/v2/6YPDFIHE3VDDRHWLZY7QZXBSTA.png?auth=49375be2f3ffd8da51a1fb192ee7b23b3dc6be223c45f95e0fea477f8d14b25e"
        onClickGeneral={() => console.log('Información general')}
        onClickMatches={() => console.log('Ver todos los partidos')}
        onSearch={(q) => console.log('Buscar:', q)}
      />
      <PlayersPage />
      <FooterCredits
        logoUrl="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/fichajes-futbol-peruano-transferencias-ventas-prestamos-pases-libres-2005-actualidad-historial/img/logo.png" // deja el espacio si aún no lo tienes
        logoAlt="El Comercio"
        credits={[
          { label: "Investigación",  name: "Raúl Castillo" },
          { label: "Diseño",        name: "Christian Marlow" },
          { label: "Programación",  name: "David Condori" },
        ]}
      />
    </>
  );
}

export default App;
