import React, { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { CreditCard } from "@mui/icons-material"
import { formatDate, formatNumber } from "../../../business/helpers/formaters"
import { CustomerService } from "../../../business/services/customer-service"
import { PaymentService } from "../../../business/services/payment-service"

import './index.css'


const FinancialPage = () => {
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState("")
    const [payments, setPayments] = useState([])
    const customerServices = new CustomerService()
    const paymentServices = new PaymentService()

    useEffect(() => {
        (async () => {
            setCustomers([])
            setPayments([])
            await getCustomers();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        (async () => {
            await getPayments(customerId)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerId])


    const informPayment = async (paymentId) => {
        const response = await paymentServices.makePaymentPay(paymentId)
        if (response.ok) {
            await getPayments(customerId)
        }
    }

    const getCustomers = async () => {
        setCustomers([])
        const response = await customerServices.getAll()
        if (response.ok) {
            const data = await response.text()
            setCustomers(JSON.parse(data))
        }
    }

    const getPayments = async (id) => {
        setPayments([])
        if (id === '') return;
        const response = await customerServices.getCustomerPayments(id);
        if (response.ok) {
            const data = await response.text()
            setPayments(JSON.parse(data))
        }
    }

    return (
        <div className="financial">
            <h1>Financeiro</h1>
            <FormControl variant="outlined" className="customer">
                <InputLabel id='customer-select-label'>Cliente</InputLabel>
                <Select
                    fullWidth
                    displayEmpty
                    labelId="customer-select-label"
                    label="customer"
                    value={customerId}
                    onChange={e => setCustomerId(e.target.value)}>
                    {customers.map((c, key) => {
                        return (
                            <MenuItem key={key} value={c.id}>{c.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <h3>Pagamentos</h3>
            <table className="table">
                <thead>
                    <td>Valor</td>
                    <td>Vencimento</td>
                    <td>Data Pagamento</td>
                    <td>Status</td>
                </thead>
                <tbody>
                    {payments.map((payment, i) => {
                        return (
                            <tr key={i}>

                                <td>R$ {formatNumber(payment.cost)}</td>
                                <td>{formatDate(payment.dueDate, 'DD/MM/yyyy')}</td>
                                <td>{formatDate(payment.paymentAt, 'DD/MM/yyyy')}</td>
                                <td>
                                    {(payment.status === 'Pago')
                                        ? '' :
                                        <Button
                                            onClick={() => informPayment(payment.id)}
                                            variant="contained"
                                            color="success"
                                            startIcon={<CreditCard />}
                                            size="small">
                                            Informar pagamento
                                        </Button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FinancialPage