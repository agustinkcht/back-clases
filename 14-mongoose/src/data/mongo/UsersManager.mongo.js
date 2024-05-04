import Manager from "./Manager.mongo";
import User from "./models/user.model";

const usersManager = new Manager(User)

export default usersManager;

