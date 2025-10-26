import {commonAPI} from "./commonAPI";
import {serverURL} from "./serverURL";


export const addMember = async (member) => {
    return await commonAPI("POST", `${serverURL}/members`, member);
}