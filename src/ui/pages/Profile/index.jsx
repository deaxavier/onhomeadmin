import React, { useEffect, useState } from "react"
import { Login, Logout } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@mui/material"
import OnHomeDialog from "../../components/Dialog"
import { UserService } from "../../../business/services/user-service"

import './index.css'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [openConfirmExit, setOpenConfirmExit] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const userService = new UserService()

    useEffect(() => {
        (async () => {
            await getInfo();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const getInfo = async () => {
        setLoading(true)
        let response = await userService.info();
        if (response.ok) {
            var user = JSON.parse(await response.text())
            setName(user.name)
        }
        setLoading(false)
    }

    const confirmExit = () => {
        setOpenConfirmExit(true)
    }

    const closeConfirmExit = () => {
        setOpenConfirmExit(false)
    }

    return (
        <>
            <div className="profile">
                {loading ?
                    <>
                        <CircularProgress color="primary" />
                        Carregando ....
                    </>
                    : <> <p>Bem vindX {name}</p>
                        <Button variant="contained"
                            onClick={confirmExit}
                            startIcon={<Logout />}>Sair do sistema</Button>
                    </>
                }
            </div>
            <OnHomeDialog
                open={openConfirmExit}
                onClose={closeConfirmExit}
                onClickYes={logout}
                title="Você deseja sair do sistema?"
                noActionText="Não, desejo continuar logado"
                yesActionText="Sim, desejo sair"
                yesIcon={<Login />}
            />
        </>
    )
}

export default ProfilePage