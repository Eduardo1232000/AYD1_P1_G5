INSERT INTO peliculas (titulo, sinopsis, precio_alquiler, director, year_estreno, duracion, genero, imagen) VALUES
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology...', 50, 'Christopher Nolan', 2010, 148, 'Sci-Fi', 'https://example.com/inception.jpg'),
('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality...', 40, 'The Wachowskis', 1999, 136, 'Action', 'https://example.com/matrix.jpg'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival...', 45, 'Christopher Nolan', 2014, 169, 'Adventure', 'https://example.com/interstellar.jpg');

INSERT INTO usuarios (nombre, apellido, genero, correo, password, fecha_nacimiento, estado_usuario) VALUES
('Juan', 'Pérez', 'M', 'juan.perez@example.com', 'password123', '1985-03-10', 1),
('Ana', 'García', 'F', 'ana.garcia@example.com', 'password456', '1990-07-22', 1),
('Luis', 'Martínez', 'M', 'luis.martinez@example.com', 'password789', '1982-12-05', 1);

INSERT INTO alquileres (correo, titulo, fecha_alquiler, fecha_devolucion, estado_alquiler) VALUES
('juan.perez@example.com', 'Inception', '2024-06-01', '2024-06-03', 1),
('ana.garcia@example.com', 'The Matrix', '2024-06-02', '2024-06-05', 1),
('luis.martinez@example.com', 'Interstellar', '2024-06-03', NULL, 0);

INSERT INTO alquileres (correo, titulo, fecha_alquiler, fecha_devolucion, estado_alquiler) VALUES
('juan.perez@example.com', 'The Matrix', '2024-06-05', '2024-06-07', 1),
('ana.garcia@example.com', 'Interstellar', '2024-06-07', '2024-06-09', 1),
('luis.martinez@example.com', 'Inception', '2024-06-04', '2024-06-06', 1),
('juan.perez@example.com', 'Interstellar', '2024-06-06', '2024-06-08', 1),
('ana.garcia@example.com', 'Inception', '2024-06-08', '2024-06-10', 1),
('luis.martinez@example.com', 'The Matrix', '2024-06-09', '2024-06-11', 1);

INSERT INTO comentarios (correo, titulo, comentario, estado_comentario) VALUES
('juan.perez@example.com', 'Inception', 'Amazing movie with a complex plot!', 1),
('ana.garcia@example.com', 'The Matrix', 'A groundbreaking film that redefined the sci-fi genre.', 1),
('luis.martinez@example.com', 'Interstellar', 'A visually stunning film with a powerful story.', 1);
