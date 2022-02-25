/**
 * @file Declares Message data type representing message between
 * users, as in user messages another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents relationship between two user objects,
 * as in a user messages another user
 * @property {String} message Message being sent
 * @property {User} sentFrom User sending the message
 * @property {User} sentTo User receiving the message
 * @property {Date} sentOn Message sending date
 */

export default interface Message {
    message: String,
    sentFrom: User,
    sentTo: User,
    sentOn: Date
};