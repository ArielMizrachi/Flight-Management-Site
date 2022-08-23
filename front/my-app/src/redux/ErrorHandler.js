const ErrorHandler = (number) => {
let  msg = ''
    if (number === 401){
        msg= 'Please login again'
        return (msg)
    }



  return (`unknown error detected ${number}`)
}

export default ErrorHandler