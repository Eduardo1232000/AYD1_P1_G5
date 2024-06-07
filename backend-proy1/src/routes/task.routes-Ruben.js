const express = require("express");
const pool = require("../database/db");
const router = express.Router();

const campos = ["titulo", "sinopsis", "precio_alquiler", "director", "year_estreno", "duracion", "genero", "imagen"]

router.put("/peliculas/:titulo", (req, res) => {
    const vals = []
    let set_valores = ""
    for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
            if (campos.includes(key)) {
                vals.push(req.body[key])
                set_valores += `${key}=?,`
            }
        }
    }
    pool.query(`update peliculas set ${set_valores.substring(0, set_valores.length - 1)} where titulo=?;`, [...vals, req.params.titulo])
    res.json({ message: 'Servidor en puerto 8080 por parte de Ruben' });
});


module.exports = router;