import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './register.css';
import { path_db } from '../config';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => { 
    document.body.style.background = 'linear-gradient(120deg, #0B4249,#0A5F73, #66B1B4, #0A5F73,#0B4249)';
   
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  const ir_login = () => {  
    navigate('/');
  };

  function ir_paso2() {
    var name_t = document.getElementById('REGISTER_TEXT_NAME').value;
    var user_t = document.getElementById('REGISTER_TEXT_USER').value;
    if(!name_t || !user_t){
      alert("INGRESA LOS CAMPOS")
    }else{
      var div1 = document.getElementById('REGISTER_CUADRO1');
      var div2 = document.getElementById('REGISTER_CUADRO2');
      div2.classList.remove('oculto');
      div1.classList.add('oculto');
    }
  }
  function ir_paso3() {
    var div1 = document.getElementById('REGISTER_CUADRO2');
    var div2 = document.getElementById('REGISTER_CUADRO3');
    div2.classList.remove('oculto');
    div1.classList.add('oculto');
  }
  function regresar_paso1() {
    var div1 = document.getElementById('REGISTER_CUADRO1');
    var div2 = document.getElementById('REGISTER_CUADRO2');
    div1.classList.remove('oculto');
    div2.classList.add('oculto');
  }
  function regresar_paso2() {
    var div1 = document.getElementById('REGISTER_CUADRO2');
    var div2 = document.getElementById('REGISTER_CUADRO3');
    div1.classList.remove('oculto');
    div2.classList.add('oculto');
  }
  const registrar = async () => {
    var name_t = document.getElementById('REGISTER_TEXT_NAME').value;
    var apellido_t = document.getElementById('REGISTER_TEXT_USER').value;
    var genero_t = document.getElementById('REGISTER_TEXT_GENERO').value;
    var fecha_nac_t = document.getElementById('REGISTER_TEXT_FECHANAC').value;
    var correo_t = document.getElementById('REGISTER_TEXT_CORREO').value;
    var password_t = document.getElementById('REGISTER_TEXT_PASS').value;
    var confirm_password_t = document.getElementById('REGISTER_TEXT_CONPASS').value;
    if(password_t){
      if((password_t === confirm_password_t)){
        var datosIngreso
        datosIngreso = {
          nombre: name_t,
          apellido: apellido_t,
          genero: genero_t,
          correo: correo_t,
          fecha_nacimiento: fecha_nac_t,
          password: password_t
        }
        
        console.log(datosIngreso)
        /*
        try {
          const response = await fetch(path_db + '/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosIngreso),
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log(result)
            alert("Usuario Registrado")
            ir_login()
          } else {
            console.log('Error en la solicitud', response.statusText);
            alert("ERROR: User Ya existe. Intentelo de nuevo")
            ir_login()
          }
        } catch (error) {
          console.log("OCURRIO UN ERROR AL REGISTRAR USUARIO")
        }
        */
      }
      else{
        alert("LOS PASSWORDS NO COINCIDEN")
      }
    }else{
      alert("INGRESE LOS CAMPOS")
    }
  }

  return(
    <div className="App">
      <header className="App-header">
      <div id='REGISTER_CUADRO1'>
        <label id='REGISTER_TITULO'>Registrarse</label>
        <label id='REGISTER_LABEL_BASIC'>Informacion Basica</label>
        <label id='REGISTER_LABEL_NAME'>Nombre</label>
        <input type="text" id='REGISTER_TEXT_NAME' placeholder="User Name"></input>
        <label id='REGISTER_LABEL_USER'>Apellido</label>
        <input type="text" id='REGISTER_TEXT_USER' placeholder="User Name"></input>
        <button id='REGISTER_BOTON_NEXT1' onClick={ir_paso2}>NEXT</button>
        <a onClick={ir_login} id='LINK_LOGIN' >You Have an Account?</a>
      </div>
      <div id='REGISTER_CUADRO2' class="oculto">
        <label id='REGISTER_TITULO'>Registrarse</label>
        <label id='REGISTER_LABEL_TITULO2'>Informacion Personal</label>
        <label id='REGISTER_LABEL_GENERO'>Genero</label>
        <input type="text" id='REGISTER_TEXT_GENERO' placeholder="M o F"></input>
        <label id='REGISTER_LABEL_CORREO'>Correo Electronico</label>
        <input type="text" id='REGISTER_TEXT_CORREO' placeholder="Ej. usuario@dominio.com"></input>
        <label id='REGISTER_LABEL_FECHANAC'>Fecha de Nacimiento</label>
        <input type="date" id='REGISTER_TEXT_FECHANAC'></input>
        <button id='REGISTER_BOTON_PREVIOUS2' onClick={regresar_paso1}>PREVIOUS</button>
        <button id='REGISTER_BOTON_NEXT2' onClick={ir_paso3}>NEXT</button>
      </div>
      <div id='REGISTER_CUADRO3' class="oculto">
        <label id='REGISTER_TITULO'>Registrarse</label>
        <label id='REGISTER_LABEL_TITULO3'>Informacion Usuario:</label>
        <label id='REGISTER_LABEL_PASS'>Password</label>
        <input type="password" id='REGISTER_TEXT_PASS' ></input>
        <label id='REGISTER_LABEL_USER'>Confirmar Password</label>
        <input type="password" id='REGISTER_TEXT_CONPASS'></input>
        <button id='REGISTER_BOTON_PREVIOUS2' onClick={regresar_paso2}>PREVIOUS</button>
        <button id='REGISTER_BOTON_NEXT2' onClick={registrar}>SUBMIT</button>
      </div>
      
      </header>
    </div>
  )
};
export default Register;