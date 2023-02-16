import { User } from "../models/User.model.js";

const controllers = {

    getOneUser:  async (req, res, next) => {
        try {
            const { id } = req.params
            let oneUser = await User.findById(id)
            if (oneUser) {
                res.status(200).json({
                    success: true,
                    response: oneUser,
                })
            } else {
                res.status(400).json({
                    success: false,
                response: "User not found",
            })
        }
    } catch (error) {
        next(error)
    }
},

}
export default controllers 



