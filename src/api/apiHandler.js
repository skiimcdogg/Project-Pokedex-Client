import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

 handleUpload(theFile) {
   return service
   .post('/api/auth/upload', theFile)
   .then((res) => res.data)
   .catch(errorHandler)
 }, 

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

 
  getPokemons() {
    return service
      .get("/api/pokemons")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getTypes() {
    return service
      .get("/api/pokemons/types")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getPokemonDetails(id) {
    return service
      .get(`/api/pokemons/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUser() {
    return service
      .get("api/user")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  handleTeamSubmit(DataObject) {
    return service
    .post('/api/auth/upload', DataObject)
    .then((res) => res.data)
    .catch(errorHandler)
  }
};



export default apiHandler;
