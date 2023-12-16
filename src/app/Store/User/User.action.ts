import { createAction, props } from "@ngrx/store"
import { Roleaccess, Usercred, Users } from "../Model/User.model"


export const BEGIN_REGISTER='[auth] begin register'
export const BEGIN_LOGIN='[auth] begin login'

export const DUPLICATE_USER='[auth] duplicate user'
export const DUPLICATE_USER_SUCC='[auth] duplicate user succ'

export const FETCH_MENU='[auth] fetch menu'
export const FETCH_MENU_SUCC='[auth] fetch menu succ'

export const beginRegster=createAction(BEGIN_REGISTER, props<{userdata:Users}>())
export const beginLogin=createAction(BEGIN_LOGIN, props<{usercred:Usercred}>())

export const duplicateUser=createAction(DUPLICATE_USER, props<{username:string}>())
export const duplicateUseSuccess=createAction(DUPLICATE_USER_SUCC, props<{isduplicate:boolean}>())

export const fetchmenu=createAction(FETCH_MENU, props<{userrole:string}>())
export const fetchmenusuccess=createAction(FETCH_MENU_SUCC, props<{menulist:Roleaccess[]}>())