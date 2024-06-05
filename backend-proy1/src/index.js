const express = require('express');
const cors = require('cors'); 
const morgan=require('morgan');     //VER PETICIONES EN CONSOLA

//SETTINGS
const app = express();
const PORT =8080;       //PUERTO A USAR

//MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//RUTAS
app.use(require('./routes/task.routes'));
app.use(require('./routes/task.routes-Eduardo'));
app.use(require('./routes/task.routes-Gladys'));
app.use(require('./routes/task.routes-Heidy'));
app.use(require('./routes/task.routes-Kevin'));
app.use(require('./routes/task.routes-Ruben'));

//EMPEZANDO SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor API en http://localhost:${PORT}`);
});
