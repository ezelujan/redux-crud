import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto) {
    return async dispatch => {
        dispatch( agregarProducto() );

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) );

            // Alerta exito
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            // Si hay un error, cambiar el state
            dispatch( agregarProductoError(true) );

            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en el servidor, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction () {
    return async dispatch => {
        dispatch( descargaProductos() );
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
        } catch (error) {
            dispatch( descargaProductosError() );
        }
    }
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});
const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async dispatch => {
        dispatch( obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                '¡Eliminado!',
                'El producto se eliminó correctamente',
                'success'
            );
        } catch (error) {
            dispatch( eliminarProductoError(true) );

            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en el servidor, intenta de nuevo'
            });
        }
    }
};

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});
const eliminarProductoError = estado => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
});

// Colocar producto en ediciòn
export function obtenerProductoEditar(producto) {
    return dispatch => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async dispatch => {
        dispatch( editarProducto() );

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch( editarProductoExito(producto) );

            // Si se edita, mostrar alerta
            Swal.fire(
                '¡Editado!',
                'El producto se editó correctamente',
                'success'
            );
        } catch (error) {
            dispatch( editarProductoError(true) );

            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en el servidor, intenta de nuevo'
            });
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});
const editarProductoError= estado => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: estado
});