CREATE DATABASE ayd1proy1;
USE ayd1proy1;

DROP TABLE alquileres;

CREATE TABLE alquileres (	
	id_alquiler	     INT NOT NULL AUTO_INCREMENT,
    correo           VARCHAR(50) NOT NULL,
    titulo           VARCHAR(30) NOT NULL,
    fecha_alquiler   DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado_alquiler  INT NOT NULL,
    PRIMARY KEY (id_alquiler)
);


CREATE TABLE peliculas (
    titulo          VARCHAR(30) NOT NULL,
    sinopsis        TEXT,
    precio_alquiler INT NOT NULL,
    director        VARCHAR(30),
    year_estreno    YEAR,
    duracion        INT,
    genero          VARCHAR(25),
    imagen          VARCHAR(250),
    PRIMARY KEY (titulo)
);

CREATE TABLE usuarios (
    nombre           VARCHAR(25) NOT NULL,
    apellido         VARCHAR(25) NOT NULL,
    genero           CHAR(1) NOT NULL,
    correo           VARCHAR(50) NOT NULL,
    password         VARCHAR(25) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    estado_usuario   INT NOT NULL,
    PRIMARY KEY (correo)
);
-- ALTER TABLE alquileres DROP FOREIGN KEY alquileres_peliculas_fk;
ALTER TABLE alquileres
    ADD CONSTRAINT alquileres_peliculas_fk FOREIGN KEY (titulo)
        REFERENCES peliculas (titulo) ON DELETE CASCADE;
       
-- ALTER TABLE alquileres DROP FOREIGN KEY alquileres_usuarios_fk;
ALTER TABLE alquileres
    ADD CONSTRAINT alquileres_usuarios_fk FOREIGN KEY (correo)
        REFERENCES usuarios (correo) ON DELETE CASCADE;
        
CREATE TABLE comentarios (
	id_comentario	   INT NOT NULL AUTO_INCREMENT,
    correo             VARCHAR(50) NOT NULL,
    titulo             VARCHAR(30) NOT NULL,
    comentario         TEXT,
    estado_comentario  INT NOT NULL,
    PRIMARY KEY (id_comentario)
);

-- ALTER TABLE comentarios DROP FOREIGN KEY comentarios_peliculas_fk;
ALTER TABLE comentarios
    ADD CONSTRAINT comentarios_peliculas_fk FOREIGN KEY (titulo)
        REFERENCES peliculas (titulo) ON DELETE CASCADE;
       
-- ALTER TABLE comentarios DROP FOREIGN KEY comentarios_usuarios_fk;
ALTER TABLE comentarios
    ADD CONSTRAINT comentarios_usuarios_fk FOREIGN KEY (correo)
        REFERENCES usuarios (correo) ON DELETE CASCADE;