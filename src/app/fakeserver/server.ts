import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() { }

    compareValues(key, order = 'asc') {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // array in local storage for registered students
        let students: any[] = JSON.parse(localStorage.getItem('students')) || [];
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/auth') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // // get users
            // if (request.url.endsWith('/users') && request.method === 'GET') {
            //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         return of(new HttpResponse({ status: 200, body: users }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ status: 401, error: { message: 'Unauthorised' } });
            //     }
            // }

            if (request.url.match(/\/users\?username=[^&]+&*/) && request.method === 'GET') {

                // find user by id in users array
                let urlParts = request.url.split('=');
                let username = urlParts[urlParts.length - 1];
                let matchedUsers = users.filter(user => { return user.username === username; });
                let user = matchedUsers.length ? matchedUsers[0] : null;

                return of(new HttpResponse({ status: 200, body: user }));

            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = Math.floor((Math.random() * 100) + 1);
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
            //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         let urlParts = request.url.split('/');
            //         let id = parseInt(urlParts[urlParts.length - 1]);
            //         for (let i = 0; i < users.length; i++) {
            //             let user = users[i];
            //             if (user.id === id) {
            //                 // delete user
            //                 users.splice(i, 1);
            //                 localStorage.setItem('users', JSON.stringify(users));
            //                 break;
            //             }
            //         }

            //         // respond 200 OK
            //         return of(new HttpResponse({ status: 200 }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ status: 401, error: { message: 'Unauthorised' } });
            //     }
            // }

            // get students
            if (request.url.endsWith('/students') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: students.sort(this.compareValues('FirstName')) }));
            }

            // register student
            if (request.url.endsWith('/student/add') && request.method === 'POST') {
                // get new student object from post body
                let newStudent = request.body;

                // save new student
                newStudent.ID = Math.floor((Math.random() * 100) + 1);
                students.push(newStudent);
                localStorage.setItem('students', JSON.stringify(students));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/students\/\d+$/) && request.method === 'GET') {

                // find student by id in students array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedStudent = students.filter(student => { return student.ID === id; });
                let student = matchedStudent.length ? matchedStudent[0] : null;

                return of(new HttpResponse({ status: 200, body: student }));

            }
            if (request.url.match(/\/student\/edit\/\d+$/) && request.method === 'PUT') {

                // find student by id in students array
                let editedStudent = request.body;
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let index = students.findIndex(student => { return student.ID === id; });
                students[index] = editedStudent;
                localStorage.setItem('students', JSON.stringify(students));
                return of(new HttpResponse({ status: 200 }));

            }

            // pass through any requests not handled above
            return next.handle(request);

        }))


            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let BackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};