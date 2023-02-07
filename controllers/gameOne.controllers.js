import { Games } from '../models/Games.model.js'

const controllers = {

    getOneGame:  async (req, res, next) => {
        try {
            const { id } = req.params
            let game = await Games.findById(id)
            if (game) {
                res.status(200).json({
                    success: true,
                    response: game,
                })
            } else {
                res.status(400).json({
                    success: false,
                response: "game not found",
            })
        }
    } catch (error) {
        console.log(error) 
    }
}
}
export default controllers