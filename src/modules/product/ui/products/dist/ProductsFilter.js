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
exports.ProductsFilter = void 0;
var react_1 = require("react");
var InputLabel_1 = require("@mui/material/InputLabel");
var material_1 = require("@mui/material");
var MenuItem_1 = require("@mui/material/MenuItem");
var ModalFormControl_1 = require("@shared/ui/ModalFormControl");
var Button_1 = require("@mui/material/Button");
var arrayToSearchQuery_1 = require("@modules/product/lib/arrayToSearchQuery");
var Grid_1 = require("@mui/material/Grid");
function ProductsFilter(_a) {
    var isOpen = _a.isOpen, categories = _a.categories, 
    // providers,
    // collections,
    setSearch = _a.setSearch, setInputValue = _a.setInputValue, setQuery = _a.setQuery, 
    // selectedCollections,
    setSelectedCategories = _a.setSelectedCategories, 
    // setSelectedCollections,
    setSelectedSubcategories = _a.setSelectedSubcategories, selectedSubcategories = _a.selectedSubcategories, selectedCategories = _a.selectedCategories, selectedProviders = _a.selectedProviders, setSelectedProviders = _a.setSelectedProviders, setPaginationModel = _a.setPaginationModel, paginationModel = _a.paginationModel;
    var filteredSubcategories = react_1.useMemo(function () {
        var filtered = [];
        var categoriesElements = categories.filter(function (category) { return selectedCategories.includes(category.id); });
        categoriesElements.forEach(function (category) {
            filtered.push.apply(filtered, category.subcategories);
        });
        return filtered;
    }, [categories, selectedCategories]);
    if (!isOpen) {
        return null;
    }
    return (React.createElement(Grid_1["default"], { container: true, p: 8, spacing: 5 },
        React.createElement(Grid_1["default"], { item: true, xs: 3 },
            React.createElement(ModalFormControl_1["default"], null,
                React.createElement(InputLabel_1["default"], { id: "select-category", size: "small" }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"),
                React.createElement(material_1.Select, { labelId: "select-category", id: "select-category", label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", size: "small", multiple: true, value: selectedCategories, onChange: function (event) {
                        var value = event.target.value;
                        setSelectedCategories(Array.isArray(value) ? value : []);
                    } }, categories.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return (React.createElement(MenuItem_1["default"], { value: id }, name));
                })))),
        React.createElement(Grid_1["default"], { item: true, xs: 3 },
            React.createElement(ModalFormControl_1["default"], null,
                React.createElement(InputLabel_1["default"], { id: "select-subcategory", size: "small" }, "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"),
                React.createElement(material_1.Select, { labelId: "select-subcategory", id: "select-subcategory", label: "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", multiple: true, size: "small", value: selectedSubcategories, onChange: function (event) {
                        var value = event.target.value;
                        setSelectedSubcategories(Array.isArray(value) ? value : []);
                    } }, filteredSubcategories.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return (React.createElement(MenuItem_1["default"], { value: id }, name));
                })))),
        React.createElement(Grid_1["default"], { item: true, xs: 3, ml: "auto" },
            React.createElement(Button_1["default"], { variant: "outlined", size: "medium", type: "button", fullWidth: true, onClick: function () {
                    setInputValue('');
                    setSearch('');
                    setSelectedCategories([]);
                    setSelectedSubcategories([]);
                    setSelectedProviders([]);
                    // setSelectedCollections([])
                    setQuery('');
                } }, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440")),
        React.createElement(Grid_1["default"], { item: true, xs: 2 },
            React.createElement(Button_1["default"], { type: "button", variant: "contained", size: "medium", onClick: function () {
                    var query = '&';
                    if (selectedCategories.length) {
                        query += "&" + arrayToSearchQuery_1.arrayToSearchQuery('category_id', selectedCategories);
                    }
                    if (selectedSubcategories.length) {
                        query += "&" + arrayToSearchQuery_1.arrayToSearchQuery('subcategory_id', selectedSubcategories);
                    }
                    if (selectedProviders.length) {
                        query += "&" + arrayToSearchQuery_1.arrayToSearchQuery('provider_id', selectedProviders);
                    }
                    // if (selectedCollections.length) {
                    //   query += `&${arrayToSearchQuery('collection_id', selectedCollections)}`
                    // }
                    setQuery(query);
                    setPaginationModel(__assign(__assign({}, paginationModel), { page: 0 }));
                    // close()
                } }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"))));
}
exports.ProductsFilter = ProductsFilter;
