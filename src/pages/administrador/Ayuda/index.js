import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "../../../assets/statics/Manual_Coordinador.pdf";
import AuthContext from "../../../context/auth/authContext";
import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import Iframe from 'react-iframe'
import AntHeader from "../../../components/layout/AntHeader";
import Manual_Administrador from "../../../../src/assets/statics/Manual_Administrador.pdf";
import Manual_Coordinador from "../../../../src/assets/statics/Manual_Coordinador.pdf";
import Manual_Docente from "../../../../src/assets/statics/Manual_Docente.pdf";


function Ayuda() {
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado} = authContext;

    //
    useEffect(() => {
        usuarioAutenticado();
    }, []);

    if (!usuario) return null;
console.log(usuario.rol);
    return (
        <>
            <Header/>
            <Nav activa={"ayuda"}/>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="row">
                            <AntHeader
                                titulo={"Ayuda"}
                                subtitulo={"Manual de usuario"}
                            />
                            <div className="mt-4 row">

                                <Iframe
                                    url={usuario.rol === "administrador" ? Manual_Administrador : (usuario.rol === "docente" ? Manual_Docente : Manual_Coordinador)}
                                    width="900px"
                                    height="800px"
                                    overflow="hidden"
                                    display="initial"
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        </>
    );
}

export default Ayuda;
