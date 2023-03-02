import {Response} from "express";
import {Field, FieldStatus} from "@prisma/client";


export async function createField(req: Request, res: Response): Promise<Response> {
    const field: Field = req.body;

}