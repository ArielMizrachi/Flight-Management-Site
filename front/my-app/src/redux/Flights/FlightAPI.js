import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = " http://127.0.0.1:8000/api/flights/";
let token =  null;
// get all flights
export function GetFlights() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetFlight/').then((res) => resolve({ data: res.data }))
  );
}

// get one flight
export function GetOneFlight(flight_id) {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetFlight/'+flight_id).then((res) => resolve({ data: res.data }))
  );
}

// add a glight
export function AddFlight(new_flight) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'AddFlights/', new_flight, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
       resolve({data: error.response.status })
    }));
  
}

// delete a flight
export function DeleteFlight(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelFlights/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}

// update a flight
export function UpdateFlight(NewFlight,id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER+'PutFlight/' + id, NewFlight, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
  
      .catch(error => {
        console.log(error.message)
      })
    );
  }
  
