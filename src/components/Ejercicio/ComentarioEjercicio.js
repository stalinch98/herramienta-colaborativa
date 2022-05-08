import {Button, Col, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import Text from "antd/lib/typography/Text";
import {PATH_EJERCICIO} from "../../config/rutasAPI";
import clienteAxios from "../../config/axios";
import {mostrarMsg} from "../../utils";

const ComentarioEjercicio = (data) => {
    const [comentario, setComentario] = useState('');
    const handleChange = (e) => {
        setComentario(e.target.value);
    };
    const handleInsertComentario = async () => {
        let dataToUpdate = {
            comentario
        };

        try {
            await clienteAxios.put(`${PATH_EJERCICIO}/${data.data.id}`, dataToUpdate);
            mostrarMsg("Añadir comentario", "success");
        } catch (error) {
            console.log(error.response.data.msg);
            mostrarMsg("Añadir comentario", "error");
        }
    };
    return (
        <>
            <Row>
                <Col>
                    <Text strong>Comentario: </Text>
                    <TextArea
                        onChange={handleChange}
                        placeholder="Escribe aquí tu comentario"
                        defaultValue={data.data.comentario}
                    />
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: 2}}>
                    <Button type="primary" onClick={handleInsertComentario}>
                        Agrear Comentario
                    </Button>
                </Col>
            </Row>
        </>
    );

}
export default ComentarioEjercicio;