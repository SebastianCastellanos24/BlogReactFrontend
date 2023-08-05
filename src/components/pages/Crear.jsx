import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { PeticionAjax } from '../../helpers/PeticionAjax.jsx';
import { Global } from '../../helpers/Global.jsx';

const Crear = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState("no_enviado")

    const guardarArticulo = async (e) => {
        e.preventDefault();

        //Recoger datos form
        let nuevoArticulo = formulario;

        //Guardar articulo en el backend
        const { datos } = await PeticionAjax(`${Global.url}crear`, "POST", nuevoArticulo);

        if (datos.status === "Success") {
            setResultado("guardado");
        } else {
            setResultado("error");
        }

        //Subir imagen
        const fileInput = document.querySelector("#file");

        if (datos.status === "Success" && fileInput.files[0]) {
            setResultado("guardado");

            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const subida = await PeticionAjax(`${Global.url}subir-imagen/${datos.articulo._id}`, "POST", formData, true);
        
            if (subida.datos.status === "Success") {
                setResultado("guardado");
            } else {
                setResultado("error");
            }
        } 

    }

    return (
        <div className='jumbo'>
            <h1>Crea tu articulo aquí</h1>
            <p>Formulario para crear un articulo</p>

            <p>{resultado == "guardado" ? "Articulo guarado con exito" : ""}</p>
            <p>{resultado == "error" ? "Los datos porporcionados son incorrectos" : ""}</p>

            {/* Montar el formulario */}
            <form className='formulario' onSubmit={guardarArticulo}>

                <div className='form-group'>
                    <label htmlFor='titulo'>Titulo</label>
                    <input type='text' name='titulo' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido</label>
                    <textarea type='text' name='contenido' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='file0'>Imagen</label>
                    <input type='file' name='file0' id='file' />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    )
}

export default Crear