import { User } from "../models/User.model.js";
import defaultResponse from "../config/response.js";

async function accountExistsSignIn(req, res, next) {
    const user = await User.findOne({ mail: req.body.mail });
    if (user) {
        req.user = {
            id: user._id,
            mail: user.mail,
            photo: user.photo,
            password: user.password,
            is_verified: user.is_verified,
        };
        return next();
    }
    req.body.success = false;
    req.body.sc = 400;
    req.body.data = "user does not exist!";
    return defaultResponse(req, res);
}
export default accountExistsSignIn