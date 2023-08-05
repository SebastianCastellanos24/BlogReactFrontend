import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import Listado from './Listado';

const Articulo = () => {

    const [articulo, setArticulo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, [])

    const conseguirArticulo = async () => {
        const url = `${Global.url}articulo/${params.id}`;

        const { datos, cargando } = await PeticionAjax(url, "GET");


        if (datos.status === "success") {
            setArticulo(datos.articulo)
        }
        setCargando(false)
    }

    return (
        <>
            <div className='jumbo'>
                {cargando ? "Cargando..." :
                    (
                        <>
                            <div className='mascara'>
                                {articulo.imagen != "default.png" && <img src={`${Global.url}imagen/${articulo.imagen}`} />}
                                {articulo.imagen == "default.png" && <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png' />}
                            </div>
                            <h1>{articulo.titulo}</h1>
                            <p>{articulo.fecha}</p>
                            <p>{articulo.contenido}</p>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Articulo