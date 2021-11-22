export const decryptToken = (obj) => ({
    type: 'DECRYPT_TOKEN',
    scope:   obj.scope,
    client_id:   obj.client_id,
    iss :   obj.iss,
    uid :   obj.uid,
    firstname :   obj.firstname ,
    station :   obj.station ,
    title :   obj.title ,
    lastname :   obj.lastname ,
    exp :  obj.exp
  })