const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');


//CONFIG
const configPath = path.join(__dirname, 'config.txt');
const configData = fs.readFileSync(configPath, 'utf-8');

const config = {};
configData.split('\n').forEach(line => {
    const [key, value] = line.trim().split('=');
    config[key] = value;
});
// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: config.DB_HOST,
    port: 4545,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos establecida con éxito');
        connection.release(); // Liberar la conexión después de verificar
    })
    .catch(error => {
        // console.log(config.DB_HOST, config.DB_USER, config.DB_DATABASE)
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = pool;
