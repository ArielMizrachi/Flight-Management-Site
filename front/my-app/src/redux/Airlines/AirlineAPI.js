import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = "http://127.0.0.1:8000/api/airlines/";
let token =  null;
// get all airlines
export function GetAirlines() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetAirlines/').then((res) => resolve({ data: res.data }))
  );
}

// get one airline
export function GetOneAirline(airline_id) {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetAirlines/'+airline_id).then((res) => resolve({ data: res.data }))
  );
}

// get all airlines names
export function GetAirlineNames() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetAirlinesName/').then((res) => resolve({ data: res.data }))
  );
}
  // add a airline
export function AddAirline(new_airline) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'AddAirline/', new_airline, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      resolve({ data: error.response.status })
    }));
  
}

// delete a airline
export function DeleteAirline(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelAirline/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}

// update a airline
export function UpdateAirline(NewAirline,id) {
  token =  localStorage.getItem("token");
  console.log('here')
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER+'PutAirline/' + id, NewAirline, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
  
      .catch(error => {
        resolve({ data: error.response.status })
      })
    );
  }
  



