import React, { Fragment, useState } from 'react';
import uuid from 'react-native-uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    // Crear State de Citas

    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualizarError] = useState(false);

    //funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return; //para que no se continue ejecutando el codigo
        }
        actualizarError(false);


        //Asignar un ID
        cita.id=uuid.v1();
        //console.log(cita);

        // Crear la cita
        crearCita(cita);

        //Reinicar el Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return (  
        <Fragment>
            <h2>Crear una Cita Nueva</h2>
            
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>   : null}

            <form 
                onSubmit={submitCita}
            >
                <label htmlFor="mascota">Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota"
                    className="form-control" 
                    placeholder="Nombre Mascota" 
                    onChange={actualizarState}
                    value={mascota}
                />
                <label htmlFor="propietario">Nombre del Dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="form-control" 
                    placeholder="Nombre Dueño" 
                    onChange={actualizarState}
                    value={propietario}
                />
                 <label htmlFor="fecha">Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="form-control" 
                    onChange={actualizarState}
                    value={fecha}
                />
                 <label htmlFor="hora">Hora</label>
                <input 
                    type="time" 
                    name="hora"
                    className="form-control" 
                    onChange={actualizarState}
                    value={hora}
                />
                 <label htmlFor="sintomas">Sintomas</label>
                <textarea
                    className="form-control"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>
                <br/>
                <button 
                    type="submit"
                    className="btn btn-info btn-block"
                    
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;

