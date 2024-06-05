import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import './login.css';
import candado from '../../assets/candado.png';
import usrlogo from '../../assets/user.png';
import proflogo from '../../assets/profile.png';
import { path_db } from '../config';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.style.background = `
      linear-gradient(120deg, #57C3C8 50%, #0B4249 50%),
      radial-gradient(circle, #0B4249 10%, transparent 60%)`;
    document.body.style.backgroundBlendMode = 'screen';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  const ir_dashboard = (user) => {  
    localStorage.setItem('user_logueado', JSON.stringify(user) );
    navigate('/register');  //PARA VER SI HAY CAMBIOS, AQUI DEBE LLEVAR AL DASHBOARD
  };

  const ir_register = () => {  
    navigate('/register');
  };

  const loguear = async () => {
    var user_t = document.getElementById('LOGIN_TEXT_USER').value;
    var pass_t = document.getElementById('LOGIN_TEXT_PASSWORD').value;
    if(!user_t || !pass_t){
      alert("Llene los campos faltantes!")
    }else{
      try {
        const datosIngreso = {
          correo: user_t,
          password: pass_t
        }
        const response = await fetch(path_db + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosIngreso),
        });
        if (response.ok) {
          const result = await response.json();
          if(result.success === true){
            alert("Bienvenido")
            ir_dashboard(user_t)
          }else{
            alert("ERROR: Datos Incorrectos")
          }
        } else {
          console.log('Error en la solicitud', response.statusText);
        }
      } catch (error) {
        console.log("OCURRIO UN ERROR AL LOGUEAR USUARIO")
      }
    }
  }

  return(
    <div className="App">
      <header className="App-header">
      <div id='LOGIN_CUADRO'>
        <img src={proflogo} id='IMG_LOGIN' alt="imagen"/>
        <div id='input_user_con_imagen'>
            <img src={usrlogo} id='IMG_INPUT_USER' alt="imagen"/>
            <input type="text" id='LOGIN_TEXT_USER' placeholder="User Name"></input>
        </div>
        <div id='input_password_con_imagen'>
            <img src={candado} id='IMG_INPUT_PASSWORD' alt="imagen"/>
            <input type="password" id='LOGIN_TEXT_PASSWORD' placeholder="Password"></input>
        </div>
        <button id='LOGIN_BOTON_LOGIN' onClick={loguear}> LOGIN</button>
        <a id='LINK_REGISTER' onClick={ir_register} >Create Your Acount</a>
      </div>
      </header>
    </div>
  )
};
export default Login;