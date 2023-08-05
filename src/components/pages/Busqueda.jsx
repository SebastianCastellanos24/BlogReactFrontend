import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import Listado from './Listado';


const Busqueda = () => {

    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const params = useParams();

    useEffect(() => {
        conseguirArticulos();
    }, [])

    useEffect(() => {
        conseguirArticulos();
    }, [params])

    const conseguirArticulos = async () => {
        const url = `${Global.url}buscar/${params.busqueda}`;

        const { datos, cargando } = await PeticionAjax(url, "GET");


        if (datos.status === "success") {
            setArticulos(datos.articulos)
        } else {
            setArticulos([]);
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

export default Busqueda