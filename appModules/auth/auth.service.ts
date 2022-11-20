import { Injectable } from '@nestjs/common';

const jwt = require('jsonwebtoken');

interface UserJwtData {
  id: string,
}

const optionValues = {
  JWT_SECRETKEY : process.env.JWT_SECRETKEY,
  TokenValidTime : 60 * 60 * 24 * 30, // 1month
}

@Injectable()
export class AuthService {
  constructor(){}
 
  async isValidUser(request : any, response : any): Promise<boolean> {
    let loginToken = request.get('loginToken');
    if(!loginToken) return false

    let decodedJWT;
    try{
      decodedJWT = await this.JWT.decode.verify(loginToken);
    } catch(e){
      return false
    }

    request.userId = decodedJWT.data.id;
    return true
  }

  async genLoginToken(userId: string): Promise<string> {
    let newLoginTokenData : UserJwtData = {
      id : userId
    }
    let newLoginToken = await this.JWT.gen.user(newLoginTokenData)

    return newLoginToken
  }

  JWT = {
    gen: {
      user: function (jwtData : UserJwtData) : string {
        const generatedToken = jwt.sign({ 
          exp: Math.floor(Date.now() / 1000) + (optionValues.TokenValidTime),
          data: jwtData
        }, optionValues.JWT_SECRETKEY);
      
        return generatedToken;
      }
    },

    decode: {
      verify: function(token: string) : Promise<any>{
        return new Promise(function(rs, rj){
          jwt.verify(token, optionValues.JWT_SECRETKEY, function(err, decoded) {
            if(err) rj(err)
            return rs(decoded);
          });
        })
      },
    
    },
  }

}