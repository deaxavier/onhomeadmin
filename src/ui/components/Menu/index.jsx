import React from "react"
import { Link } from "react-router-dom";

import './index.css'

const Menu = () => {
    return (
        <div className="menu">
            <h2>Menu</h2>
            <hr />
            <ul>
                <li><Link to={"/app"}>Financeiro</Link></li>
                <li><Link to={"/app/customer"}>Cadastros de Clientes</Link></li>
                <li><Link to={"/app/profile"}>Perfil</Link></li>
            </ul>
        </div>
    )
}

export default Menu