"use strict";
exports.__esModule = true;
exports.createProductScheme = void 0;
var yup = require("yup");
var getMaxLengthErrorMessage_1 = require("@shared/lib/getMaxLengthErrorMessage");
var transformNumberOrNull_1 = require("@shared/lib/transformNumberOrNull");
var getMinNumberErrorMessage_1 = require("@shared/lib/getMinNumberErrorMessage");
exports.createProductScheme = yup.object().shape({
    name: yup.string()
        .max(255, getMaxLengthErrorMessage_1.getMaxLengthErrorMessage())
        .required('Введите название товара'),
    description: yup.string().nullable(),
    image: yup.string().required('Выберите изображение'),
    sku: yup.string()
        .max(255, getMaxLengthErrorMessage_1.getMaxLengthErrorMessage())
        .required('Введите артикул (код) товара'),
    category_id: yup.number().required('Выберите категорию'),
    subcategory_id: yup.array().of(yup.number().required()),
    base_price: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0)
        .required('Введите базовую цена для товара'),
    // unit: yup.string()
    //   .max(255, getMaxLengthErrorMessage())
    //   .nullable(),
    discount: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0, getMinNumberErrorMessage_1.getMinNumberErrorMessage(0))
        .nullable(),
    quantity: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0)
        .required('Введите доступное количество товара'),
    product_type_id: yup.number().nullable(),
    feature_ids: yup.array()
        .of(yup.number().required())
        .nullable()
});
