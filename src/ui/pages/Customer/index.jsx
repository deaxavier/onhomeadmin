import React, { useEffect, useState } from "react"
import { Check, Archive, PersonAdd } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { CustomerService } from "../../../business/services/customer-service"

import './index.css'

const CustomerPage = () => {
    const [customers, setCustomers] = useState([])
    const service = new CustomerService()
    const navigation = useNavigate()

    useEffect(() => {
        (async () => {
            setCustomers([])
            await getCustomers()
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCustomers = async () => {
        setCustomers([])
        const response = await service.getAll()
        if (response.ok) {
            const data = await response.text()
            setCustomers(JSON.parse(data))
        }
    }

    const changeStatus = async (id) => {
        await service.changeStatus(id)
        await getCustomers()
    }

    const newCustomer = () => {
        navigation('add')
    }
    return (
        <div className="customer">
            <h1>Cadastro de Clientes</h1>
            <div className="btnnew">
                <Button variant="contained"
                    color="info"
                    onClick={newCustomer}
                    startIcon={<PersonAdd />}>
                    Cadastrar Novo Cliente
                </Button>
            </div><hr />
            <table className="table">
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Tipo</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, i) => {
                        return (
                            <tr key={i}>
                                <td>{customer.name}</td>
                                <td>{customer.customerType.name}</td>
                                <td>{customer.active ?
                                    <Button variant="contained"
                                        color="error"
                                        onClick={() => changeStatus(customer.id)}
                                        startIcon={<Archive />}>
                                        Desativar
                                    </Button> :
                                    <Button variant="contained"
                                        onClick={() => changeStatus(customer.id)}
                                        color="success"
                                        startIcon={<Check />}>
                                        Ativar
                                    </Button>
                                }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default CustomerPage