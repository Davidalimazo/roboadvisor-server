import { config } from "dotenv";
import path, { dirname } from 'path';
import http from "http";
import { app } from "./src/app";


//environment variables
config()


const PORT = process.env.PORT 

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING VISIT http://localhost:${PORT}`);
  });

