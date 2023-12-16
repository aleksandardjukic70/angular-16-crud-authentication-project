import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../Model/User.model";

const getUserState=createFeatureSelector<UserModel>('user');

export const isDuplicateUser=createSelector(getUserState, (state)=> state.isDuplicate);

export const GetMenubyRole=createSelector(getUserState, (state)=> state.menulist);