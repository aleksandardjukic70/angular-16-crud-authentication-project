import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "../Model/Associate.model";

const getassociatestate=createFeatureSelector<AssociateModel>('associate');

export const getassociatestatelist=createSelector(getassociatestate, (state) =>{
    return state.list;
})

export const getassociate=createSelector(getassociatestate, (state) =>{
    return state.associateobj;
})