
// this file was generated by ./scripts/generate-web-api
import exec from './_exec'
import validate from './_validate'

export default function teamaccessLogs(params, callback) {
  let ns = 'team.accessLogs'
  let err = validate(ns, params)
  if (err) {
    callback(err)
  }
  else {
    return exec(ns, params, callback)
  }
}
