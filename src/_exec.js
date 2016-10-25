import request from 'request';
import { Promise } from 'es6-promise';

const req = request.defaults({
  baseUrl: 'https://slack.com/api/',
  headers: {
    Accept: 'application/json'
  },
  json: true
})

export default function exec(url, form, callback) {
  // stringify any objects under keys since form is posted as application/x-www-form-urlencoded
  Object.keys(form).forEach(function (key) {
    if (typeof form[key] === 'object') {
      form[key] = JSON.stringify(form[key])
    }
  })

  // always post
    req.post({ url, form }, (err, res)=> {
      var rateLimit = 'You are sending too many requests. Please relax.'
      if (err) {
        // if request failed bubble the error
        callback(err);
      }
      else if (res.body.error) {
        var error = Error(res.body.error);
        // if Slack returns an error bubble the error
        callback(error);
      }
      else if (typeof res.body === 'string' && res.body.includes(rateLimit)) {
        var error = Error('rate_limit');
        // sometimes you need to chill out
        callback(error);
      }
      else {
        // success! clean up the response
        let json = res.body
        delete json.ok
        callback(null, json);
      }
    });
/// eom
}
