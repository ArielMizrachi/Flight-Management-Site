import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = "http://127.0.0.1:8000/api/countries/";
let token =  null;
// get all Countrys
export function GetCountries() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetCountries/').then((res) => resolve({ data: res.data }))
  );
}

// get one Country
export function GetOneCountry(Country_id) {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetCountries/'+Country_id).then((res) => resolve({ data: res.data }))
  );
}

// get all Countrys names
export function GetCountriesName() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetCountriesName/').then((res) => resolve({ data: res.data }))
  );
}

  // add a Country
export function AddCountry(new_Country) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'AddCountries/', new_Country, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log('hello')
      console.log(error.response.status)
      resolve({ data: error.response.status })
    }));
  
}

// delete a Country
export function DeleteCountry(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelCountries/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}

// update a Country
export function UpdateCountry(NewCountry,id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER+'PutCountries/' + id, NewCountry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
  
      .catch(error => {
        resolve({ data: error.response.status })
      })
    );
  }
  



