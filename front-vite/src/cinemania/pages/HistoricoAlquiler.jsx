import React, { useEffect, useState } from 'react';
import { getHistoricoAlquiler } from '../../api';
import { useAuthStore } from '../../store/auth'; // Importa el hook useAuthStore
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { errorMessage } from "../../utils/messageStore";

function HistoricoAlquiler() {
    const correo = useAuthStore((state) => state.username); // Obtiene el correo del usuario autenticado

    const [historico, setHistorico] = useState([]);

    const loadHistorico = async () => {
        try {
            // Llama a la función para obtener el historial de alquileres pasando el correo del usuario
            const { data } = await getHistoricoAlquiler(correo);
            setHistorico(data.data.map((item) => ({
                ...item,
                fecha_alquiler: new Date(item.fecha_alquiler).toLocaleString('es-ES'),
                fecha_devolucion: new Date(item.fecha_devolucion).toLocaleString('es-ES')
            })));
        } catch (error) {
            console.error(error);
            errorMessage("Error al cargar el historial de alquiler.");
        }
    };

    useEffect(() => {
        loadHistorico();
    }, [correo]); // Asegúrate de cargar el historial cada vez que cambie el correo del usuario

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" align="center" color="textPrimary" sx={{ fontWeight: "bold", my: 4 }}>
                    Historial de Alquiler
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "primary.dark" }}>
                            <TableRow>
                                
                                <TableCell align="center">Título</TableCell>
                                <TableCell align="center">Fecha de Alquiler</TableCell>
                                <TableCell align="center">Fecha de Devolución</TableCell>
                                <TableCell align="center">Horas Alquiladas</TableCell>
                                <TableCell align="center">Horas Atrasadas</TableCell>
                                <TableCell align="center">Precio Alquiler</TableCell>
                                <TableCell align="center">Penalización</TableCell>
                                <TableCell align="center">Monto Total Pagado</TableCell>
                                <TableCell align="center">Mensaje</TableCell>                                
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historico.map((row) => (
                                <TableRow key={row.titulo}>                                    
                                    <TableCell align="center">{row.titulo}</TableCell>
                                    <TableCell align="center">{row.fecha_alquiler}</TableCell>
                                    <TableCell align="center">{row.fecha_devolucion}</TableCell>
                                    <TableCell align="center">{row.horas_alquiladas}</TableCell>
                                    <TableCell align="center">{row.horas_atrasadas}</TableCell>
                                    <TableCell align="center">Q. {row.precio_alquiler}.00</TableCell>
                                    <TableCell align="center">Q. {row.penalizacion}.00</TableCell>
                                    <TableCell align="center">Q. {row.monto_total}.00</TableCell>
                                    <TableCell align="center">{row.mensaje}</TableCell>                                    
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default HistoricoAlquiler;
