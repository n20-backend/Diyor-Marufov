import pg from "pg"

const {Pool} = pg

const connection = new Pool({
    user:"postgres",
    password: "2703",
    host: "localhost",
    database: "e_commerce_project",
    port: 5432
})

await connection.connect()
.then(()=>{
    console.log(`Database connected`)
})
.catch((err)=>{
    console.log(`Error connecting with PostgresSQL`,err.message)
})

export {connection as dbConnection}