const express = require('express');
const pool = require('../database/db');         //BASE DE DATOS
const router = express.Router();

//SOLO SE AGREGO PARA PROBAR QUE FUNCIONAN LOS ARCHIVOS SEPARADOS
router.get('/kev', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080 por parte de Kevin' });
});


module.exports = router;