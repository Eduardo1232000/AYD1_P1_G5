const express = require("express");
const pool = require("../database/db");
const router = express.Router();

const campos = ["titulo", "sinopsis", "precio_alquiler", "director", "year_estreno", "duracion", "genero", "imagen"]

router.get("/peliculas", async (req, res) => {
    try {
        const result = await pool.query("select * from peliculas")
        res.json({ message: "", data: {peliculas: result[0]} });
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error interno", data: {}})
    }
});

router.put("/peliculas/:titulo", async (req, res) => {
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
    if (!set_valores) {
        res.status(404).json({message: "Body invalido", data: {}})
        return
    }
    try {
        const result = await pool.query(`update peliculas set ${set_valores.substring(0, set_valores.length - 1)} where titulo=?;`, [...vals, req.params.titulo])
        //console.log(result)
        if (result[0].affectedRows > 0) {
            res.json({ message: "Actualizado correctamente", data: {titulo: req.params.titulo} });
            return
        }
        res.status(404).json({message: "No existe el registro", data: {}})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error interno", data: {}})
    }
});

router.delete("/peliculas/:titulo", async (req, res) => {
    try {
        const result = await pool.query(`delete from peliculas where titulo=?;`, [req.params.titulo])
        if (result[0].affectedRows > 0) {
            res.json({ message: "Registro eliminado", data: {titulo: req.params.titulo} });
            return
        }
        res.status(404).json({message: "No existe el registro", data: {}})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error interno", data: {}})
    }
});

router.delete("/usuarios/:correo", async (req, res) => {
    try {
        const result = await pool.query(`delete from usuarios where correo=?;`, [req.params.correo])
        console.log(result)
        if (result[0].affectedRows > 0) {
            res.json({ message: "Registro eliminado", data: {titulo: req.params.correo} });
            return
        }
        res.status(404).json({message: "No existe el registro", data: {}})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error interno", data: {}})
    }
});

router.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query("select * from usuarios")
        res.json({ message: "", data: {usuarios: result[0]} });
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error interno", data: {}})
    }
});


module.exports = router;