import axios from "axios";
import mercadopago from "mercadopago";

const order = async(req, res) => {
    let url = "https://api.mercadopago.com/checkout/preferences"

    const response =await axios.get(url, req.body, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    })
    const product = req.body
    console.log(product);
    const preference = {
        items: [{
            title: "Donation",
            quantity: 1,
            currency_id: "ARS",
            unit_price: product.unit_price
        }],
            back_urls: {
            success: "http://localhost:3000/success-payment",
            pending: "http://localhost:3000/",
            failure: "http://localhost:3000/",
      },
      auto_return: "approved",
    }
    mercadopago.preferences.create(preference)
    .then(function(response){

        if(req.body.unit_price){
            return res.status(response.status).json({
                response
            })
        }else{
            console.log("esto seria los otros items")
        } 
    })
    .catch(function(error){
        console.log(error)
        return res.status(500).json({
            message: "Failed to creat payment"
        })
    })

}
export default order;






/* import axios from "axios";

import { Games } from "../models/Games.model.js";

const controller = {
    order:async (req, res) => {
        const items = req.body
        const products = []
        for (const item of items) {
            const product = await Games.findById(item._id);
            products.push({
                title: product.title,
                quantity: 1,
                currency_id: "ARS", 
                unit_price: parseInt(product.price),
                id: item._id
            })
        }

        const payload = {
            items: products,
            back_urls: {
                success: "http://localhost:3000/success-payment",
                pending: "http://localhost:3000/",
                failure: "http://localhost:3000/",
          },
            auto_return: "approved",
        }
        const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        return res.status(200).json({ url: mercadopagoResponse.data.init_point, success: true });
    }
}
export default controller; */