import { Injectable } from "@angular/core";
import { HttpClient } from 'selenium-webdriver/http';
import {User} from '../interfaces';


@Injectable

export class AuthService {
    constructor(private http: HttpClient) {}

    register() {}

    login(user: User) {}

}