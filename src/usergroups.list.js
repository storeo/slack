import exec from './_exec'
import validate from './_validate'

export default function usergroupsList(params, callback) {
  let ns = 'usergroups.list'
  let err = validate(ns, params, 'token')
  if (err) {
    callback(err)
  }
  else {
    exec(ns, params, callback)
  }
}
