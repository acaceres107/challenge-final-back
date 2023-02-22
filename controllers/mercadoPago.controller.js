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
            title: "Nebula Games",
            quantity: 1,
            currency_id: "ARS",
            unit_price: product.unit_price
        }],
            back_urls: {
            success: "http://localhost:3000/home",
            pending: "http://localhost:3000/",
            failure: "http://localhost:3000/",
      },
      auto_return: "approved",
    }
    const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', preference, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });
    return res.status(200).json({ url: mercadopagoResponse.data.init_point, success: true });
}
export default order;