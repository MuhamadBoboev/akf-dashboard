"use strict";
exports.__esModule = true;
exports.UpdateProduct = void 0;
var CustomCard_1 = require("@shared/ui/CustomCard");
var router_1 = require("next/router");
var swr_1 = require("swr");
var Loader_1 = require("@shared/ui/Loader");
var Typography_1 = require("@mui/material/Typography");
var Box_1 = require("@mui/material/Box");
var material_1 = require("@mui/material");
var react_1 = require("react");
var getFetcher_1 = require("@shared/api/fetcher/getFetcher");
var UpdateProductMain_1 = require("@modules/product/ui/updateProduct/UpdateProductMain");
var navigation_1 = require("next/navigation");
var ProductImages_1 = require("@modules/product/ui/images/ProductImages");
function UpdateProduct() {
    var router = router_1.useRouter();
    var _a = react_1.useState('main'), value = _a[0], setValue = _a[1];
    var _b = swr_1["default"]("/products/" + router.query.slug, getFetcher_1.getFetcher), product = _b.data, isLoading = _b.isLoading, mutate = _b.mutate, isValidating = _b.isValidating, error = _b.error;
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    if (isLoading || isValidating || !product) {
        return React.createElement(Loader_1["default"], null);
    }
    if (error) {
        navigation_1.notFound();
    }
    // console.log(product)
    return (React.createElement(CustomCard_1["default"], null,
        React.createElement(Typography_1["default"], { component: "h1", variant: "h5", mt: 10, ml: 10 }, product === null || product === void 0 ? void 0 : product.data.name),
        React.createElement(Box_1["default"], { px: 10, mt: 5, mb: 10 },
            React.createElement(material_1.Tabs, { value: value, onChange: handleChange, "aria-label": "basic tabs example" },
                React.createElement(material_1.Tab, { label: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435", value: "main" }),
                React.createElement(material_1.Tab, { label: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0438", value: "images" }))),
        React.createElement(Box_1["default"], { px: 10, mb: 5, pb: 5 },
            value === 'main' && product && React.createElement(UpdateProductMain_1.UpdateProductMain, { product: product.data, mutate: mutate }),
            value === 'images' && product && React.createElement(ProductImages_1.ProductImages, { productSlug: product.data.slug, productId: product.data.id }))));
}
exports.UpdateProduct = UpdateProduct;
