"use strict";
exports.__esModule = true;
exports.updateProductScheme = void 0;
var yup = require("yup");
var getMaxLengthErrorMessage_1 = require("@shared/lib/getMaxLengthErrorMessage");
var transformNumberOrNull_1 = require("@shared/lib/transformNumberOrNull");
var getMinNumberErrorMessage_1 = require("@shared/lib/getMinNumberErrorMessage");
var getMaxNumberErrorMessage_1 = require("@shared/lib/getMaxNumberErrorMessage");
exports.updateProductScheme = yup.object().shape({
    name: yup.string()
        .max(255, getMaxLengthErrorMessage_1.getMaxLengthErrorMessage())
        .required('Введите название товара'),
    description: yup.string().nullable(),
    image: yup.string().nullable(),
    sku: yup.string().max(255, getMaxLengthErrorMessage_1.getMaxLengthErrorMessage()).nullable('Введите код товара'),
    // provider_id: yup.number().required('Выберите поставщика'),
    category_id: yup.array()
        .of(yup.number().required())
        .min(1, 'Выберите категорию')
        .required('Выберите категорию'),
    subcategory_id: yup.array().of(yup.number().required()),
    // collection_id: yup.array().of(yup.number().required()),
    base_price: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0)
        .required('Введите базовую цену товара'),
    // unit: yup.string()
    //   .max(255, getMaxLengthErrorMessage())
    //   .nullable(),
    discount: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0, getMinNumberErrorMessage_1.getMinNumberErrorMessage(0))
        .max(100, getMaxNumberErrorMessage_1.getMaxNumberErrorMessage(100))
        .nullable(),
    quantity: yup.number()
        .transform(transformNumberOrNull_1.transformNumberOrNull)
        .min(0)
        .required('Введите доступное кол-во товара')
});
