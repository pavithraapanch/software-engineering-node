/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} bookmarkedBy User liking the tuit
 */
export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User
};