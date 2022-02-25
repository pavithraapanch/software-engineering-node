import {Request, Response} from "express";

export default interface FollowControllerI {
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;
    findAllFollowersForCurrentUser(req: Request, res: Response): void;
    findAllUsersCurrentUserIsFollowing(req: Request, res: Response): void;
}