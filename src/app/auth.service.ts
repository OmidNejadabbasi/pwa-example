import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWTService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwt: JWTService) {}

  me() {
    const url = new URL('/api/me', environment.apiUrl).href;
    return this.jwt.isStoredJwt
      ? this.http.get(url).pipe(catchError(() => of(null)))
      : of(null);
  }

  login(username: string, password: string) {
    const url = new URL('/api/login', environment.apiUrl).href;
    return this.http.post(url, { username, password }).pipe(
      catchError(() => of(null)),
      mergeMap((response: any) => {
        if (!response) {
          alert('Could not login');
          return of();
        }
        this.jwt.jwt = response.accessToken;
        return this.me();
      })
    );
  }

  signup(username: string, password: string) {
    const url = new URL('/api/signup', environment.apiUrl).href;
    return this.http
      .post(url, {
        username,
        password,
      })
      .pipe(
        catchError(() => of(null)),
        mergeMap((result: any) => {
          if (!result) {
            alert('Could not sign up');
            return of();
          }
          this.jwt.jwt = result.accessToken;
          return this.me();
        })
      );
  }
}
