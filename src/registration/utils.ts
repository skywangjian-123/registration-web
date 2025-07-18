import { COUNTRIES, GENDERS } from "./consts"

export const getCountryByCode = (code: string)=>{
    let findItem = COUNTRIES.find(item=>item.value===code);
    return findItem?.label;
}

export const getGenderByCode = (code: string)=>{
    let findItem = GENDERS.find(item=>item.value===code);
    return findItem?.label;
}