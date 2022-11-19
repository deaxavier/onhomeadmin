import { callApi } from "../api"
import { Method } from "../enums"

export const PaymentService = class {
    async makePaymentPay(id) {
        const data = JSON.stringify({ id })
        return await callApi('payment', Method.Put, data)
    }
}