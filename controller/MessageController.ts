/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/sentMessages to retrieve all the messages sent by this user
 *     </li>
 *     <li>GET /api/users/:uid/recdMessages to retrieve all the messages received by this user
 *     </li>
 *     <li>POST /api/users/:sendUid/messages/:recUid to record that a user messages another user
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that a user
 *     deletes a message sent to another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing follows CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
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

    /**
     * Retrieves all the messages received by this user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user's received messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects that were received by this user
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageControllerDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all the messages sent by this user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user's sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that were sent by this user
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageControllerDao.findAllMessagesSentByUser(req.params.uid)
        .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters sendUid and recUid representing the user that is sending the message and the
     * user that is receiving the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageControllerDao.sendMessage(req.params.sendUid, req.params.recUid, req.body)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the id of the message to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageControllerDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
}
