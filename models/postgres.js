const {Client} = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "pizzastore",
  password: "postgres",
  port: 5432,
};
const client = new Client(credentials);

// Connect with a client.
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

async function clientConnection(text, values = false) {
  console.log("clientConnection####", text, values);
  let now;
  if (values) {
    now = await client.query(text, values);
  } else {
    console.log("ye chal raha halfDiff####");
    now = await client.query(text);
  }
  //   await client.end();
  return now;
}

module.exports = {clientConnection};
