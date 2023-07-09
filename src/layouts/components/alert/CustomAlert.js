import { useEffect } from 'react'
import Swal from 'sweetalert2'

const CustomAlert = ({ type, message, position, timer, showConfirmButton, toast }) => {
  useEffect(() => {
    if (type && message) {
      Swal.mixin({
        toast: toast,
        position: position,
        showConfirmButton: showConfirmButton,
        timer: timer,
        customClass: {
          container: 'swal-popup-container'
        }
      }).fire({
        icon: type,
        title: message
      })
    }
  }, [type, message, position, timer, showConfirmButton, toast])

  return null
}

export default CustomAlert
