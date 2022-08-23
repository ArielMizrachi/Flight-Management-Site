import React from 'react'
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1>something went wrong</h1>
      <hr/>
      <Link to="/">home</Link> |{" "}
    </div>
  )
}

export default Error404