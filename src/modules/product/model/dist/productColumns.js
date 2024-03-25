"use strict";
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
exports.productColumns = void 0;
var x_data_grid_1 = require("@mui/x-data-grid");
var Edit_1 = require("@mui/icons-material/Edit");
var Delete_1 = require("@mui/icons-material/Delete");
var react_hot_toast_1 = require("react-hot-toast");
var link_1 = require("next/link");
var Avatar_1 = require("@mui/material/Avatar");
function productColumns(_a) {
    var _this = this;
    var trigger = _a.trigger, mutate = _a.mutate;
    return [
        { field: 'id', headerName: '#', width: 80 },
        {
            field: 'image',
            headerName: 'Изображение',
            width: 120,
            renderCell: function (_a) {
                var _b = _a.row, name = _b.name, image = _b.image;
                return (React.createElement(Avatar_1["default"], { src: image, alt: name }));
            }
        },
        { field: 'name', headerName: 'Название', minWidth: 120, flex: 2 },
        // {
        //   field: 'category',
        //   headerName: 'Категория',
        //   flex: 1,
        //   renderCell: ({ row: { category } }) => <>{category.name}</>
        // },
        // {
        //   field: 'subcategory',
        //   headerName: 'Подкатегория',
        //   flex: 1,
        //   renderCell: ({ row: { subcategory } }) => <>{subcategory?.name}</>
        // },
        // {
        //   field: 'provider',
        //   headerName: 'Поставщик',
        //   flex: 1,
        //   renderCell: ({row: {provider}}) => <>{provider.name}</>
        // },
        // {
        //   field: 'collection',
        //   headerName: 'Коллекция',
        //   flex: 1,
        //   renderCell: ({ row: { collection } }) => <>{collection?.name}</>
        // },
        { field: 'sku', headerName: 'Код товара', flex: 1 },
        {
            field: 'base_price',
            headerName: 'Базовая цена',
            flex: 1,
            renderCell: function (_a) {
                var base_price = _a.row.base_price;
                return React.createElement(React.Fragment, null,
                    base_price,
                    " \u0441\u043C\u043D.");
            }
        },
        { field: 'quantity', headerName: 'Кол-во', flex: 1 },
        // {
        //   field: 'is_active',
        //   headerName: 'Кол-во',
        //   flex: 1,
        //   minWidth: 100,
        //   renderCell: ({ row }) => <>{row.is_active ? 'Активный' : 'Неактивный'}</>
        // },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: function (_a) {
                var row = _a.row;
                return [
                    React.createElement(link_1["default"], { href: "/main/products/" + row.slug },
                        React.createElement(x_data_grid_1.GridActionsCellItem, { title: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C", label: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C", icon: React.createElement(Edit_1["default"], { sx: { fontSize: 24 } }) })),
                    React.createElement(x_data_grid_1.GridActionsCellItem, { label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", icon: React.createElement(Delete_1["default"], { sx: { fontSize: 24 } }), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            var response, e_1, error;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, trigger(row.id)];
                                    case 1:
                                        response = _b.sent();
                                        react_hot_toast_1["default"].success(response.message);
                                        return [4 /*yield*/, mutate()];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _b.sent();
                                        error = e_1;
                                        react_hot_toast_1["default"].error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) || 'Произошла ошибка');
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); } })
                ];
            }
        }
    ];
}
exports.productColumns = productColumns;
