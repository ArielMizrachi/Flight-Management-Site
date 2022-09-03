import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = "http://127.0.0.1:8000/api/customers/";
let token =  null;
// get all customers
export function GetCustomers() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetCustomers/').then((res) => resolve({ data: res.data }))
  );
}

// get one customer
export function GetOneCustomer(customer_id) {
  console.log(customer_id)
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetCustomers/'+customer_id)
    .then((res) => resolve({ data: res.data }))
    .catch(error => {resolve({ data: error.response.status })
    }));
}

  // add a customer
export function AddCustomer(new_customer) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'AddCustomers/', new_customer, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      resolve({ data: error.response.status })
    }));
  
}

// delete a customer
export function DeleteCustomer(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelCustomers/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}

// update a customer
export function UpdateCustomer(NewCustomer,id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER+'PutCustomers/' + id, NewCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
  
      .catch(error => {
        resolve({ data: error.response.status })
      })
    );
  }
  



