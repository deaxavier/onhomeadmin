import { callApi } from "../api"
import { Method } from "../enums"

export const CustomerService = class {

    async getAll() {
        return callApi('customer', Method.Get)
    }

    async getCustomerPayments(id) {
        return callApi(`customer/${id}/payments`, Method.Get)
    }

    async changeStatus(id) {
        return callApi(`customer/changeactived/${id}`, Method.Put)
    }

    async create(customer) {
        return callApi('customer', Method.Post, JSON.stringify(customer))
    }
}