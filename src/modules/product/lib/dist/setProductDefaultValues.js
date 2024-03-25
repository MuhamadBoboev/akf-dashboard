"use strict";
exports.__esModule = true;
exports.setProductDefaultValues = void 0;
function setProductDefaultValues(product) {
    return {
        name: product.name,
        sku: product.sku,
        base_price: product.base_price,
        discount: product.discount,
        quantity: product.quantity,
        // product_type_id: product.product_type?.id,
        category_id: [Number(product.categories)],
        subcategory_id: [Number(product.subcategories)]
    };
}
exports.setProductDefaultValues = setProductDefaultValues;
