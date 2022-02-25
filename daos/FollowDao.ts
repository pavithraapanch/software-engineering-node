/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    followUser = async(uid: String, followingUid: String): Promise<Follow> =>
        FollowModel.create({userFollowed: uid, userFollowing: followingUid});
    unfollowUser = async(uid: String,followingUid: String): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: followingUid});
    findAllFollowersForCurrentUser = async(uid: String): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    findAllUsersCurrentUserIsFollowing = async(uid: String): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
}
