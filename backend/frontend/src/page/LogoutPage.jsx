import { useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthContext"

const LogoutPage = () => {

    const {submitLogout} = useContext(AuthContext)

    useEffect(() => {
        submitLogout()
    },[])

  return (
    <div></div>
  )
}

export default LogoutPage
