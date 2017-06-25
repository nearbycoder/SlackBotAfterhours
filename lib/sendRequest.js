import fetch from 'node-fetch';
import qs from 'qs';

export default (url, name, body) => {
  let qsBody = qs.stringify(body);
  fetch(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qsBody
  })
    .then(res => res.json())
    .then(results => {
      console.log(`name: ${name}`, results);
    })
    .catch(error => {
      console.log(`name: ${name}`, error);
    });
};
