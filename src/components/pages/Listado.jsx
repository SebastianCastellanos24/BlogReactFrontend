import React from 'react'
import { Global } from '../../helpers/Global';
import { Link } from "react-router-dom"
import { PeticionAjax } from '../../helpers/PeticionAjax';

const Listado = ({articulos, setArticulos}) => {

    const eliminar = async (id) => {
        let {datos} = await PeticionAjax(`${Global.url}articulo/${id}`, "DELETE")

        if(datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }

    return (
        articulos.map(articulo => {
            return (
                <article className="articulo-item" key={articulo._id}>
                    <div className='mascara'>
                        {articulo.imagen != "default.png" &&  <img src={`${Global.url}imagen/${articulo.imagen}`} />}
                        {articulo.imagen == "default.png" &&  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png' />}
                    </div>
                    <div className='datos'>
                        <h3 className="title"><Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link></h3>
                        <p className="description">{articulo.contenido}</p>

                        <Link to={`/editar/${articulo._id}`} className="edit">Editar</Link>
                        <button className="delete" onClick={() => {
                            eliminar(articulo._id)
                        }}>Borrar</button>
                    </div>
                </article>
            )
        })
    )
}

export default Listado