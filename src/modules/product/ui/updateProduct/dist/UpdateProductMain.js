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
exports.UpdateProductMain = void 0;
var react_1 = require("react");
var mutation_1 = require("swr/mutation");
var updateFetcher_1 = require("@shared/api/fetcher/updateFetcher");
var react_hook_form_1 = require("react-hook-form");
var UpdateProductFormData_1 = require("@modules/product/model/updateProduct/UpdateProductFormData");
var ImageContainer_1 = require("@shared/ui/ImageContainer");
var lab_1 = require("@mui/lab");
var react_hot_toast_1 = require("react-hot-toast");
var UpdateProductForm_1 = require("@modules/product/ui/updateProduct/UpdateProductForm");
var yup_1 = require("@hookform/resolvers/yup");
var setProductDefaultValues_1 = require("@modules/product/lib/setProductDefaultValues");
function UpdateProductMain(_a) {
    var _this = this;
    var _b;
    var product = _a.product, mutate = _a.mutate;
    var _c = react_1.useState(null), image = _c[0], setImage = _c[1];
    var _d = mutation_1["default"](['/products', product.id], updateFetcher_1.updateFetcher), trigger = _d.trigger, isMutating = _d.isMutating, reset = _d.reset;
    var _e = react_hook_form_1.useForm({
        mode: 'onBlur',
        defaultValues: setProductDefaultValues_1.setProductDefaultValues(product),
        resolver: yup_1.yupResolver(UpdateProductFormData_1.updateProductScheme)
    }), control = _e.control, errors = _e.formState.errors, handleSubmit = _e.handleSubmit, setValue = _e.setValue, getValues = _e.getValues, watch = _e.watch;
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var formData, message, e_1, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    formData = __assign(__assign({}, data), { image: image });
                    if (data.category_id && data.category_id[0]) {
                        formData.category_id = formData.category_id[0];
                    }
                    if (data.subcategory_id && data.subcategory_id[0]) {
                        formData.subcategory_id = formData.subcategory_id[0];
                    }
                    return [4 /*yield*/, trigger(formData)];
                case 1:
                    message = (_b.sent()).message;
                    react_hot_toast_1["default"].success(message);
                    return [4 /*yield*/, mutate()];
                case 2:
                    _b.sent();
                    reset();
                    setImage(null);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    response = e_1.response;
                    react_hot_toast_1["default"].error(((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message) || 'Произошла ошибка');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { noValidate: true, autoComplete: "off", onSubmit: handleSubmit(onSubmit) },
        React.createElement(ImageContainer_1["default"], { urlImage: product.image, image: image, setImage: setImage, control: control, errorMessage: (_b = errors.image) === null || _b === void 0 ? void 0 : _b.message }),
        React.createElement(UpdateProductForm_1.UpdateProductForm, { errors: errors, control: control, description: product.description, setValue: setValue, getValues: getValues, watch: watch }),
        React.createElement(lab_1.LoadingButton, { loading: isMutating, disabled: isMutating, fullWidth: true, type: "submit", size: "large", variant: "contained", sx: { mt: 5 } }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")));
}
exports.UpdateProductMain = UpdateProductMain;
