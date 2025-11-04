//import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8035/api",
// });

// export default api;  // ✅ must be a default export
import axios from "axios";

const api = axios.create({
  baseURL: "https://reactdoctorbookingapp.onrender.com/api",
});

export default api;
