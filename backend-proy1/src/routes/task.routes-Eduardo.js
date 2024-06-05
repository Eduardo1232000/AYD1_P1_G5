const express = require('express');
const pool = require('../database/db');         //BASE DE DATOS
const router = express.Router();

//RAIZ
router.get('/edu', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080 por parte de Eduardo' });
});

//LOGIN
router.post('/login', async(req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    try {
        const {username,password} = req.body;   //OBTENCION DE PARAMETROS
        //console.log(username,password);
        if(!username | !password){          //VALIDACION DATOS NECESARIOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            const encripted_password = hashPassword(password);
            const [result] = await pool.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, encripted_password]);
            if(result.length == 1){ //SI HAY 1 COINCIDENCIA DEJA PASAR (SOLO DEBE TENER 1)
                //console.log("pasa")
                res.json({ success: true, message: 'Login Correcto' });
            }else{
                //console.log("no pasa")
                res.json({ success: false, message: 'Datos incorrectos' });
            }
        }
    } catch (error) {
        console.error('Error al verificar datos:', error);
        res.status(500).json({ success: false, message: 'Error al Verificar Datos' });
    }

});


module.exports = router;