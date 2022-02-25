import express, {Request, Response} from 'express';
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";
import LikeController from "./controller/LikeController";
//import FollowController from "./controller/FollowController";
import BookmarkController from "./controller/BookmarkController";
//import MessageController from "./controller/MessageController";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// connect to the database
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = 'mongodb+srv://pavithraapanch:mongo2022*@cluster0.5pmw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionString).then(_ => console.log("Success"));

const app = express();
app.use(bodyParser.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
//const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
//const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);