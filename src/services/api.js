import axios from "axios";

// TEMEL YAPILANDIRMA
const api = axios.create({
  baseURL: "https://site--novastore--8vnyqvdcq6fp.code.run/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;