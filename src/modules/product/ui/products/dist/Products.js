"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Products = void 0;
var CustomCard_1 = require("@shared/ui/CustomCard");
var Typography_1 = require("@mui/material/Typography");
var swr_1 = require("swr");
var react_1 = require("react");
var getFetcher_1 = require("@shared/api/fetcher/getFetcher");
var Box_1 = require("@mui/material/Box");
var ProductsTable_1 = require("@modules/product/ui/products/ProductsTable");
var _500_1 = require("../../../../pages/500");
var TextField_1 = require("@mui/material/TextField");
var lab_1 = require("@mui/lab");
var react_2 = require("@iconify/react");
var Button_1 = require("@mui/material/Button");
var ProductsFilter_1 = require("@modules/product/ui/products/ProductsFilter");
var ProductsActiveModal_1 = require("@modules/product/ui/products/ProductsActiveModal");
function Products(_a) {
    var categories = _a.categories;
    var _b = react_1.useState({
        pageSize: 10,
        page: 0
    }), paginationModel = _b[0], setPaginationModel = _b[1];
    /** @filter */
    var _c = react_1.useState(''), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState(false), isOpenFilter = _d[0], setIsOpenFilter = _d[1];
    var _e = react_1.useState(''), inputValue = _e[0], setInputValue = _e[1];
    var _f = react_1.useState([]), selectedCategories = _f[0], setSelectedCategories = _f[1];
    var _g = react_1.useState([]), selectedSubcategories = _g[0], setSelectedSubcategories = _g[1];
    var _h = react_1.useState([]), selectedProviders = _h[0], setSelectedProviders = _h[1];
    var _j = react_1.useState([]), selectedCollections = _j[0], setSelectedCollections = _j[1];
    var _k = react_1.useState([]), rowSelectionModel = _k[0], setRowSelectionModel = _k[1];
    var _l = react_1.useState(''), query = _l[0], setQuery = _l[1];
    var _m = react_1.useState(false), activeModal = _m[0], setActiveModal = _m[1];
    var _o = swr_1["default"]("/products?page=" + (paginationModel.page + 1) + "&per_page=" + paginationModel.pageSize + (search ? "&search=" + search : '') + query, getFetcher_1.getFetcher, {
        keepPreviousData: true
    }), products = _o.data, isValidating = _o.isValidating, isLoading = _o.isLoading, error = _o.error, mutate = _o.mutate;
    react_1.useEffect(function () {
        if (products) {
            if (paginationModel.page > 0) {
                if (products.meta.total === 0) {
                    setPaginationModel(__assign(__assign({}, paginationModel), { page: paginationModel.page - 1 }));
                }
            }
        }
    }, [paginationModel, products]);
    if (error) {
        return React.createElement(_500_1["default"], null);
    }
    return (React.createElement(CustomCard_1["default"], { sx: {
            display: 'flex',
            flexDirection: 'column'
        } },
        React.createElement(Box_1["default"], { component: "header", mb: 5, display: "flex", alignItems: "center", justifyContent: "space-between", p: 5 },
            React.createElement(Typography_1["default"], { variant: "h5", component: "h1" }, "\u0422\u043E\u0432\u0430\u0440\u044B"),
            activeModal && (React.createElement(ProductsActiveModal_1.ProductsActiveModal, { close: function () { return setActiveModal(false); }, rowSelectionModel: rowSelectionModel, setRowSelectionModel: setRowSelectionModel, mutate: mutate })),
            React.createElement(Box_1["default"], null, rowSelectionModel.length > 0 && React.createElement(Button_1["default"], { variant: "contained", onClick: function () { return setActiveModal(true); } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C")),
            React.createElement(Box_1["default"], null,
                React.createElement(TextField_1["default"], { size: "small", value: inputValue, placeholder: "\u041F\u043E\u0438\u0441\u043A...", onChange: function (event) {
                        setInputValue(event.target.value);
                    }, onKeyUp: function (event) {
                        if (event.code === 'Enter') {
                            setSearch(inputValue);
                            setPaginationModel(__assign(__assign({}, paginationModel), { page: 0 }));
                        }
                    }, sx: { mr: 2 } }),
                React.createElement(lab_1.LoadingButton, { loading: isValidating, type: "button", size: "large", variant: "contained", sx: { minWidth: 'auto', px: 4, py: 3 }, onClick: function () {
                        setSearch(inputValue);
                        setPaginationModel(__assign(__assign({}, paginationModel), { page: 0 }));
                    } },
                    React.createElement(react_2.Icon, { icon: "carbon:search" }))),
            React.createElement(Box_1["default"], null,
                React.createElement(Button_1["default"], { variant: "contained", size: "medium", type: "button", sx: { ml: 5 }, onClick: function () {
                        setIsOpenFilter(!isOpenFilter);
                    } }, "\u0424\u0438\u043B\u044C\u0442\u0440"))),
        React.createElement(ProductsFilter_1.ProductsFilter, { isOpen: isOpenFilter, setQuery: setQuery, close: function () { return setIsOpenFilter(false); }, categories: categories, 
            // providers={providers}
            // collections={collections}
            selectedCategories: selectedCategories, selectedSubcategories: selectedSubcategories, 
            // selectedCollections={selectedCollections}
            setSelectedCategories: setSelectedCategories, setSelectedCollections: setSelectedCollections, setSelectedSubcategories: setSelectedSubcategories, selectedProviders: selectedProviders, setSelectedProviders: setSelectedProviders, setInputValue: setInputValue, setSearch: setSearch, setPaginationModel: setPaginationModel, paginationModel: paginationModel }),
        React.createElement(ProductsTable_1.ProductsTable, { mutate: mutate, loading: isLoading || isValidating, setPaginationModel: setPaginationModel, paginationModel: paginationModel, products: products, rowSelectionModel: rowSelectionModel, setRowSelectionModel: setRowSelectionModel })));
}
exports.Products = Products;
