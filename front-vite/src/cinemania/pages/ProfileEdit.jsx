import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../api';
import { useAuthStore } from '../../store/auth';
import { Button, Grid, TextField, Typography, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import { errorMessage, successMessage } from "../../utils/messageStore";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        nombre: '',
        apellido: '',
        genero: '',
        fecha_nacimiento: '',
        password: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [changePassword, setChangePassword] = useState(false);

    const correo = useAuthStore((state) => state.username);

    useEffect(() => {
        if (correo) {
            fetchProfile(correo);
        }
    }, [correo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validación específica para el campo de género
        if (name === 'genero' && (value !== 'M' && value !== 'F')) {
            setError('El género debe ser "M" o "F"');
            return; // No actualiza el estado si el valor no es válido
        }
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setChangePassword(e.target.checked);
    };

    const fetchProfile = async (email) => {
        try {
            const response = await getProfile(email);
            if (response.data.success) {
                console.log(response.data.data)
                const formattedDate = response.data.data.fecha_nacimiento ? new Date(response.data.data.fecha_nacimiento).toLocaleDateString('es-ES') : '';
                console.log(formattedDate)
                setProfile({ ...response.data.data, fecha_nacimiento: formattedDate });
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            let updatedPassword = values.currentPassword; // Por defecto, la contraseña será la actual

            // Verificar si el checkbox para cambiar la contraseña está activo
            if (changePassword) {
                // Si está activo, la contraseña será la nueva contraseña
                updatedPassword = values.newPassword;

                // Validar que la nueva contraseña coincida con la confirmación
                if (values.newPassword !== values.confirmPassword) {
                    errorMessage("Las contraseñas no coinciden.");
                    return;
                }
            }
            // Verificar si la contraseña actual coincide con la contraseña obtenida en la consulta del perfil
            if (values.currentPassword !== profile.password) {
                errorMessage("La contraseña actual es incorrecta.");
                return;
            }

            const updatedProfile = { ...values, password: updatedPassword, fecha_nacimiento: formatDate(profile.fecha_nacimiento) };
            const response = await updateProfile(updatedProfile);
            if (response.data.success) {
                console.log('Profile updated:', updatedProfile);
                successMessage("Perfil actualizado exitosamente.");
                fetchProfile(correo);
                formik.setValues({
                    ...formik.values,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                console.error(response.data.message);
                errorMessage("Error al actualizar el perfil.");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            errorMessage("Error al actualizar el perfil.");
        }
    };


    // Función para formatear la fecha en el formato esperado
    const formatDate = (dateString) => {
        const dateParts = dateString.split('/');
        if (dateParts.length === 3) {
            const year = dateParts[2];
            const month = dateParts[1].padStart(2, '0'); // Asegura que el mes tiene dos dígitos
            const day = dateParts[0].padStart(2, '0'); // Asegura que el día tiene dos dígitos
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    const validate = (values) => {
        const errors = {};

        if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: profile,
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            if (values.newPassword !== values.confirmPassword) {
                errors.confirmPassword = 'Las contraseñas no coinciden';
            }

            if (changePassword) {
                // Verificar que la nueva contraseña tenga al menos 8 caracteres y contenga al menos una letra mayúscula, una letra minúscula y un número
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                if (!passwordRegex.test(values.newPassword)) {
                    errors.newPassword = 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número';
                }
    
                if (values.confirmPassword.length < 8 || !passwordRegex.test(values.confirmPassword)) {
                    errors.confirmPassword = 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número';
                }
            }

            return errors;
        }
    });


    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: '80vh' }} // Fondo blanco
        >
            <form onSubmit={formik.handleSubmit} style={{ width: '30%', backgroundColor: '#fff' }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.75)',
                    }}
                >
                    <Typography
                        variant='h4'
                        align='center'
                        gutterBottom
                    >
                        Editar Perfil
                    </Typography>
                    <TextField
                        label='Nombre'
                        variant='outlined'
                        fullWidth
                        size='small'
                        type='text'
                        margin='normal'
                        autoComplete='off'
                        name='nombre'
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        required // Campo obligatorio
                    />
                    <TextField
                        label='Apellido'
                        variant='outlined'
                        type='text'
                        size='small'
                        fullWidth
                        margin='normal'
                        autoComplete='off'
                        name='apellido'
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        required // Campo obligatorio
                    />
                    <Select
                        label='Género'
                        variant='outlined'
                        fullWidth
                        size='small'
                        margin='normal'
                        autoComplete='off'
                        name='genero'
                        value={formik.values.genero}
                        onChange={formik.handleChange}
                        required // Campo obligatorio
                    >
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Femenino</MenuItem>
                    </Select>
                    <TextField
                        label='Fecha de Nacimiento'
                        variant='outlined'
                        type='date'
                        fullWidth
                        size='small'
                        margin='normal'
                        name='fecha_nacimiento'
                        value={formatDate(formik.values.fecha_nacimiento)}
                        onChange={formik.handleChange}
                        inputProps={{
                            max: new Date().toISOString().split('T')[0] // Establecer la fecha máxima como la fecha actual
                        }}
                    />


                    <TextField
                        label='Correo'
                        variant='outlined'
                        fullWidth
                        size='small'
                        margin='normal'
                        autoComplete='off'
                        name='correo'
                        value={correo}
                        disabled // Esto hace que el campo sea no editable
                    />
                    <TextField
                        label='Contraseña'
                        variant='outlined'
                        type='password'
                        fullWidth
                        size='small'
                        margin='normal'
                        autoComplete='off'
                        name='currentPassword'
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={changePassword} onChange={handleCheckboxChange} />}
                        label="Cambiar Contraseña"
                    />

                    {changePassword && (
                        <>

                            <TextField
                                label='Nueva Contraseña'
                                variant='outlined'
                                type='password'
                                fullWidth
                                size='small'
                                margin='normal'
                                autoComplete='off'
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                            />
                            <TextField
                                label='Confirmar Contraseña'
                                variant='outlined'
                                type='password'
                                fullWidth
                                size='small'
                                margin='normal'
                                autoComplete='off'
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </>
                    )}

                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        type='submit'
                    >
                        Guardar Cambios
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
};

export default ProfileEdit;
