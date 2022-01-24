import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../utils/user";
import {Friendship} from "../../utils/friendship";
import {Message} from "../../utils/message";
import {Post} from "../../utils/post";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private baseUrl = environment.apiURL;

    constructor(private httpClient: HttpClient) {
    }

    getUser(email: string): Observable<User> {
        const uri = this.baseUrl + `/api/user/${email}`;
        return this.httpClient.get<User>(uri, httpOptions);
    }

    getUserPosts(email: string): Observable<Post[]> {
        const uri = this.baseUrl + `/api/user/${email}/posts`;
        return this.httpClient.get<Post[]>(uri, httpOptions);
    }

    getUserFriendships(email: string): Observable<Friendship[]> {
        const uri = this.baseUrl + `/api/user/${email}/friendships`;
        return this.httpClient.get<Friendship[]>(uri, httpOptions);
    }

    getUserMessages(email: string): Observable<Message[]> {
        const uri = this.baseUrl + `/api/user/${email}/messages`;
        return this.httpClient.get<Message[]>(uri, httpOptions);
    }

}
