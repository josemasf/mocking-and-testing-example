import axios from "axios";
export default class CustomerService {
  getCustomers() {
    return axios
      .get(`${import.meta.env.VITE_API_URL}/data`)
      .then((response) => response.data);
  }

  getCustomersLarge() {
    return fetch("db/customers.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
