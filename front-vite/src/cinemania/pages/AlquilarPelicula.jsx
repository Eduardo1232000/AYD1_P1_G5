import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { getPeliculas2 } from '../../api';
import { alquilarPelicula } from '../../api'; // Importa la función para alquilar películas
import { useAuthStore } from "../../store/auth.js";
import { successMessage, errorMessage } from '../../utils/messageStore'; // Importa las funciones de mensaje


function AlquilarPelicula() {
    const [peliculas, setPeliculas] = useState([]);
    const [precioAlquiler, setPrecioAlquiler] = useState(0); // Estado para almacenar el precio de alquiler de la película seleccionada
    const correo = useAuthStore((state) => state.username); // Obtiene el correo del usuario autenticado
    const [expandedIndex, setExpandedIndex] = useState(null); // Nuevo estado para manejar la expansión de los detalles
    const [openDialog, setOpenDialog] = useState(false); // Estado para controlar la apertura del diálogo
    const [tituloPelicula, setTituloPelicula] = useState(''); // Estado para almacenar el título de la película seleccionada

    useEffect(() => {
        fetchPeliculas();
    }, []);

    const fetchPeliculas = async () => {
        try {
            const response = await getPeliculas2();
            setPeliculas(response.data.data);
        } catch (error) {
            console.error('Error al obtener películas:', error);
        }
    };

    const handleAlquilar = async (titulo, precioAlquiler) => {
        setTituloPelicula(titulo); // Guarda el título de la película seleccionada
        setPrecioAlquiler(precioAlquiler); // Guarda el precio de alquiler de la película seleccionada
        setOpenDialog(true); // Abre el diálogo de confirmación
    };


    const confirmarAlquiler = async () => {
        try {
            console.log(correo, tituloPelicula)
            const response = await alquilarPelicula(correo, tituloPelicula);
            if (response.data.success) {
                console.log('Película alquilada correctamente');
                successMessage('Película alquilada correctamente'); // Muestra mensaje de éxito
                // Actualizar la lista de películas después de alquilar una película
                fetchPeliculas();
            } else {
                console.error('Error al alquilar película:', response.data.message);
                errorMessage(`Error al alquilar película: ${response.data.message}`); // Muestra mensaje de error
            }
        } catch (error) {
            console.error('Error al alquilar película:', error);
            errorMessage('Error al alquilar película'); // Muestra mensaje de error
        } finally {
            setOpenDialog(false); // Cierra el diálogo después de alquilar la película
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
                Películas Disponibles
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Ajuste aquí para cambiar el tamaño mínimo y máximo de las columnas
                    gap: '20px',
                    maxWidth: '98%',
                    width: '95%',
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
                            <span style={{ fontWeight: 'bold' }}>{pelicula.titulo}</span> ({pelicula.year_estreno})
                        </Typography>
                        {expandedIndex === index && (
                            <>
                                <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Sinopsis: <span style={{ fontWeight: 'normal' }}>{pelicula.sinopsis}</span></Typography>
                                <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Director: <span style={{ fontWeight: 'normal' }}>{pelicula.director}</span></Typography>
                                <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Duración: <span style={{ fontWeight: 'normal' }}>{pelicula.duracion} minutos</span></Typography>
                                <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Género: <span style={{ fontWeight: 'normal' }}>{pelicula.genero}</span></Typography>
                                <Typography variant="body2" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>Precio de alquiler: <span style={{
                                    fontWeight:
                                        'normal'
                                }}>{pelicula.precio_alquiler}</span></Typography>
                                <button onClick={() => handleAlquilar(pelicula.titulo, pelicula.precio_alquiler)} style={{
                                    marginTop: '10px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color:
                                        '#fff', // Color blanco
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>
                                    Alquilar
                                </button>
                            </>
                        )}
                    </Box>
                ))}
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirmación de Alquiler</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <Typography variant="body2">
                            ¿Está seguro de alquilar la película {tituloPelicula}<br /> por 48 horas por un precio de Q. {precioAlquiler}.00?
                        </Typography>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmarAlquiler} color="primary" autoFocus>
                        Alquilar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
};

export default AlquilarPelicula;
