import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

import Login from "./pages/auth/Login";
import Usuarios from "./pages/administrador/usuarios";
import Carreras from "./pages/administrador/carreras";
import Periodos from "./pages/administrador/periodos";
import Asignaturas from "./pages/administrador/asignaturas";
import Asignatura from "./pages/docentes/asignatura";

import Dashboard from "./pages/docentes/dashboard";
import Temas from "./pages/docentes/temas";
import Referencias from "./pages/docentes/referencias";
import Plantillas from "./pages/docentes/plantillas";
import Plantilla from "./pages/docentes/plantillas/plantilla";

import Practicas from "./components/practicas";
import PracticaForm from "./components/practicas/PracticaForm";
import GestionarPractica from "./components/practicas/GestionarPractica";
import Practica from "./components/practicas/Practica";

import tokenAuth from "./config/token";
import RutaPrivada from "./privado/RutaPrivada";
import Context from "./context";
import NotFound from "./components/layout/NotFound";

// Si se encuentra logueado al recargar la pagina
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <Context>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <RutaPrivada exact path="/usuarios" component={Usuarios} />
          <RutaPrivada exact path="/carreras" component={Carreras} />
          <RutaPrivada exact path="/periodos" component={Periodos} />
          <RutaPrivada exact path="/asignaturas" component={Asignaturas} />

          <RutaPrivada exact path="/asignatura/:id" component={Asignatura} />
          <RutaPrivada exact path="/dashboard" component={Dashboard} />

          <RutaPrivada exact path="/temas/:id" component={Temas} />
          <RutaPrivada exact path="/referencias/:id" component={Referencias} />
          <RutaPrivada exact path="/plantillas/:id" component={Plantillas} />
          <RutaPrivada
            exact
            path="/plantillas/:id/:idplantilla"
            component={Plantilla}
          />

          <RutaPrivada exact path="/practicas" component={Practicas} />
          <RutaPrivada exact path="/practicas/:id" component={Practica} />
          <RutaPrivada
            exact
            path="/gestionar/practicas/:id"
            component={PracticaForm}
          />
          <RutaPrivada
            exact
            path="/gestionar/practicas"
            component={GestionarPractica}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
