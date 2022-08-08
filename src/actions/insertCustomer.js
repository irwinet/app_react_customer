import { createAction } from "redux-actions";
import { apiPost } from "../api";
import { urlCustomers } from "../api/url";
import { INSERT_CUSTOMER } from "../constants";

export const insertCustomer = createAction(INSERT_CUSTOMER, 
    (customer) => apiPost(urlCustomers, customer));