import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = "http://127.0.0.1:8000/api/tickets/";
let token =  null;
// get all tickets
export function GetTickets() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetTickets/').then((res) => resolve({ data: res.data }))
  );
}

// get one ticket
export function GetOneTicket(ticket_id) {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetTickets/'+ticket_id).then((res) => resolve({ data: res.data }))
  );
}

  // register a ticket
export function AddTicket(new_ticket) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'AddTickets/', new_ticket, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      resolve({ data: error.response.status })
    }));
  
}

// delete a ticket
export function DeleteTicket(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelTicets/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}


