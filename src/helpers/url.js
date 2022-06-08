import Swal from 'sweetalert2'

const url = "http://192.168.100.1:3300/api";
const pathImg = "";

function messageInfo(msg,type){
    let color;
    if(type==='success') color = '#259256'
    if(type==='warning') color = '#EF9C3F'

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        background: color ,
        iconColor: '#FFF',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
    Toast.fire({ 
    icon: type,
    title: `<span style="color:#FFF">${msg}</span>`,
    }) 
}

export {
    url,
    pathImg,
    messageInfo,
}