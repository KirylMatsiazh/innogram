export class AppError extends Error{
    constructor (status: number, message: string){
        super(message);
        this.status = status;
    }
    readonly status: number;
}