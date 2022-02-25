/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followers to retrieve all the followers for the user
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users that current user is following
 *     </li>
 *     <li>POST /api/users/:uid/follows/:followUid to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:followUid to record that a user
 *     no longer follows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:followUid", FollowController.followController.followUser);
            app.delete("/api/users/:uid/unfollows/:followUid", FollowController.followController.unfollowUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllFollowersForCurrentUser);
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersCurrentUserIsFollowing);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and followUid representing the user that has requested to follow and the
     * user that is being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid, req.params.followUid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and followUid representing the user that has requested to follow and the
     * user that is being followed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid, req.params.followUid)
            .then(status => res.send(status));

    /**
     * Retrieves all the users who are following the given user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user to find the followers
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects that were being followed
     */
    findAllFollowersForCurrentUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersForCurrentUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that the current user is following
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is following other users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects that were being followed
     */
    findAllUsersCurrentUserIsFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersCurrentUserIsFollowing(req.params.uid)
            .then(follows => res.json(follows));
}