import { Games } from "../models/Games.model.js"
import defaultResponse from "../config/response.js"


const controller = {
    read: async (req, res, next) => {
        console.log(req.query)
        let ordering = {}
        let queriesToFilter = {}
     /*    let pagination = {
            page:1 ,
            //limit: 10 
        } */
        if(req.query.title){
            queriesToFilter.title = { "$regex": req.query.title, $options: "i" };
        }
        if (req.query.category){
            queriesToFilter.category = req.query.category.split(",")
        }
        if (req.query.price){
            queriesToFilter.price = { "$regex": req.query.price, $options: "i" };
        }
        if (req.query.sort){
            ordering = {price: req.query.sort}
        }
        if (req.query.page) {
			pagination.page = req.query.page;
		}
    try {
        let all = await Games.find(queriesToFilter)//.populate("category")
        .sort(ordering)
        //.skip( pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
        //.limit(pagination.limit)
        if (all) {
            req.body.success = true;
            req.body.sc = 200;
            req.body.data = all;
            return defaultResponse(req, res);
        } else {
            req.body.success = false;
            req.body.sc = 404;
            req.body.data = "not found";
            return defaultResponse(req, res);
        }
    } catch (error) {
        next(error);
    }
}
}

export default controller
