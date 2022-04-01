import { Book } from "./Book";

export class OperationResponse {
    statusCode!: number;
    message?: string;
    success!: boolean;
    data?: Book[];
}