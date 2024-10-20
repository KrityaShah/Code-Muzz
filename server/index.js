const express = require('express');
const app = express();
const PORT = 3000;
const router = require("./router/auth-router");

app.use("/api/auth/", router);

app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`);
    
})