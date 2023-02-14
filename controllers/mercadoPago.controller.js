import axios from "axios";

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
export default controller;