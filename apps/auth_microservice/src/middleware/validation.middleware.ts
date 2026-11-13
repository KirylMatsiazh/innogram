import { type RequestHandler } from 'express';
import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateBody = (dtoClass: ClassConstructor<object>): RequestHandler =>
    async (req, res, next) => {
        try {
        const reqDTO = plainToInstance(dtoClass, req.body ?? {});

        const errors = await validate(
            reqDTO,
            {
                validationError: { target: false, value: false },
                whitelist: true,
                forbidNonWhitelisted: true
            }
        );

        if (errors.length > 0) {
            const errorsResult = errors.map((error) => ({
                field: error.property,
                messages: Object.values(error.constraints ?? {}),
            }))
            res.status(400).json({
                message: "Validation failed",
                errors: errorsResult
            });
            return;
        }

        req.body = reqDTO;
        next();

    } catch {
        res.status(400).json({ message: "Bad request" });
    }
    };