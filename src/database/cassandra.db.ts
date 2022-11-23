const cassandra = require('cassandra-driver');

require('dotenv').config();

const client = new cassandra.Client({
    contactPoints: [`${process.env.CASSANDRA_HOST}:${process.env.CASSANDRA_PORT}`],
    localDataCenter: process.env.CASSANDRA_DATACENTER,
    keyspace: 'messages',
    credentials: {
        username: process.env.CASSANDRA_USERNAME,
        password: process.env.CASSANDRA_PASSWORD   
    }
});

(async ()=>{
    await client.connect((err: Error)=>{
        if(err){
            console.log("Cannoct connect to cassandra service");
        }else{
            console.log("Cassandra connected");
        }
    });
})();

module.exports = client;