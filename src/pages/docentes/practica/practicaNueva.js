import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import Migas from "../../../components/layout/Migas";
import PracticaForm from "../../../components/practica/PracticaForm";

function PracticaNueva() {
  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");
  // const [tipo, setTipo] = useState("");
  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    asignaturasDocente,
    buscarAsignaturasCoordinador,
    buscarAsignaturasDocente,
  } = asignaturaContext;

  useEffect(() => {
    if (usuario) {
      if (usuario?.rol === "administrador") {
        history.push("/usuarios");
      }
    } else {
      usuarioAutenticado();
    }
    // Cargar las asignaturas que coordina
    buscarAsignaturasCoordinador();
    buscarAsignaturasDocente();
    // Verificar si es coordinador o docente de dicha asignatura
    if (asignaturas) {
      //Busqueda si es coordinador
      const busqueda = asignaturas.find((item) => item._id === id);
      if (!busqueda) {
        //Busqueda si es docente
        const busquedaDocente = asignaturasDocente.find(
          (item) => item._id === id
        );
        if (!busquedaDocente) {
          history.push(`/dashboard`);
        } else {
          setAsignatura(busquedaDocente);
        }
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
      <Nav activa={"practicas"} />

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
                    path: "/practicas/" + asignatura._id,
                    nombre: "Practicas",
                  },
                  {
                    path: null,
                    nombre: "Nueva Practica",
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-12 mb-3 mt-2">
                  <PracticaForm idAsignatura={id} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default PracticaNueva;
