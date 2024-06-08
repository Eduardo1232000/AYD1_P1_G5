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
        const {email,password} = req.body;   //OBTENCION DE PARAMETROS
        if(!email | !password){             //VALIDACION DATOS NECESARIOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            const [result] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND password = ?', [email, password]);
            if(result.length == 1){ //SI HAY 1 COINCIDENCIA DEJA PASAR (SOLO DEBE TENER 1)
                res.json({ success: true, message: 'Login Correcto' });
            }else{
                res.status(400).json({ success: false, message: 'Datos incorrectos' });
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
        const {username,lastname,gender,email,birthdate,password} = req.body;   //OBTENCION DE PARAMETROS
        if(!username | !lastname | !gender | !email | !birthdate| !password){  //VALIDACION DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            //VALIDACION EXISTE USUARIO
            const [validacion] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
            if(validacion.length >0){       
                res.status(400).json({ success: false, message: 'Usuario ya Existe' });
            }else{
                //INSERTAR A BASE
                await pool.query('INSERT INTO usuarios(nombre, apellido, genero, correo, password, fecha_nacimiento,estado_usuario) VALUES (?, ?, ?, ?, ?, ?,1)', [username, lastname, gender, email, password, birthdate]);               
                res.json({ success: true, message: 'Usuario registrado correctamente!' });
            }
        }
    } catch (error) {
        console.error('Error al insertar el dato:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
});

//INGRESO DE PELICULAS
router.post('/ingresarpelicula', async (req,res) => {
    try {
        const {titulo,sinopsis,precio,director,estreno,duracion, genero, imagen} = req.body;   //OBTENCION DE PARAMETROS
        if(!titulo | !sinopsis | !precio | !director | !estreno| !duracion |!genero|!imagen){  //VALIDACION DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            //VALIDACION EXISTE PELICULA
            const [validacion] = await pool.query('SELECT * FROM peliculas WHERE titulo = ?', [titulo]);
            if(validacion.length >0){       
                res.status(400).json({ success: false, message: 'Pelicula ya Existe' });
            }else{
                //INSERTAR A BASE
                await pool.query('INSERT INTO peliculas(titulo, sinopsis, precio_alquiler, director, year_estreno, duracion, genero, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [titulo, sinopsis, precio, director, estreno, duracion, genero, imagen]);               
                res.json({ success: true, message: 'Pelicula Ingresada correctamente!' });
            }
        }
    } catch (error) {
        console.error('Error al Ingresar Pelicula:', error);
        res.status(500).json({ success: false, message: 'Error al Ingresar pelicula' });
    }
});

//INGRESO DE COMENTARIO
router.post('/ingresarcomentario', async (req,res) => {
    try {
        const {correo,titulo,comentario} = req.body;   //OBTENCION DE PARAMETROS
        if(!correo | !titulo | !comentario ){  //VALIDACION DATOS COMPLETOS
            res.status(400).json({ success: false, message: 'Datos incompletos' });
        }else{
            //VALIDAR EXISTE USUARIO
            const [validacion] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
            if(validacion.length <1){       
                res.status(400).json({ success: false, message: 'Usuario no Existe' });
                return
            }
            const [validacion2] = await pool.query('SELECT * FROM peliculas WHERE titulo = ?', [titulo]);
            if(validacion2.length <1){       
                res.status(400).json({ success: false, message: 'Pelicula no Existe' });
                return
            }
            //INSERTAR A BASE
            await pool.query('INSERT INTO comentarios(correo, titulo, comentario, estado_comentario) VALUES (?, ?, ?, 1)', [correo, titulo, comentario]);               
            res.json({ success: true, message: 'Comentario Publicado!' });
        }
    } catch (error) {
        console.error('Error al Publicar Comentario:', error);
        res.status(500).json({ success: false, message: 'Error al Publicar Comentario' });
    }
});

module.exports = router;