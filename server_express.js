const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 8888;

const pgURL = '192.168.2.111'
const pgPort = '5432'
const pgUser = 'postgres'
const pgPass = 'secretpassword'

const pool = new Pool({
  connectionString:
    'postgresql://'+pgUser+':'+pgPass+'@'+pgURL+':'+pgPort+'/books',
});

async function init() {
  const app = express();

  app.get("/get", async (req, res) => {
    const client = await pool.connect();
    const [booksRes] = await Promise.all([
      client.query(
        // Never put user inputs directly into the SQL query
        // `SELECT * FROM comments NATURAL LEFT JOIN rich_content WHERE board_id = ${req.query.search}`
        // Always parametrize it so that the PG driver can clean it up to prevent SQL injections.
        "SELECT * FROM the_expanse LIMIT $1",
        [req.query.search]
      )
    ]);
    res
      .json({
        status: "ok",
        posts: booksRes.rows,
      })
      .end();
    await client.end();
  });

  app.use(express.static("./static"));
  app.listen(PORT);

  console.log(`running on http://localhost:${PORT}`);
}
init();