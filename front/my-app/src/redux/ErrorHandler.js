const ErrorHandler = (number) => {
let  msg = ''
    if (number === 401){
        msg= 'Please login again'
        return (msg)
    }

    if (number === 500){
      msg= 'Unable to continue with the provided credentials.'
      return (msg)
  }

  if (number === 400){
    msg= 'Unable to continue with the provided credentials.'
    return (msg)
}


  return (`unknown error detected ${number}`)
}

export default ErrorHandler