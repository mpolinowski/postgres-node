const pg = require('pg');

const pgURL = '192.168.2.111'
const pgPort = '5432'
const pgUser = 'postgres'
const pgPass = 'secretpassword'


const cs = 'postgresql://'+pgUser+':'+pgPass+'@'+pgURL+':'+pgPort+'/books';

const client = new pg.Client(cs);

client.connect();
const sql = 'SELECT * FROM the_expanse LIMIT $1';
const values = ['9'];

client.query(sql, values).then(res => {

    const data = res.rows;

    data.forEach(row => console.log(row));

}).finally(() => {
    client.end()
});