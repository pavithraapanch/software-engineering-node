import Follow from "../models/follows/Follow";
/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface FollowDaoI {
    followUser (uid: String, followingUid: String): Promise<Follow>;
    unfollowUser (uid: String, followUid: String): Promise<any>;
    findAllFollowersForCurrentUser (uid: String): Promise<Follow[]>;
    findAllUsersCurrentUserIsFollowing (uid: String): Promise<Follow[]>;
};