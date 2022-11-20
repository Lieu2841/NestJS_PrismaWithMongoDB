import { Injectable } from '@nestjs/common';

const crypto = require('crypto');

@Injectable()
export class CryptoService {

  constructor() {}

  async passwordEncrypt(originalString : string) : Promise<string> {

    let salt = process.env.HASH_PASS_SALT;
    let runtime = Number(process.env.HASH_PASS_RUNTIME);

    try{
      let encryptedString = await encryption(originalString, salt, runtime);
      return encryptedString
    } catch(e){
      return null
    }
  }
}

function encryption(string : string, salt: string, runtime: number) : Promise<string> {
  return new Promise(function(rs, rj){
    crypto.pbkdf2(string, salt, runtime, 64, "sha512", (err, derivedKey) => {
      if(err) return rj()
      return rs(derivedKey.toString('hex'))
    });
  })
}