const express = require('express');
const pool = require('../database/db');         //BASE DE DATOS
const router = express.Router();
const { format,addDays } = require('date-fns');


//SOLO SE AGREGO PARA PROBAR QUE FUNCIONAN LOS ARCHIVOS SEPARADOS
router.get('/gla', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080 por parte de Gladys' });
});

router.get('/verPeliculas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM peliculas p LEFT JOIN alquileres a ON p.titulo = a.titulo WHERE a.estado_alquiler = 0');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ success: false, message: 'Error al obtener películas' });
    }
});

// ELIMINACIÓN DE COMENTARIO
router.post('/eliminarcomentario', async (req, res) => {
    try {
        const { id_comentario, correo, titulo } = req.body; // OBTENCIÓN DE PARÁMETROS
        if (!id_comentario || !correo || !titulo) { // VALIDACIÓN DE DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
            return;
        }
        // VALIDAR EXISTENCIA DE COMENTARIO
        const [validacion] = await pool.query('SELECT * FROM comentarios WHERE id_comentario = ? AND correo = ? AND titulo = ?', [id_comentario, correo, titulo]);
        if (validacion.length < 1) {
            res.status(400).json({ success: false, message: 'Comentario no Existe' });
            return;
        }
        // ELIMINAR COMENTARIO
        await pool.query('update comentarios set estado_comentario = 0 WHERE id_comentario = ?', [id_comentario]);
        res.json({ success: true, message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al Eliminar Comentario:', error);
        res.status(500).json({ success: false, message: 'Error al Eliminar Comentario' });
    }
});

// OBTENER COMENTARIOS CON estado_comentario = 1 PARA UN TÍTULO ESPECÍFICO
router.get('/comentariosactivos/:titulo', async (req, res) => {
    try {
        const { titulo } = req.params; // OBTENCIÓN DEL TÍTULO DE LA PETICIÓN
        if (!titulo) { // VALIDACIÓN DE TÍTULO NO NULO
            res.status(400).json({ success: false, message: 'Título no proporcionado' });
            return;
        }
        const comentariosActivos = await pool.query('SELECT * FROM comentarios WHERE estado_comentario = 1 AND titulo = ?', [titulo]);
        const comentarios = comentariosActivos
        res.json({ success: true, comentarios });
    } catch (error) {
        console.error('Error al Obtener Comentarios Activos:', error);
        res.status(500).json({ success: false, message: 'Error al Obtener Comentarios Activos' });
    }
});


// ALQUILER DE PELÍCULAS
router.post('/alquilarpelicula', async (req, res) => {
    try {
        const { correo, titulo } = req.body; // OBTENCIÓN DE PARÁMETROS
        if (!correo || !titulo) { // VALIDACIÓN DE DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
            return;
        }

        // Fecha
        const now = new Date();
        const futureDate = addDays(now, 2);
        const devolucion = format(futureDate, 'yyyy-MM-dd');
        const alquiler = format(now, 'yyyy-MM-dd');


        // INSERTAR EL ALQUILER EN LA BASE DE DATOS
        await pool.query('INSERT INTO alquileres(correo, titulo, fecha_alquiler, fecha_devolucion, estado_alquiler) VALUES (?, ?, ?, ?, 1)', [correo, titulo, alquiler, devolucion]);

        res.json({ success: true, message: 'Película alquilada correctamente', devolucion });
    } catch (error) {
        console.error('Error al Alquilar Película:', error);
        res.status(500).json({ success: false, message: 'Error al Alquilar Película'+ error });
    }
});

module.exports = router;