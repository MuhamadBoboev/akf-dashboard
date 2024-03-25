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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreateProduct = void 0;
var CustomCard_1 = require("@shared/ui/CustomCard");
var Typography_1 = require("@mui/material/Typography");
var react_hook_form_1 = require("react-hook-form");
var CreateProductFormData_1 = require("@modules/product/model/createProduct/CreateProductFormData");
var yup_1 = require("@hookform/resolvers/yup");
var Grid_1 = require("@mui/material/Grid");
var FileUploader_1 = require("@shared/ui/FileUploader");
var react_1 = require("react");
var TextFieldCustom_1 = require("@shared/ui/TextFieldCustom");
var react_draft_wysiwyg_1 = require("src/@core/components/react-draft-wysiwyg");
var draft_js_1 = require("draft-js");
require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
var react_draft_wysiwyg_2 = require("../../../../@core/styles/libs/react-draft-wysiwyg");
var draft_js_export_html_1 = require("draft-js-export-html");
var swr_1 = require("swr");
var getFetcher_1 = require("@shared/api/fetcher/getFetcher");
var InputLabel_1 = require("@mui/material/InputLabel");
var material_1 = require("@mui/material");
var MenuItem_1 = require("@mui/material/MenuItem");
var ModalFormControl_1 = require("@shared/ui/ModalFormControl");
var lab_1 = require("@mui/lab");
var mutation_1 = require("swr/mutation");
var postFetcher_1 = require("@shared/api/fetcher/postFetcher");
var react_hot_toast_1 = require("react-hot-toast");
var router_1 = require("next/router");
function CreateProduct() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k = react_1.useState([]), image = _k[0], setImage = _k[1];
    var _l = react_1.useState(draft_js_1.EditorState.createEmpty()), description = _l[0], setDescription = _l[1];
    var _m = react_1.useState([]), categories = _m[0], setCategories = _m[1];
    var _o = react_1.useState([]), subcategories = _o[0], setSubcategories = _o[1];
    var _p = react_1.useState([]), features = _p[0], setFeatures = _p[1];
    var _q = react_1.useState(false), openCategory = _q[0], setOpenCategory = _q[1];
    var _r = react_1.useState(false), openSubcategory = _r[0], setOpenSubcategory = _r[1];
    var categoriesData = swr_1["default"]('/categories', getFetcher_1.getFetcher).data;
    var featuresData = swr_1["default"]('/features', getFetcher_1.getFetcher).data;
    var productTypes = swr_1["default"]('/product-type', getFetcher_1.getFetcher).data;
    var _s = mutation_1["default"]('/products', postFetcher_1.postFetcher), trigger = _s.trigger, isMutating = _s.isMutating;
    var _t = react_hook_form_1.useForm({
        mode: 'onBlur',
        defaultValues: {
            category_id: null,
            subcategory_id: []
        },
        resolver: yup_1.yupResolver(CreateProductFormData_1.createProductScheme)
    }), errors = _t.formState.errors, handleSubmit = _t.handleSubmit, control = _t.control, setValue = _t.setValue, watch = _t.watch, getValues = _t.getValues, setError = _t.setError, reset = _t.reset;
    var router = router_1.useRouter();
    react_1.useEffect(function () {
        setValue('description', draft_js_export_html_1.stateToHTML(description.getCurrentContent()));
    }, [description]);
    react_1.useEffect(function () {
        if (categoriesData) {
            var category = categoriesData.data.find(function (_a) {
                var id = _a.id;
                return Number(getValues('category_id')) === id;
            });
            if (category) {
                setCategories((category === null || category === void 0 ? void 0 : category.subcategories) || []);
            }
            setSubcategories([]);
        }
        if (categoriesData) {
            var categoryId = getValues('category_id');
            if (categoryId) {
                var selectedCategoryId_1 = categoryId;
                if (selectedCategoryId_1) {
                    var providerId_1 = getValues('category_id');
                    var provider = categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData.data.find(function (_a) {
                        var id = _a.id;
                        return id === Number(providerId_1);
                    });
                    setSubcategories(provider.subcategories.filter(function (subcategory) { return subcategory.category_id === Number(selectedCategoryId_1); }));
                }
            }
        }
    }, [watch('category_id'), watch('subcategory_id')]);
    if (!featuresData) {
        return null;
    }
    // useEffect(() => {
    //   const selectedFeatureIds = getValues('feature_ids')
    //   const selectedFeatures = featuresData?.data.filter(feature => selectedFeatureIds?.includes(feature.id))
    //   let features: IFeature[] = []
    //   selectedFeatures.forEach((feature) => {
    //     features.push(feature)
    //   })
    //   setFeatures(features)
    // }, [watch('feature_ids')])
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var categoryId, formData, response, e_1, error;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    categoryId = getValues('category_id');
                    if (!categoryId) {
                        setError('category_id', {
                            message: 'Выберите категорию или коллекцию'
                        });
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    formData = __assign(__assign({}, data), { image: image[0] });
                    if (data.category_id) {
                        formData.category_id = formData.category_id;
                    }
                    if (data.subcategory_id && data.subcategory_id[0]) {
                        formData.subcategory_id = formData.subcategory_id[0];
                    }
                    return [4 /*yield*/, trigger(formData)];
                case 2:
                    response = _b.sent();
                    react_hot_toast_1["default"].success(response.message);
                    reset({
                        name: '',
                        category_id: null,
                        subcategory_id: [],
                        feature_ids: [],
                        base_price: undefined,
                        discount: undefined,
                        image: '',
                        description: '',
                        product_type_id: undefined,
                        sku: '',
                        quantity: undefined
                    });
                    // router.push(`/main/products/${response.product.slug}`)
                    router.push("/main/products/");
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    error = e_1;
                    react_hot_toast_1["default"].error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) || 'Произошла ошибка');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!categoriesData || !productTypes) {
        return null;
    }
    return (React.createElement(CustomCard_1["default"], null,
        React.createElement(Typography_1["default"], { variant: "h5", component: "h1", mt: 8, ml: 8 }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440"),
        React.createElement("form", { noValidate: true, autoComplete: "off", onSubmit: handleSubmit(onSubmit) },
            React.createElement(Grid_1["default"], { container: true, spacing: 5, p: 8, boxSizing: "border-box" },
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(TextFieldCustom_1["default"], { name: "name", control: control, label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", errorMessage: (_a = errors.name) === null || _a === void 0 ? void 0 : _a.message, required: true })),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(TextFieldCustom_1["default"], { name: "base_price", control: control, label: "\u0426\u0435\u043D\u0430", errorMessage: (_b = errors.base_price) === null || _b === void 0 ? void 0 : _b.message, required: true, typeNumber: true })),
                React.createElement(Grid_1["default"], { item: true, xs: 12 },
                    React.createElement(Typography_1["default"], { variant: "h6", mb: 2 }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
                    React.createElement(react_draft_wysiwyg_2.EditorWrapper, null,
                        React.createElement(react_draft_wysiwyg_1["default"], { editorState: description, onEditorStateChange: function (data) { return setDescription(data); } }),
                        React.createElement(react_hook_form_1.Controller, { name: "description", control: control, render: function (_a) {
                                var field = _a.field;
                                return (React.createElement("input", __assign({ type: "hidden" }, field)));
                            } }))),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(ModalFormControl_1["default"], { errorMessage: (_c = errors.category_id) === null || _c === void 0 ? void 0 : _c.message },
                        React.createElement(InputLabel_1["default"], { id: "select-category" }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F *"),
                        React.createElement(react_hook_form_1.Controller, { name: "category_id", control: control, render: function (_a) {
                                var field = _a.field;
                                return (React.createElement(material_1.Select, __assign({ labelId: "select-category-label", id: "select-category", label: "\u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A *" }, field, { required: true, onChange: function (event) {
                                        if (field.onChange) {
                                            field.onChange(event);
                                        }
                                        if (event.target.value) {
                                            var selected = Number(event.target.value);
                                            if (selected) {
                                                setValue('category_id', selected);
                                            }
                                        }
                                        setValue('subcategory_id', []);
                                    } }), categoriesData.data.map(function (_a) {
                                    var id = _a.id, name = _a.name;
                                    return (React.createElement(MenuItem_1["default"], { key: id, value: id }, name));
                                })));
                            } }))),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(ModalFormControl_1["default"], { errorMessage: (_d = errors.subcategory_id) === null || _d === void 0 ? void 0 : _d.message },
                        React.createElement(InputLabel_1["default"], { id: "select-subcategory" },
                            "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F * \u00A0",
                            categories.length < 1 ? '( Пусто )' : "( " + categories.length + " )"),
                        React.createElement(react_hook_form_1.Controller, { name: "subcategory_id", control: control, render: function (_a) {
                                var field = _a.field;
                                return (React.createElement(material_1.Select, __assign({ labelId: "select-subcategory-label", id: "select-subcategory", label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F * " + (categories.length < 1 ? '( Пусто )' : "( " + categories.length + " )"), required: true }, field, { disabled: categories.length < 1, multiple: true, onChange: function (event) {
                                        var _a;
                                        if (field.onChange) {
                                            field.onChange(event);
                                        }
                                        if ((_a = event.target.value) === null || _a === void 0 ? void 0 : _a.length) {
                                            var selected = Number(event.target.value[event.target.value.length - 1]);
                                            if (selected) {
                                                setValue('subcategory_id', [selected]);
                                            }
                                        }
                                        // setValue('subcategory_id', [])
                                        setOpenCategory(false);
                                    }, open: openCategory, onOpen: function () { return setOpenCategory(true); }, onClose: function () { return setOpenCategory(false); } }), categories.map(function (_a) {
                                    var id = _a.id, name = _a.name;
                                    return (React.createElement(MenuItem_1["default"], { key: id, value: id }, name));
                                })));
                            } }))),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(TextFieldCustom_1["default"], { name: "sku", control: control, label: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B", errorMessage: (_e = errors.sku) === null || _e === void 0 ? void 0 : _e.message, required: true })),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(TextFieldCustom_1["default"], { name: "discount", control: control, label: "\u0421\u043A\u0438\u0434\u043A\u0430 %", errorMessage: (_f = errors.discount) === null || _f === void 0 ? void 0 : _f.message, typeNumber: true })),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(TextFieldCustom_1["default"], { name: "quantity", control: control, label: "\u041A\u043E\u043B-\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432", errorMessage: (_g = errors.quantity) === null || _g === void 0 ? void 0 : _g.message, required: true, typeNumber: true })),
                React.createElement(Grid_1["default"], { item: true, xs: 6 },
                    React.createElement(ModalFormControl_1["default"], { errorMessage: (_h = errors.product_type_id) === null || _h === void 0 ? void 0 : _h.message },
                        React.createElement(InputLabel_1["default"], { id: "select-product-type" }, "\u0422\u0438\u043F \u0442\u043E\u0432\u0430\u0440\u0430"),
                        React.createElement(react_hook_form_1.Controller, { name: "product_type_id", control: control, render: function (_a) {
                                var field = _a.field;
                                return (React.createElement(material_1.Select, __assign({ labelId: "select-product-type-label", id: "select-product-type", label: "\u0422\u0438\u043F \u0442\u043E\u0432\u0430\u0440\u0430" }, field),
                                    React.createElement(MenuItem_1["default"], { value: undefined }, "\u0411\u0435\u0437 \u0442\u0438\u043F\u0430"),
                                    productTypes.data.map(function (_a) {
                                        var id = _a.id, name = _a.name;
                                        return (React.createElement(MenuItem_1["default"], { key: id, value: id }, name));
                                    })));
                            } }))),
                React.createElement(Grid_1["default"], { item: true, xs: 12 },
                    React.createElement(FileUploader_1.FileUploader, { name: "image", control: control, setValue: setValue, files: image, setFiles: setImage, errorMessage: (_j = errors.image) === null || _j === void 0 ? void 0 : _j.message })),
                React.createElement(Grid_1["default"], { item: true, xs: 12 },
                    React.createElement(lab_1.LoadingButton, { fullWidth: true, type: "submit", variant: "contained", size: "large", loading: isMutating, disabled: isMutating }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"))))));
}
exports.CreateProduct = CreateProduct;
