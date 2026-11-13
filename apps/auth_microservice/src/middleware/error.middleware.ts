import { type ErrorRequestHandler } from "express";
import { AppError } from "../error/app-error.js";

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof AppError){
        response.status(error.status).json({
            message: error.message
        });

        return;
    }

    if(error.type === 'entity.parse.failed'){
        response.status(400).json({
            message: "Malformed JSON body"
        });

        return;
    }

    console.error(error);
    
    response.status(500).json({
        message: "Internal server error."
    })
    
}