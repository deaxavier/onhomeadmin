import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ArrowBack, Logout, Save } from "@mui/icons-material"
import { CustomerService } from "../../../business/services/customer-service"
import OnHomeDialog from "../../components/Dialog"

import './new-customer.css'
const NewCustomerPage = () => {
    const navigation = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const customerService = new CustomerService()
    const [openAlertSave, setOpenAlertSave] = useState(false)

    const onSubmit = async (data) => {
        console.log(data)
        await customerService.create(data)
        setOpenAlertSave(true)
    }

    const customerList = () => {
        setOpenAlertSave(true)
        navigation('/app/customer')
    }

    return (
        <>
            <div className="newCustomer">
                <h1>Novo Cliente</h1>
                <Button variant="text"
                    onClick={customerList}
                    startIcon={<ArrowBack />}>
                    Voltar para a lista
                </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Dados Cadastrais</legend>
                        <p> <TextField
                            label="Nome"
                            variant="outlined"
                            color={errors.name && "error"}
                            style={{ minWidth: "380px" }}
                            defaultValue={null}
                            {...register("name", { required: true })} />&nbsp;
                            <TextField
                                label="Email"
                                variant="outlined"
                                color={errors.email && "error"}
                                defaultValue={null}
                                style={{ minWidth: "370px" }}
                                {...register("email", { required: true })} />
                            &nbsp;
                            <TextField
                                label="Senha"
                                variant="outlined"
                                color={errors.password && "error"}
                                type={"password"}
                                defaultValue={null}
                                style={{ minWidth: "230px" }}
                                {...register("password", { required: true })} />&nbsp;

                            <FormControl variant="outlined" style={{ minWidth: "180px" }} color={errors.customer_type_id && "error"}>
                                <InputLabel id='customer_type_id-select-label'>Tipo de Pessoa</InputLabel>
                                <Select
                                    labelId="customer_type_id-select-label"
                                    label="customer_type_id"
                                    {...register("customer_type_id", { required: true })}>
                                    <MenuItem value="1">Pessoa Física</MenuItem>
                                    <MenuItem value="2">Pessoa Júridica</MenuItem>
                                </Select>
                            </FormControl>&nbsp;
                        </p><p>
                            <TextField
                                label="Endereço"
                                defaultValue={null}
                                variant="outlined"
                                color={errors.adrees && "error"}
                                style={{ minWidth: "420px" }}
                                {...register("adrees", { required: true })} />&nbsp;

                            <FormControl variant="outlined" style={{ minWidth: "80px" }} color={errors.uf && "error"}>
                                <InputLabel id='uf-select-label'>UF</InputLabel>
                                <Select
                                    labelId="uf-select-label"
                                    label="uf"
                                    {...register("uf", { required: true })}>
                                    <MenuItem value="AC">AC</MenuItem>
                                    <MenuItem value="AL">AL</MenuItem>
                                    <MenuItem value="AP">AP</MenuItem>
                                    <MenuItem value="AM">AM</MenuItem>
                                    <MenuItem value="BA">BA</MenuItem>
                                    <MenuItem value="CE">CE</MenuItem>
                                    <MenuItem value="DF">DF</MenuItem>
                                    <MenuItem value="ES">ES</MenuItem>
                                    <MenuItem value="GO">GO</MenuItem>
                                    <MenuItem value="MA">MA</MenuItem>
                                    <MenuItem value="MT">MT</MenuItem>
                                    <MenuItem value="MS">MS</MenuItem>
                                    <MenuItem value="MG">MG</MenuItem>
                                    <MenuItem value="PA">PA</MenuItem>
                                    <MenuItem value="PB">PB</MenuItem>
                                    <MenuItem value="PR">PR</MenuItem>
                                    <MenuItem value="PE">PE</MenuItem>
                                    <MenuItem value="PI">PI</MenuItem>
                                    <MenuItem value="RJ">RJ</MenuItem>
                                    <MenuItem value="RN">RN</MenuItem>
                                    <MenuItem value="RS">RS</MenuItem>
                                    <MenuItem value="RO">RO</MenuItem>
                                    <MenuItem value="RR">RR</MenuItem>
                                    <MenuItem value="SC">SC</MenuItem>
                                    <MenuItem value="SP">SP</MenuItem>
                                    <MenuItem value="SE">SE</MenuItem>
                                    <MenuItem value="TO">TO</MenuItem>
                                </Select>
                            </FormControl>&nbsp;
                            <TextField
                                color={errors.city && "error"}
                                label="Cidade"
                                defaultValue={null}
                                variant="outlined"
                                style={{ minWidth: "400px" }}
                                {...register("city", { required: true })} />&nbsp;
                            <TextField
                                label="CEP"
                                color={errors.zipcode && "error"}
                                defaultValue={null}
                                variant="outlined"
                                style={{ minWidth: "260px" }}
                                {...register("zipcode", { required: true })} />&nbsp;

                        </p>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            startIcon={<Save />}>Salvar</Button>
                    </fieldset>
                </form>
            </div>
            <OnHomeDialog
                open={openAlertSave}
                onClose={customerList}
                onClickYes={customerList}
                title="Dados Salvos com sucesso !!"
                yesActionText="Continuar"
                yesIcon={<Logout />}
            />
        </>
    )
}

export default NewCustomerPage