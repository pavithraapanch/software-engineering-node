import Message from "../models/messages/Message";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface MessageDaoI {
    sendMessage (sendUid: String, recUid: String, message: Message): Promise<Message>;
    deleteMessage (mid: String): Promise<any>;
    findAllMessagesSentByUser (uid: String): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: String): Promise<Message[]>;
    //delete message for a specific user
};