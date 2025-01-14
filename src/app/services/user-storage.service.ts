import { Injectable } from '@angular/core';

const TOKEN = "token"
const USER = "user"

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  saveToken(token:string){
    localStorage.removeItem(TOKEN)
    localStorage.setItem(TOKEN,token)
  }

  saveUser(user:string){
    localStorage.removeItem(USER)
    localStorage.setItem(USER,JSON.stringify(user))
  }

  static getToken(){
    return localStorage.getItem(TOKEN)
  }

  static getUser(){
    return JSON.parse(localStorage.getItem(USER))
  }

}
