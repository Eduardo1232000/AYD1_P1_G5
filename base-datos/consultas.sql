

/* ESTADOS DE ALQUILER
  0 - Pagado
  1 - Vigente
*/

/*** VERIFICA SI LA FECHA DE DEVOLUCION ES MAYOR A LA FECHA ACTUAL 
0 - EN TIEMPO 
1 - FUERA DE TIEMPO 
NULL - La pelicula ya fue devuelta. (Estado Pagado)
*/

SELECT 
    CASE
        WHEN COALESCE(a.fecha_devolucion, NOW()) <= NOW() THEN
            1
        ELSE
            0
    END AS tipo
FROM alquileres a
WHERE a.correo = 'luis.martinez@example.com' AND a.titulo = 'Interstellar'
and a.estado_alquiler=1;


/*** SI LA BANDERA ES 1 - CALCULA LA PENALIZACION SI SE EXCEDIO EL TIEMPO DE ALQUILER  */
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
WHERE correo = 'luis.martinez@example.com' 
    AND titulo = 'Interstellar' 
    AND estado_alquiler = 1;

/*** SI LA BANDERA ES 0 - CAMBIA LA FECHA DE DEVOLUCION A NOW() Y ESTADO A PAGADO */

UPDATE alquileres
SET fecha_devolucion = NOW(),
    estado_alquiler = 0
WHERE correo = 'luis.martinez@example.com'
    AND titulo = 'Interstellar'
    AND estado_alquiler = 1;

/*** DEVUELVE EL HISTORICO DE PELICULAS ALQUILADAS DE UN CORREO DETERMINADO*/

SELECT 
    a.correo,
    a.titulo,
    a.fecha_alquiler,
    a.fecha_devolucion,
    p.precio_alquiler,
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
WHERE a.correo = 'luis.martinez@example.com';


/*** DEVUELVE LOS DATOS DEL PERFIL DE USUARIO */
SELECT nombre, apellido, genero, fecha_nacimiento, password, correo
from usuarios where correo = 'luis.martinez@example.com';


