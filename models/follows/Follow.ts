/**
 * @file Declares Follows data type representing follows relationship between
 * users, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between users
 * as in a user follows another user
 * @property {User} userFollowed User requested to follow another user
 * @property {User} userFollowing User being followed by another user
 * @property {Date} followedOn User followed date
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User,
    followedOn: Date
};