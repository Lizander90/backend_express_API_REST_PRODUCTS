import boom from '@hapi/boom'

export function handleValidation(schemaMethod, prop) {

    return (req, resp, next) => {
        const dataToValidate = req[prop];
        const { error } = schemaMethod.validate(dataToValidate, { abortEarly: false });
        console.log('Validacion de datos');
        console.log(error);
        if (error) {
            next(boom.badRequest(error));
        } else {
            next();
        }
    }
}
