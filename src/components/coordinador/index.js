import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import AntHeader from "../layout/AntHeader";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import VerCoordinador from "./VerCoordinador";

function Coordinador() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
  }, []);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"coordinar"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={"Asignaturas"}
                subtitulo={"Asignaturas actuales a coordinar"}
              />

              <div className="col-md-12 mt-4">
                <VerCoordinador />
              </div>

              <div class="bg-light clearfix">
                <span>Click any button to proceed</span>
                <button type="button" class="btn btn-warning float-right">
                  Save
                </button>
                <button type="button" class="btn btn-primary float-right">
                  Cancel
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Coordinador;
