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

// OBTENER LOS DATOS DEL USUARIO POR MEDIO DEL CORREO en DATA
router.post('/perfil', async (req, res) => {
    const { correo } = req.body; // Obtén el correo desde el cuerpo de la solicitud

    // Consulta SQL para obtener los datos del perfil
    const query = `
        SELECT nombre, apellido, genero, fecha_nacimiento, password, correo
        FROM usuarios
        WHERE correo = ?;
    `;

    try {
        const [rows] = await pool.execute(query, [correo]);

        if (rows.length > 0) {
            res.json({
                success: true,
                data: rows[0]
            });
        } else {
            res.json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al realizar la consulta.'
        });
    }
});

// Devuelve true si se actualizó correctamente y un mensaje.
router.post('/actualizar-perfil', async (req, res) => {
    const { nombre, apellido, genero, correo, password, fecha_nacimiento } = req.body; // Obtén los datos del usuario desde el cuerpo de la solicitud

    // Consulta SQL para actualizar los datos del usuario
    const query = `
        UPDATE usuarios
        SET nombre = ?,
            apellido = ?,
            genero = ?,
            password = ?,
            fecha_nacimiento = ?
        WHERE correo = ?;
    `;

    try {
        const [result] = await pool.execute(query, [nombre, apellido, genero, password, fecha_nacimiento, correo]);

        if (result.affectedRows > 0) {
            res.json({
                success: true,
                message: 'Datos del usuario actualizados exitosamente.'
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontró un usuario con el correo proporcionado.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al realizar la actualización de los datos del usuario.'
        });
    }
});



// OBTENER HISTORICO DE ALQUILER POR CORREO lista de datos.
router.post('/historico-alquiler', async (req, res) => {
    const { correo } = req.body; // Obtén el correo desde el cuerpo de la solicitud

    // Consulta SQL para obtener los datos del alquiler
    const query = `
        SELECT 
            a.correo,
            a.titulo,
            a.fecha_alquiler,
            a.fecha_devolucion,
            p.precio_alquiler,
            a.estado_alquiler,
            CASE
                WHEN a.fecha_devolucion IS NOT NULL THEN
                    TIMESTAMPDIFF(HOUR, a.fecha_alquiler, a.fecha_devolucion)
                ELSE
                    TIMESTAMPDIFF(HOUR, a.fecha_alquiler, NOW())
            END AS horas_alquiladas,
            CASE
                WHEN (a.fecha_devolucion IS NOT NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, a.fecha_devolucion) > 48) OR 
                    (a.fecha_devolucion IS NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, NOW()) > 48) THEN
                    FLOOR((TIMESTAMPDIFF(HOUR, a.fecha_alquiler, COALESCE(a.fecha_devolucion, NOW())) - 48) / 24) * 5
                ELSE
                    0
            END AS penalizacion,
            CASE
                WHEN a.estado_alquiler = 1 THEN
                    'La película no ha sido devuelta.'
                WHEN (a.fecha_devolucion IS NOT NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, a.fecha_devolucion) > 48) OR 
                    (a.fecha_devolucion IS NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, NOW()) > 48) THEN
                    CONCAT('La película se devolvió con retraso de ', TIMESTAMPDIFF(HOUR, a.fecha_alquiler, COALESCE(a.fecha_devolucion, NOW())) - 48, ' horas. Penalización extra: Q', FLOOR((TIMESTAMPDIFF(HOUR, a.fecha_alquiler, COALESCE(a.fecha_devolucion, NOW())) - 48) / 24) * 5, '.00')
                ELSE
                    'La película fue devuelta a tiempo.'
            END AS mensaje,
            CASE
                WHEN (a.fecha_devolucion IS NOT NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, a.fecha_devolucion) > 48) OR 
                    (a.fecha_devolucion IS NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, NOW()) > 48) THEN
                    GREATEST(TIMESTAMPDIFF(HOUR, a.fecha_alquiler, COALESCE(a.fecha_devolucion, NOW())) - 48, 0)
                ELSE
                    0
            END AS horas_atrasadas,
            p.precio_alquiler + CASE
                WHEN (a.fecha_devolucion IS NOT NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, a.fecha_devolucion) > 48) OR 
                    (a.fecha_devolucion IS NULL AND TIMESTAMPDIFF(HOUR, a.fecha_alquiler, NOW()) > 48) THEN
                    FLOOR((TIMESTAMPDIFF(HOUR, a.fecha_alquiler, COALESCE(a.fecha_devolucion, NOW())) - 48) / 24) * 5
                ELSE
                    0
            END AS monto_total
        FROM alquileres a
        JOIN peliculas p ON a.titulo = p.titulo
        WHERE a.correo = ?;
    `;

    try {
        const [rows] = await pool.execute(query, [correo]);

        if (rows.length > 0) {
            res.json({
                success: true,
                data: rows
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron datos de alquiler para este correo.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al realizar la consulta.'
        });
    }
});



// Devuelve la información de las películas alquiladas por un correo específico
router.post('/peliculas-alquiladas', async (req, res) => {
    const { correo } = req.body; // Obtén el correo desde el cuerpo de la solicitud

    // Consulta SQL para obtener las películas alquiladas por el correo específico
    const query = `
        SELECT peliculas.imagen AS imagen_url, peliculas.titulo
        FROM alquileres
        JOIN peliculas ON alquileres.titulo = peliculas.titulo
        WHERE alquileres.correo = ? AND alquileres.estado_alquiler = 1
    `;

    try {
        const [results] = await pool.execute(query, [correo]); // Ejecutar la consulta

        if (results.length > 0) {
            res.json({
                success: true,
                message: 'Películas alquiladas encontradas.',
                peliculas_alquiladas: results
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron películas alquiladas para el correo proporcionado.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las películas alquiladas.'
        });
    }
});


module.exports = router;