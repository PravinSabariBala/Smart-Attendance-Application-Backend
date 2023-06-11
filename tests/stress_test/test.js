import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 2000, // Number of virtual users
  duration: '30s', 
};

let queryCounter = 0;

export default function () {
  queryAdmin();
  sleep(1); 
}

function queryAdmin() {
  let query = "SELECT * FROM Authentication WHERE email = 'example@gmail.com' AND password = 'admin1#example'";
  let url = 'http://localhost:5000/query_admin';
  let headers = { 'Content-Type': 'application/json' };

  let response = http.post(url, JSON.stringify({ query: query }), { headers: headers });

  // Check the response or condition to determine if the server limit is found
  if (response.status === 429) {
    console.log(`Server limit reached. Total iterations: ${queryCounter}`);
    k6.options.duration = '0s';
  }

  queryCounter++;
}
