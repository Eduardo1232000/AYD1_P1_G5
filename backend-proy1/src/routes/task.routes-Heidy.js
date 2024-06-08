const express = require('express');
const pool = require('../database/db');         //BASE DE DATOS
const router = express.Router();

//SOLO SE AGREGO PARA PROBAR QUE FUNCIONAN LOS ARCHIVOS SEPARADOS
router.get('/hei', (req,res) => { //SOLICITUD INICIAL (SIN PARAMETROS)
    res.json({ message: 'Servidor en puerto 8080 por parte de Heidy' });
});

// VERIFICAR FECHA DE DEVOLUCION - 0 ES EN TIEMPO, 1 ES FUERA DE TIEMPO, 2 NO SE ENCONTRO
router.post('/verifica-fecha', async (req, res) => {
    try {
        const { correo, titulo } = req.body; // Obtención de parámetros
        if (!correo || !titulo) { // Validación de datos necesarios
            return res.status(400).json({ success: false, message: 'Datos incompletos' });
        }

        const [result] = await pool.query(
            `SELECT 
                CASE
                    WHEN COALESCE(a.fecha_devolucion, NOW()) <= NOW() THEN
                        1
                    ELSE
                        0
                END AS tipo
            FROM alquileres a
            WHERE a.correo = ? AND a.titulo = ? AND a.estado_alquiler = 1`,
            [correo, titulo]
        );

        if (result.length > 0) { // Si se encuentra el registro
            const tipo = result[0].tipo;
            const estado = (tipo === null) ? 2 : tipo;

            res.json({ success: true, estado });
        } else {
            res.json({ success: true, estado: 2 });
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ success: false, estado: 2 });
    }
});


// DEVOLVER MONTO Y MENSAJE DE PENALIZACION
router.post('/penalizacion', async (req, res) => {
    const { correo, titulo } = req.body; // Obtén correo y título desde el cuerpo de la solicitud

    // Consulta SQL
    const query = `
        SELECT 
            correo,
            titulo,
            estado_alquiler,
            TIMESTAMPDIFF(HOUR, fecha_alquiler, NOW()) AS horas_alquiladas,
            CASE
                WHEN TIMESTAMPDIFF(HOUR, fecha_alquiler, NOW()) > 48 THEN
                    FLOOR((TIMESTAMPDIFF(HOUR, fecha_alquiler, NOW()) - 48) / 24) * 5
                ELSE
                    0
            END AS penalizacion,
            CASE
                WHEN TIMESTAMPDIFF(HOUR, fecha_alquiler, NOW()) > 48 THEN
                    CONCAT('Ha excedido las horas de alquiler permitidas. Deberá cancelar una penalización de Q', FLOOR((TIMESTAMPDIFF(HOUR, fecha_alquiler, NOW()) - 48) / 24) * 5, '.00')
                ELSE
                    'La película no tiene penalización.'
            END AS mensaje
        FROM alquileres
        WHERE correo = ? 
            AND titulo = ? 
            AND estado_alquiler = 1;
    `;

    try {
        const [rows] = await pool.execute(query, [correo, titulo]);

        if (rows.length > 0) {
            res.json({
                penalizacion: rows[0].penalizacion,
                mensaje: rows[0].mensaje
            });
        } else {
            res.status(404).json({ message: 'Alquiler no encontrado.', penalizacion:0 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la consulta.', penalizacion:0 });
    }
});

// Devuelve true si se actualizo correctamente y mensaje.
router.post('/devolver', async (req, res) => {
    const { correo, titulo } = req.body; // Obtén correo y título desde el cuerpo de la solicitud

    // Consulta SQL para actualizar el alquiler
    const query = `
        UPDATE alquileres
        SET fecha_devolucion = NOW(),
            estado_alquiler = 0
        WHERE correo = ? 
            AND titulo = ? 
            AND estado_alquiler = 1;
    `;

    try {
        const [result] = await pool.execute(query, [correo, titulo]);

        if (result.affectedRows > 0) {
            res.json({
                success: true,
                message: 'Alquiler devuelto exitosamente.'
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontró un alquiler activo para devolver.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al realizar la actualización.'
        });
    }
});


module.exports = router;