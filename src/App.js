import React, { Fragment, useState, useEffect }from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  //Citas en local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  //Arreglo de Citas
  const [ citas, guardarCitas ] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el stare cambia

  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  //Funcion que tome las citas actuales y agregue una nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }
  //Mensaje condicional
  const titulo = citas.length === 0 ?  'No hay citas' : 'Administra tus Citas';
  return (
   <Fragment>
      <h1 className="text-center">Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="col-6">
            <h2>{titulo}</h2>

            {
            
            citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
   </Fragment>
  );
}


export default App;
