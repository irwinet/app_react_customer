import { FETCH_CUSTOMERS } from './../constants'
import { createAction } from 'redux-actions'

const customers = [
    {
        "dni": "76173874",
        "name": "Irwin Estrada",
        "age": 28
    },
    {
        "dni": "11111111",
        "name": "Qwerty Qwerty",
        "age": 30
    },
    {
        "dni": "22222222",
        "name": "Azerty Azerty",
        "age": 35
    }
]

export const fetchCustomers = createAction(FETCH_CUSTOMERS, () => customers);