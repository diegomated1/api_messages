import {Client} from "cassandra-driver";

const client = new Client({
    contactPoints: [`${process.env.CASSANDRA_HOST}:${process.env.CASSANDRA_PORT}`],
    localDataCenter: process.env.CASSANDRA_DATACENTER,
    keyspace: 'messages',
    credentials: {
        username: process.env.CASSANDRA_USERNAME!,
        password: process.env.CASSANDRA_PASSWORD!   
    }
});

client.connect().then(()=>{
    console.log("Cassandra connected");
}).catch((err:Error)=>{
    console.log("Cannot connect to cassandra: ", err.name);
});

export default client;