import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { getPeliculas } from '../../api'; // Asegúrate de que este import esté correcto

function HomePage() {
    const [peliculas, setPeliculas] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        fetchPeliculas();
    }, []);

    const fetchPeliculas = async () => {
        try {
            const response = await getPeliculas();
            if (Array.isArray(response.data.data)) {
                setPeliculas(response.data.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data.data);
                setPeliculas([]); // Inicializa como un array vacío en caso de respuesta inesperada
            }
        } catch (error) {
            console.error('Error al obtener películas:', error);
            setPeliculas([]); // Inicializa como un array vacío en caso de error
        }
    };

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}>
            <Typography
                variant='h4'
                align='center'
                color='text.primary'
                gutterBottom
                sx={{ fontWeight: "bold", my: 4 }}>
                ¡Bienvenido a Cinemania!
            </Typography>
            {peliculas.length > 0 ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Ajusta el ancho mínimo y máximo de las tarjetas
                        gap: '30px', // Aumenta el espacio entre las tarjetas
                        maxWidth: '98%',
                        width: '90%',
                    }}>
                    {peliculas.map((pelicula, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'left',
                                border: '1px solid #ccc',
                                padding: '20px',
                                borderRadius: '5px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                backgroundColor: '#fff', // Cambia el color de fondo de la tarjeta
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center', // Centra verticalmente los elementos
                                alignItems: 'center',
                            }}
                            onClick={() => toggleExpand(index)}>
                            <img src={pelicula.imagen} alt={pelicula.titulo} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                            <Typography variant="h6" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                <span style={{ fontWeight: 'bold' }}>{pelicula.titulo}</span>: ({pelicula.year_estreno})
                            </Typography>
                            {expandedIndex === index && (
                                <>
                                    <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Sinopsis <span style={{ fontWeight: 'normal' }}>{pelicula.sinopsis}</span></Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Director: <span style={{ fontWeight: 'normal' }}>{pelicula.director}</span></Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Duración: <span style={{ fontWeight: 'normal' }}>{pelicula.duracion} minutos</span></Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Género: <span style={{ fontWeight: 'normal' }}>{pelicula.genero}</span></Typography>
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" align='center' color='text.secondary'>
                    No hay películas disponibles.
                </Typography>
            )}
        </Box>
    );
}

export default HomePage;
