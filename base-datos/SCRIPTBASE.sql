CREATE DATABASE ayd1proy1;
USE ayd1proy1;

CREATE TABLE alquileres (
    correo           VARCHAR(50) NOT NULL,
    titulo           VARCHAR(30) NOT NULL,
    fecha_alquiler   DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado_alquiler  INT NOT NULL,
    PRIMARY KEY (correo, titulo)
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
    PRIMARY KEY (correo)
);

ALTER TABLE alquileres
    ADD CONSTRAINT alquileres_peliculas_fk FOREIGN KEY (titulo)
        REFERENCES peliculas (titulo);

ALTER TABLE alquileres
    ADD CONSTRAINT alquileres_usuarios_fk FOREIGN KEY (correo)
        REFERENCES usuarios (correo);