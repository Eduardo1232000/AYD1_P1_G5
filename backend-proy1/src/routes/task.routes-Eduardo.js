const express = require('express');
const pool = require('../database/db');         //BASE DE DATOS
const router = express.Router();

//SOLO SE AGREGO PARA PROBAR QUE FUNCIONAN LOS ARCHIVOS SEPARADOS
router.get('/edu', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080 por parte de Eduardo' });
});

//LOGIN
router.post('/login', async(req,res) => {
    try {
        const {correo,password} = req.body;   //OBTENCION DE PARAMETROS
        if(!correo | !password){             //VALIDACION DATOS NECESARIOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            const [result] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND password = ?', [correo, password]);
            if(result.length == 1){ //SI HAY 1 COINCIDENCIA DEJA PASAR (SOLO DEBE TENER 1)
                res.json({ success: true, message: 'Login Correcto' });
            }else{
                res.json({ success: false, message: 'Datos incorrectos' });
            }
        }
    } catch (error) {
        console.error('Error al verificar datos:', error);
        res.status(500).json({ success: false, message: 'Error al Verificar Datos' });
    }

});

//REGISTRO
router.post('/register', async (req,res) => {
    try {
        const {nombre,apellido,genero,correo,fecha_nacimiento,password} = req.body;   //OBTENCION DE PARAMETROS
        if(!nombre | !apellido | !genero | !correo | !fecha_nacimiento| !password){  //VALIDACION DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            //VALIDACION EXISTE USUARIO
            const [validacion] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
            if(validacion.length >0){       
                res.status(400).json({ success: false, message: 'Usuario ya Existe' });
            }else{
                //INSERTAR A BASE
                await pool.query('INSERT INTO usuarios(nombre, apellido, genero, correo, password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, genero, correo, password, fecha_nacimiento]);               
                res.json({ success: true, message: 'Usuario registrado correctamente!' });
            }
        }
    } catch (error) {
        console.error('Error al insertar el dato:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
});


module.exports = router;