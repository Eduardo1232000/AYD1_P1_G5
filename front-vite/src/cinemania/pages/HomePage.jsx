import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuthStore } from '../../store/auth'; // Importa el hook useAuthStore
import { getPeliculas, getComentariosActivos, postComentario, deleteComentario } from '../../api';

function HomePage() {
	const correo = useAuthStore((state) => state.username);
	const [peliculas, setPeliculas] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const [comentarios, setComentarios] = useState([]);
	const [nuevoComentario, setNuevoComentario] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPelicula, setSelectedPelicula] = useState(null);

	useEffect(() => {
		fetchPeliculas();
	}, [correo]);

	const fetchPeliculas = async () => {
		try {
			const response = await getPeliculas();
			if (Array.isArray(response.data.data)) {
				setPeliculas(response.data.data);
			} else {
				console.error('La respuesta de la API no es un array:', response.data.data);
				setPeliculas([]);
			}
		} catch (error) {
			console.error('Error al obtener películas:', error);
			setPeliculas([]);
		}
	};

	const toggleExpand = async (index, titulo) => {
		if (expandedIndex === index) {
			setExpandedIndex(null);
			setComentarios([]);
		} else {
			setExpandedIndex(index);
			await fetchComentarios(titulo);
		}
	};

	const fetchComentarios = async (titulo) => {
		try {
			const response = await getComentariosActivos(titulo);
			if (response.data.success) {
				setComentarios(response.data.comentarios);
			} else {
				console.error('Error al obtener comentarios:', response.data.message);
				setComentarios([]);
			}
		} catch (error) {
			console.error('Error al obtener comentarios:', error);
			setComentarios([]);
		}
	};

	const handleComentar = async () => {
		try {
			const response = await postComentario({
				correo: correo,
				titulo: selectedPelicula.titulo,
				comentario: nuevoComentario
			});
			if (response.data.success) {
				setNuevoComentario('');
				fetchComentarios(selectedPelicula.titulo);
			} else {
				console.error('Error al comentar:', response.data.message);
			}
		} catch (error) {
			console.error('Error al comentar:', error);
		}
	};

	const handleEliminarComentario = async (idComentario) => {
		try {
			console.log(idComentario)
			const response = await deleteComentario(idComentario);
			if (response.data.success) {
				fetchComentarios(selectedPelicula.titulo);
			} else {
				console.error('Error al eliminar comentario:', response.data.message);
			}
		} catch (error) {
			console.error('Error al eliminar comentario:', error);
		}
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setExpandedIndex(null);
		setComentarios([]);
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
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: '30px',
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
								backgroundColor: '#fff',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={() => {
								setDialogOpen(true);
								setSelectedPelicula(pelicula);
								toggleExpand(index, pelicula.titulo);
							}}
						>
							<img src={pelicula.imagen} alt={pelicula.titulo} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
							<Typography variant="h6" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>
								<span style={{ fontWeight: 'bold' }}>{pelicula.titulo}</span>: ({pelicula.year_estreno})
							</Typography>
						</Box>
					))}
				</Box>
			) : (
				<Typography variant="h6" align='center' color='text.secondary'>
					No hay películas disponibles.
				</Typography>
			)}
			<Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="lg">
				<DialogTitle><strong>{selectedPelicula && selectedPelicula.titulo} ({selectedPelicula && selectedPelicula.year_estreno}</strong>)</DialogTitle>
				<DialogContent sx={{ display: 'flex' }}>
					<Box sx={{ marginRight: '20px' }}>
						<img src={selectedPelicula && selectedPelicula.imagen} alt={selectedPelicula && selectedPelicula.titulo} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body1"><strong>Sinopsis:</strong> {selectedPelicula && selectedPelicula.sinopsis}</Typography>
						<Typography variant="body2"><strong>Director:</strong> {selectedPelicula && selectedPelicula.director}</Typography>
						<Typography variant="body2"><strong>Duración:</strong> {selectedPelicula && selectedPelicula.duracion} minutos</Typography>
						<Typography variant="body2"><strong>Género:</strong> {selectedPelicula && selectedPelicula.genero}</Typography>
					</Box>
				</DialogContent>
				<DialogContent>
					<Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '10px' }}>Comentarios:</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{comentarios.map((comentario, index) => (
							<Box key={index} sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								backgroundColor: '#f9f9f9',
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}>
								<Box>
									<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{comentario.correo}:</Typography>
									<Typography variant="body2">{comentario.comentario}</Typography>
								</Box>
								{comentario.correo === correo && (
									<Button variant="outlined" color="error" onClick={() => handleEliminarComentario(comentario.id_comentario)}>Eliminar</Button>
								)}
							</Box>
						))}
					</Box>
				</DialogContent>
				<DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						label="Escribe tu comentario"
						variant="outlined"
						size="small"
						multiline
						rows={2}
						value={nuevoComentario}
						onChange={(e) => setNuevoComentario(e.target.value)}
						sx={{ marginRight: '10px', width: '80%' }}
					/>
					<Button variant="contained" size="small" onClick={handleComentar}>Comentar</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cerrar</Button>
				</DialogActions>
			</Dialog>







		</Box>
	);
}

export default HomePage;
