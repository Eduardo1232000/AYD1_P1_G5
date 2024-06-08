// swal fire
import Swal from "sweetalert2"


export const successMessage = (message) => {
    Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
    })
}

export const errorMessage = (message) => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    })
}


