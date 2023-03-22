import Swal from "sweetalert2";

export const SwalAlert = (title: any, detail: any, status: any) => {
    return Swal.fire(
        title,
        detail,
        status,
    )
}