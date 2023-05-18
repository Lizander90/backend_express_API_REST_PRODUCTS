import Joi from "joi";

const id = Joi.string().id()
const name = Joi.string().alphanum().max(10).min(2)
const aviable = Joi.boolean()
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()

export const validateAddProductScheme = Joi.object().keys({
    id: id.required(),
    name: name.required(),
    aviable: aviable.required(),
    price: price.required(),
    image: image.required()
});

export const validateUpdateProductScheme = Joi.object().keys({
    id: id,
    name: name,
    aviable: aviable,
    price: price,
    image: image
});

export const validateIdProductScheme = Joi.object().keys({
    id: id.required(),
});
