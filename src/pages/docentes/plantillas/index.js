import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import { Tabs } from "antd";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import Migas from "../../../components/layout/Migas";
import VerPlantilla from "../../../components/plantillas/VerPlantillas";
import PlantillaForm from "../../../components/plantillas/PlantillaForm";

function Plantillas() {
  // tabs
  const { TabPane } = Tabs;

  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    buscarAsignaturasCoordinador,
  } = asignaturaContext;

  useEffect(() => {
    if (usuario) {
      if (usuario?.rol !== "docente") {
        history.push("/usuarios");
      }
    } else {
      usuarioAutenticado();
    }
    // Cargar las asignaturas que coordina
    buscarAsignaturasCoordinador();

    // Verificar si es coordinador de dicha asignatura
    if (asignaturas) {
      const busqueda = asignaturas.find((asignatura) => asignatura._id === id);
      if (!busqueda) {
        history.push(`/dashboard`);
      } else {
        setAsignatura(busqueda);
      }
    }

    // eslint-disable-next-line
  }, [nuevocambio]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"plantillas"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <Migas
                rutas={[
                  {
                    path: "/dashboard",
                    nombre: "Dashboard",
                  },
                  {
                    path: "/asignatura/" + asignatura._id,
                    nombre: capitalize(asignatura.nombre),
                  },
                  {
                    path: null,
                    nombre: "Plantilla",
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-12 mb-3">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Listado de plantilla" key="1">
                      <VerPlantilla idAsignatura={id} />
                    </TabPane>
                    <TabPane tab="Crear plantilla" key="2">
                      <PlantillaForm idAsignatura={id} />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Plantillas;
