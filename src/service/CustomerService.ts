export default class CustomerService {
  getCustomers() {
    return fetch(`${import.meta.env.VITE_API_URL}/data`)
      .then((res) => res.json())
      .then((d) => d);
  }

  getCustomersLarge() {
    return fetch("db/customers.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
