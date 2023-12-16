import { createReducer, on } from "@ngrx/store";
import { UserState } from "./User.state";
import { duplicateUseSuccess, fetchmenusuccess } from "./User.action";


const _userReducer=createReducer(UserState,
    on(duplicateUseSuccess, (state, action)=> {
        return {...state, isDuplicate:action.isduplicate}
    }),
    on(fetchmenusuccess, (state, action)=> {
        return {...state, menulist:action.menulist}
    }),
)

export function UserReducer(state:any, action:any){
    return _userReducer(state, action);
}