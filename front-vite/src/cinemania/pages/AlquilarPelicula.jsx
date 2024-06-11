import React, { useState, useEffect } from 'react';
import { getPeliculas } from '../../api';
import { alquilarPelicula } from '../../api'; // Importa la función para alquilar películas
import {useAuthStore} from "../../store/auth.js";

const AlquilarPelicula = () => {
    const [peliculas, setPeliculas] = useState([]);
    const correo = useAuthStore((state) => state.username); // Obtiene el correo del usuario autenticado
    const [tituloPelicula, setTituloPelicula] = useState(''); // Estado para almacenar el título de la película seleccionada

    useEffect(() => {
        fetchPeliculas();
    }, []);

    const fetchPeliculas = async () => {
        try {
            const response = await getPeliculas();
            setPeliculas(response.data.data);
        } catch (error) {
            console.error('Error al obtener películas:', error);
        }
    };

    const handleAlquilar = async (titulo) => {
        try {
            console.log(correo,titulo)
            const response = await alquilarPelicula(correo, titulo);
            if (response.data.success) {
                console.log('Película alquilada correctamente');
                // Actualizar la lista de películas después de alquilar una película
                fetchPeliculas();
            } else {
                console.error('Error al alquilar película:', response.data.message);
            }
        } catch (error) {
            console.error('Error al alquilar película:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '20px' }}>Películas Disponibles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px' }}>
                {peliculas.map((pelicula, index) => (
                    <div key={index} style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <img src={pelicula.imagen} alt={pelicula.titulo} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                        <h3 style={{ marginBottom: '5px' }}>{pelicula.titulo}</h3>
                        <p style={{ marginBottom: '5px' }}>{pelicula.sinopsis}</p>
                        <p style={{ marginBottom: '5px' }}>Precio de alquiler: {pelicula.precio_alquiler}</p>
                        <p style={{ marginBottom: '5px' }}>Director: {pelicula.director}</p>
                        <p style={{ marginBottom: '5px' }}>Año de estreno: {pelicula.year_estreno}</p>
                        <p style={{ marginBottom: '5px' }}>Duración: {pelicula.duracion} minutos</p>
                        <p style={{ marginBottom: '5px' }}>Género: {pelicula.genero}</p>
                        <button onClick={() => handleAlquilar(pelicula.titulo)} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Alquilar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlquilarPelicula;