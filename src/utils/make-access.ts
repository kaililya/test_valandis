import md5 from "md5";
import { password } from "./constants";
import { formatDate } from "./format-date";

export const makeAccess = ():string =>  md5(password + '_' + formatDate(new Date))
 