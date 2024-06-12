import React, { useEffect, useState } from 'react';
import { getPeliculasAlquiladasPorCorreo, devolverPelicula, verificarFechaDevolucion, calcularPenalizacion } from '../../api'; // Importa las funciones necesarias
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, Card, CardContent } from '@mui/material';
import { useAuthStore } from '../../store/auth'; // Importa el hook useAuthStore
import { successMessage, errorMessage } from '../../utils/messageStore'; // Importa las funciones de mensaje

function DevolverPeliculas() {
    const correo = useAuthStore((state) => state.username); // Obtiene el correo del usuario autenticado
    const [peliculas, setPeliculas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // Estado para controlar la apertura del diálogo
    const [mensajeDialog, setMensajeDialog] = useState(''); // Estado para el mensaje del diálogo
    const [tituloPelicula, setTituloPelicula] = useState(''); // Estado para almacenar el título de la película seleccionada
    const [mensajeSinPeliculas, setMensajeSinPeliculas] = useState(''); // Estado para el mensaje sin películas

    const fetchPeliculas = () => {
        getPeliculasAlquiladasPorCorreo(correo)
            .then(response => {
                if (response.data.success) {
                    setPeliculas(response.data.peliculas_alquiladas);
                    if (response.data.peliculas_alquiladas.length === 0) {
                        setMensajeSinPeliculas('El usuario no cuenta con películas alquiladas.');
                    } else {
                        setMensajeSinPeliculas('');
                    }
                } else {
                    setPeliculas([]);
                    setMensajeSinPeliculas('El usuario no cuenta con películas alquiladas.');
                }
            })
            .catch(error => {
                console.error('Error fetching películas alquiladas:', error);
                setPeliculas([]);
                setMensajeSinPeliculas('Error al obtener las películas alquiladas.');
            });
    };

    useEffect(() => {
        // Llama a la función para obtener las películas alquiladas al cargar el componente
        if (correo) {
            fetchPeliculas();
        }
    }, [correo]);

    const handleDevolver = async (titulo) => {
        try {
            // Verifica la fecha de devolución
            const { data: { success, estado } } = await verificarFechaDevolucion(correo, titulo);

            if (success) {
                setTituloPelicula(titulo); // Setea el título de la película seleccionada
                if (estado === 0) {
                    // Si la película se puede devolver, muestra el diálogo de confirmación
                    setMensajeDialog('Estimado Usuario, ¿está seguro de realizar la devolución de la película?');
                    setOpenDialog(true);
                } else if (estado === 1) {
                    // Si la película está fuera de tiempo, obtiene la penalización y el mensaje
                    const { data: { penalizacion, mensaje } } = await calcularPenalizacion(correo, titulo);
                    setMensajeDialog(`Estimado Usuario,\n${mensaje}`);
                    setOpenDialog(true);
                } else {
                    // Estado de verificación no válido
                    setMensajeDialog('Ha ocurrido un error al devolver la película.');
                    setOpenDialog(true);
                }
            } else {
                // Manejo de errores en la verificación de fecha
                setMensajeDialog('Ha ocurrido un error al verificar la fecha de devolución.');
                setOpenDialog(true);
            }
        } catch (error) {
            console.error('Error en la devolución de película:', error);
            setMensajeDialog('Ha ocurrido un error en la devolución de la película.');
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = async (confirmed) => {
        setOpenDialog(false);
        if (confirmed && tituloPelicula) {
            try {
                // Lógica para devolver la película
                const { data } = await devolverPelicula(correo, tituloPelicula);
                if (data.success) {
                    successMessage('¡Película devuelta exitosamente!');
                    // Actualiza la lista de películas alquiladas
                    fetchPeliculas();
                } else {
                    errorMessage(data.message);
                }
            } catch (error) {
                console.error('Error en la devolución de película:', error);
                errorMessage('Ha ocurrido un error en la devolución de la película.');
            }
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center">
             <Typography
                variant='h4'
                align='center'
                color='text.primary'
                gutterBottom
                sx={{ fontWeight: "bold", my: 4 }}>
                Películas Alquiladas
            </Typography>
            <Grid container spacing={2} justifyContent="center">

                {mensajeSinPeliculas ? (
                    <Typography variant="h5" align="center" style={{ marginTop: 30 }}>
                        {mensajeSinPeliculas}
                    </Typography>


                ) : (
                    peliculas.map((pelicula, index) => (
                        <Grid item xs={12} sm={2} md={3} key={index}>
                            <div style={{ margin: '8px' }}>
                                <Card>
                                    <CardContent style={{ padding: '20px' }}>
                                        <Grid container spacing={2} direction="column" alignItems="center">
                                            <Grid item>
                                                <img src={pelicula.imagen_url} alt={pelicula.titulo} style={{ maxWidth: '90%', maxHeight: '250px' }} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6" align="center">
                                                    {pelicula.titulo}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={() => handleDevolver(pelicula.titulo)}>
                                                    Devolver
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    ))
                )}
                <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
                    <DialogTitle>Confirmación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {mensajeDialog}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseDialog(false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => handleCloseDialog(true)} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default DevolverPeliculas;
