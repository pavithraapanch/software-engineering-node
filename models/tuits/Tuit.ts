/**
 * @file Declares Tuit data type representing tuit being posted
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents relationship between two user objects,
 * as in a user posts a tuit
 * @property {String} tuit Tuit being posted
 * @property {User} postedBy User posting the tuit
 * @property {Date} postedOn User posting date
 */

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn: Date,
};