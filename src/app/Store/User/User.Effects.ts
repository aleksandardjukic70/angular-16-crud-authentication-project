import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/service/user.service";
import { beginLogin, beginRegster, duplicateUseSuccess, duplicateUser, fetchmenu, fetchmenusuccess } from "./User.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";
import { Router } from "@angular/router";
import { Userinfo } from "../Model/User.model";

@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: UserService, private route: Router) {

    }

    _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegster),
            exhaustMap((action) => {
                return this.service.UserRegistration(action.userdata).pipe(
                    map(() => {
                        this.route.navigate(['login'])
                        return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registered Failed.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _userlogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.UserLogin(action.usercred).pipe(
                    switchMap((data:Userinfo[]) => {
                        if (data.length > 0) {
                            const _userdata = data[0];
                            console.log(data);
                            if (_userdata.status === true) {
                                this.service.SetUserToLocalStorage(_userdata);
                                this.route.navigate([''])
                                return of(
                                    fetchmenu({userrole:_userdata.role}),
                                    showalert({ message: 'Login successfully.', resulttype: 'pass' }))
                            } else {
                                return of(showalert({ message: 'InActive User.', resulttype: 'fail' }))
                            }
                        } else {
                            return of(showalert({ message: 'Login Failed: Invalid credentials.', resulttype: 'fail' }))
                        }

                    }),
                    catchError((_error) => of(showalert({ message: 'Login Failed.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _duplicateuser = createEffect(() =>
        this.action$.pipe(
            ofType(duplicateUser),
            switchMap((action) => {
                return this.service.Duplicateusername(action.username).pipe(
                    switchMap((data) => {
                        if (data.length > 0) {
                            return of(
                                duplicateUseSuccess({ isduplicate: true }),
                                showalert({ message: 'Username already exists.', resulttype: 'fail' }))
                        } else {
                            return of(duplicateUseSuccess({ isduplicate: false }))
                        }
                    }),
                    catchError((_error) => of(showalert({ message: 'Registered Failed.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _loadmenubyrole = createEffect(() =>
        this.action$.pipe(
            ofType(fetchmenu),
            exhaustMap((action) => {
                return this.service.GetMenubyRole(action.userrole).pipe(
                    map((data) => {
                        return fetchmenusuccess({ menulist:data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch menu list', resulttype: 'fail' })))
                )
            })
        )
    )
}