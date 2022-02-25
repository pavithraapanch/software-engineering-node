/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageControllerDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:sendUid/messages/:recUid/", MessageController.messageController.sendMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
            app.get("/api/users/:uid/sentMessages", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid/recdMessages", MessageController.messageController.findAllMessagesReceivedByUser);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageControllerDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageControllerDao.findAllMessagesSentByUser(req.params.uid)
        .then(messages => res.json(messages));

    sendMessage = (req: Request, res: Response) =>
        MessageController.messageControllerDao.sendMessage(req.params.sendUid, req.params.recUid, req.body)
            .then(messages => res.json(messages));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageControllerDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
}
