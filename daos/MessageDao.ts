import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    sendMessage = async(sendUid: String, recUid: String, message: Message): Promise<Message> =>
        MessageModel.create({...message, sentFrom: sendUid, sentTo: recUid});
    deleteMessage = async(mid: String): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
    findAllMessagesSentByUser = async(uid: String): Promise<Message[]> =>
        MessageModel.find({sentFrom: uid});
    findAllMessagesReceivedByUser = async(uid: String): Promise<Message[]> =>
        MessageModel.find({sentTo: uid});
}
