import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import Listado from './Listado';

const Articulos = () => {

    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirArticulos();
    }, [])

    const conseguirArticulos = async () => {
        const url = `${Global.url}listar`;

        const { datos, cargando } = await PeticionAjax(url, "GET");


        if (datos.status === "success") {
            setArticulos(datos.articulos)
        }
        setCargando(false)
    }

    return (
        <>
            {cargando ? "Cargando..." : (
                articulos.length >= 1 ?
                    <Listado articulos={articulos} setArticulos={setArticulos} /> :
                    <h1>No hay articulos disponibles</h1>
            )}
        </>
    )
}

export default Articulos