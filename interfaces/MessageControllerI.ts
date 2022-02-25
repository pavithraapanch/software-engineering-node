import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    findAllMessagesSentByUser(req: Request, res: Response): void;
    findAllMessagesReceivedByUser(req: Request, res: Response): void;
}