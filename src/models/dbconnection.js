import Db from "mysql2-async";

const db = new Db({
    host : 'localhost',
    user : 'root',
    password : 'admin',
    database : 'jerseyappdb'

})

export {db};