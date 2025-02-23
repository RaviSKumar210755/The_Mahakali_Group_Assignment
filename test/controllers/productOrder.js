import ProductOrder from "./../../models/productOrder.js";
import flushCache from "../../utils/flushAll.js";
const ProductOrderController = async (req, res) => {
  try {
    await flushCache();
    const products = Array.isArray(req.body) ? req.body : [req.body];
    for (let i = 0; i < products.length; i++) {
      const {
        seller_id,
        user_id,
        product_variant_id,
        product_id,
        order_id,
        quantity,
        tax_amount_id,
        transaction_type,
        address_id,
        logistics_tracking_link,
        coupon_discount = 0.0,
        bank_discount = 0.0,
        no_return_discount = 0.0,
        cod_charges = 0.0,
        shipping_charges = 0.0,
        packing_charges = 0.0,
        handling_charges = 0.0,
        net_amount = 0.0,
        gross_amount,
        indiazona_price,
        checkout_logistics_price,
        awb_number,
        nimbus_label,
        nimbus_manifest,
        product_order_code,
        cancelled_at,
      } = products[i];

      const productOrderResult = await ProductOrder.create({
        seller_id,
        user_id,
        product_variant_id,
        product_id,
        order_id,
        quantity,
        tax_amount_id,
        transaction_type,
        address_id,
        logistics_tracking_link,
        coupon_discount,
        bank_discount,
        no_return_discount,
        cod_charges,
        shipping_charges,
        packing_charges,
        handling_charges,
        net_amount,
        gross_amount,
        indiazona_price,
        checkout_logistics_price,
        awb_number,
        nimbus_label,
        nimbus_manifest,
        product_order_code,
        cancelled_at,
      });
    }

    return res.status(201).json("All Products Created Successfully");
  } catch (error) {
    console.error("Error creating product order:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default ProductOrderController;
