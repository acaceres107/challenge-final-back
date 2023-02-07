import {Category} from '../models/Categories.model.js'
import defaultResponse from "../config/response.js";

const controller = {
    read: async (req, res, next) => {

		try {
			let allcategories = await Category.find()
				
			if (allcategories) {
				req.body.success = true;
				req.body.sc = 200;
				req.body.data = allcategories;
				return defaultResponse(req, res);
			} else {
				req.body.success = false;
				req.body.sc = 404;
				req.body.data = "help";
				return defaultResponse(req, res);
			}
		} catch (error) {
			next(error);
		}
	},

}
export default controller