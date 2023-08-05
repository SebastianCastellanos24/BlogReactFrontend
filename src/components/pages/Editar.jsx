import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { PeticionAjax } from '../../helpers/PeticionAjax.jsx';
import { Global } from '../../helpers/Global.jsx';
import { useParams } from 'react-router-dom';

const Editar = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState("no_enviado")
    const [articulo, setArticulo] = useState([]);

    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, [])

    const conseguirArticulo = async () => {
        const url = `${Global.url}articulo/${params.id}`;

        const { datos } = await PeticionAjax(url, "GET");


        if (datos.status === "success") {
            setArticulo(datos.articulo)
        }

    }

    const editarArticulo = async (e) => {
        e.preventDefault();

        //Recoger datos form
        let nuevoArticulo = formulario;

        //Guardar articulo en el backend
        const { datos } = await PeticionAjax(`${Global.url}articulo/${params.id}`, "PUT", nuevoArticulo);

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
            <h1>Edita tu articulo aquí</h1>
            <p>Formulario para editar: {articulo.titulo}</p>

            <p>{resultado == "guardado" ? "Articulo guarado con exito" : ""}</p>
            <p>{resultado == "error" ? "Los datos porporcionados son incorrectos" : ""}</p>

            {/* Montar el formulario */}
            <form className='formulario' onSubmit={editarArticulo}>

                <div className='form-group'>
                    <label htmlFor='titulo'>Titulo</label>
                    <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido</label>
                    <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
                </div>

                <div className='form-group'>
                    <label htmlFor='file0'>Imagen</label>
                    <div className='mascara'>
                        {articulo.imagen != "default.png" && <img src={`${Global.url}imagen/${articulo.imagen}`} />}
                        {articulo.imagen == "default.png" && <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png' />}
                    </div>
                    <input type='file' name='file0' id='file' />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    )
}

export default Editar