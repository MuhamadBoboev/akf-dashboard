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
exports.UpdateProductForm = void 0;
var react_hook_form_1 = require("react-hook-form");
var Grid_1 = require("@mui/material/Grid");
var TextFieldCustom_1 = require("@shared/ui/TextFieldCustom");
var Typography_1 = require("@mui/material/Typography");
var react_draft_wysiwyg_1 = require("../../../../@core/styles/libs/react-draft-wysiwyg");
var react_draft_wysiwyg_2 = require("../../../../@core/components/react-draft-wysiwyg");
var react_1 = require("react");
var draft_js_1 = require("draft-js");
require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
var ModalFormControl_1 = require("@shared/ui/ModalFormControl");
var InputLabel_1 = require("@mui/material/InputLabel");
var material_1 = require("@mui/material");
var MenuItem_1 = require("@mui/material/MenuItem");
var swr_1 = require("swr");
var getFetcher_1 = require("@shared/api/fetcher/getFetcher");
var draft_js_import_html_1 = require("draft-js-import-html");
var draft_js_export_html_1 = require("draft-js-export-html");
function UpdateProductForm(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var description = _a.description, errors = _a.errors, control = _a.control, setValue = _a.setValue, watch = _a.watch, getValues = _a.getValues;
    var _j = react_1.useState(draft_js_1.EditorState.createWithContent(draft_js_import_html_1.stateFromHTML(description || ''))), descriptionState = _j[0], setDescriptionState = _j[1];
    var _k = react_1.useState([]), categories = _k[0], setCategories = _k[1];
    var _l = react_1.useState([]), subcategories = _l[0], setSubcategories = _l[1];
    // const [services, setServices] = useState<IService[]>([])
    var _m = react_1.useState(false), openCategory = _m[0], setOpenCategory = _m[1];
    var _o = react_1.useState(false), openSubcategory = _o[0], setOpenSubcategory = _o[1];
    // const [openCollection, setOpenCollection] = useState(false)
    var productTypes = swr_1["default"]('/product-type', getFetcher_1.getFetcher).data;
    var providers = swr_1["default"]('/categories', getFetcher_1.getFetcher).data;
    var categoriesData = swr_1["default"]('/categories', getFetcher_1.getFetcher).data;
    // const { data: collections } = useSWR<{ data: ICollection[] }>('/categories', getFetcher)
    react_1.useEffect(function () {
        setValue('description', draft_js_export_html_1.stateToHTML(descriptionState.getCurrentContent()));
    }, [descriptionState]);
    react_1.useEffect(function () {
        if (categoriesData) {
            var category = categoriesData.data.find(function (_a) {
                var id = _a.id;
                return Number(getValues('category_id')) === id;
            });
            if (category) {
                setCategories(category || []);
            }
            setSubcategories([]);
        }
        if (categoriesData) {
            var categoryId = getValues('category_id');
            if ((categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) && (categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) > 0) {
                var selectedCategoryId_1 = categoryId;
                if (selectedCategoryId_1) {
                    var categoryId_1 = getValues('category_id');
                    var category = categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData.data.find(function (_a) {
                        var id = _a.id;
                        return id === Number(categoryId_1);
                    });
                    setSubcategories(category.subcategories.filter(function (subcategory) { return subcategory.category_id === Number(selectedCategoryId_1); }));
                }
            }
        }
    }, [watch('category_id'), watch('subcategory_id'), categoriesData]);
    // setSubcategories(categoriesData?.data.subcategories)
    // const category_id = getValues('category_id')
    // console.log('category_id', getValues('category_id'), 'subcategory_id', getValues('subcategory_id'))
    // useEffect(() => {
    //   if (providers) {
    //     const provider = providers.data.find(({ id }) => Number(getValues('category_id')) === id)
    //     // setCategories(provider)
    //     setSubcategories([])
    //   }
    // }, [watch('category_id'), providers])
    // useEffect(() => {
    //   if (providers) {
    //     const categoryId = getValues('category_id')
    //     if (categoryId && categoryId[0]) {
    //       const selectedCategoryId = categoryId[0]
    //       if (selectedCategoryId) {
    //         const providerId = getValues('category_id')
    //         const provider = providers?.data.find(({ id }) => id === Number(providerId))
    //         setSubcategories(provider?.subcategories.filter(
    //           (subcategory) => subcategory.category_id === selectedCategoryId
    //         ) || [])
    //       }
    //     }
    //   }
    // }, [watch('category_id'), providers])
    // useEffect(() => {
    //   const category_id = getValues('category_id')
    //   if (category_id && category_id[0]) {
    //     const category = categories.find(category => category.id === category_id[0])
    //     if (category) {
    //       // setServices(category.services)
    //       const subcategory_id = getValues('subcategory_id')
    //       if (subcategory_id) {
    //         if (subcategory_id[0]) {
    //           const subcategory = subcategories.find(subcategory => subcategory.id === subcategory_id[0])
    //         }
    //       }
    //     }
    //   } else {
    //   }
    // }, [categories, subcategories, watch('category_id'), watch('subcategory_id')])
    // console.log(typeof getValues('category_id'))
    if (!providers || !productTypes || !categoriesData) {
        return null;
    }
    return (React.createElement(Grid_1["default"], { container: true, spacing: 6, py: 4, boxSizing: "border-box" },
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(TextFieldCustom_1["default"], { name: "name", control: control, label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", errorMessage: (_b = errors.name) === null || _b === void 0 ? void 0 : _b.message })),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(TextFieldCustom_1["default"], { name: "base_price", control: control, label: "\u0426\u0435\u043D\u0430", errorMessage: (_c = errors.base_price) === null || _c === void 0 ? void 0 : _c.message, required: true, typeNumber: true })),
        React.createElement(Grid_1["default"], { item: true, xs: 12 },
            React.createElement(Typography_1["default"], { variant: "h6", mb: 2 }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
            React.createElement(react_draft_wysiwyg_1.EditorWrapper, null,
                React.createElement(react_draft_wysiwyg_2["default"], { editorState: descriptionState, onEditorStateChange: function (data) { return setDescriptionState(data); } }),
                React.createElement(react_hook_form_1.Controller, { name: "description", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement("input", __assign({ type: "hidden" }, field)));
                    } }))),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(ModalFormControl_1["default"], { errorMessage: (_d = errors.category_id) === null || _d === void 0 ? void 0 : _d.message },
                React.createElement(InputLabel_1["default"], { id: "select-category" },
                    "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F * \u00A0",
                    categoriesData.data.length < 1 ? '( Пусто )' : "( " + categoriesData.data.length + " )"),
                React.createElement(react_hook_form_1.Controller, { name: "category_id", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(material_1.Select, __assign({ labelId: "select-category-label", id: "select-category", label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F * " + (categoriesData.data.length < 1 ? '( Пусто )' : "( " + categoriesData.data.length + " )"), required: true }, field, { disabled: categoriesData.data.length < 1, multiple: true, onChange: function (event) {
                                var _a;
                                if (field.onChange) {
                                    field.onChange(event);
                                }
                                if ((_a = event.target.value) === null || _a === void 0 ? void 0 : _a.length) {
                                    var selected = Number(event.target.value[event.target.value.length - 1]);
                                    if (selected) {
                                        setValue('category_id', [selected]);
                                    }
                                }
                                setValue('subcategory_id', []);
                                setOpenCategory(false);
                            }, open: openCategory, onOpen: function () { return setOpenCategory(true); }, onClose: function () { return setOpenCategory(false); } }), categoriesData.data.map(function (_a) {
                            var id = _a.id, name = _a.name;
                            return (React.createElement(MenuItem_1["default"], { key: id, value: id }, name));
                        })));
                    } }))),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(ModalFormControl_1["default"], { errorMessage: (_e = errors.subcategory_id) === null || _e === void 0 ? void 0 : _e.message },
                React.createElement(InputLabel_1["default"], { id: "select-subcategory" },
                    "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u00A0",
                    subcategories.length < 1 ? '( Пусто )' : "( " + subcategories.length + " )"),
                React.createElement(react_hook_form_1.Controller, { name: "subcategory_id", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(material_1.Select, __assign({ labelId: "select-subcategory-label", id: "select-subcategory", label: "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F " + (subcategories.length < 1 ? '(Пусто)' : "( " + subcategories.length + " )") }, field, { required: true, multiple: true, disabled: subcategories.length < 1, onChange: function (event) {
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
                                // setValue('collection_id', [])
                                setOpenSubcategory(false);
                            }, open: openSubcategory, onOpen: function () { return setOpenSubcategory(true); }, onClose: function () { return setOpenSubcategory(false); } }), subcategories.map(function (_a) {
                            var id = _a.id, name = _a.name;
                            return (React.createElement(MenuItem_1["default"], { key: id, value: id }, name));
                        })));
                    } }))),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(TextFieldCustom_1["default"], { name: "sku", control: control, label: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B", errorMessage: (_f = errors.sku) === null || _f === void 0 ? void 0 : _f.message, required: true })),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(TextFieldCustom_1["default"], { name: "discount", control: control, label: "\u0421\u043A\u0438\u0434\u043A\u0430 %", errorMessage: (_g = errors.discount) === null || _g === void 0 ? void 0 : _g.message, typeNumber: true })),
        React.createElement(Grid_1["default"], { item: true, xs: 6 },
            React.createElement(TextFieldCustom_1["default"], { name: "quantity", control: control, label: "\u041A\u043E\u043B-\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432", errorMessage: (_h = errors.quantity) === null || _h === void 0 ? void 0 : _h.message, required: true, typeNumber: true }))));
}
exports.UpdateProductForm = UpdateProductForm;
