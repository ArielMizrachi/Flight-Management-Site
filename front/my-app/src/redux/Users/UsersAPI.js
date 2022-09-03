import axios from "axios";
// import TokenGiver from "../../components/TokenGiver";


const MY_SERVER = "http://127.0.0.1:8000/api/users/";
let token =  null;
// get all users
export function GetUsers() {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetUsers/').then((res) => resolve({ data: res.data }))
  );
}

// get one user
export function GetOneUser(user_id) {
  return new Promise((resolve) =>
    axios(MY_SERVER+'GetUsers/'+user_id).then((res) => resolve({ data: res.data }))
  );
}

  // register a user
export function AddUser(new_user) {
  console.log(new_user)
  return new Promise((resolve) =>
    axios.post(MY_SERVER+'RegisterUser/', new_user, {
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      resolve({ data: error.response.status })
    }));
  
}

// delete a user
export function DeleteUser(id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+'DelUser/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))

    .catch(error => {
      console.log(error.message)
    })
  );
}

// update a user
export function UpdateUser(NewUser,id) {
  token =  localStorage.getItem("token");
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER+'PutUser/' + id, NewUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
  
      .catch(error => {
        resolve({ data: error.response.status })
      })
    );
  }
  



