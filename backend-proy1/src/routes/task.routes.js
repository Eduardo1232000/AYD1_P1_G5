const express = require('express');
const pool = require('../database/db');           //PARA BASE DE DATOS
const router = express.Router();
const crypto = require('crypto');

//RAIZ
router.get('/', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080' });
});

module.exports = router;