import { Response } from "express";
import { IRequest } from "../types";
import { uploadFile } from "../lib/upload";


export class UploadController {

    async uploadFile(req: IRequest, res: Response) {
        if (!req.files.file) return res.status(400).send({ message: "No file uploaded" });
        console.log(req.files.file)
        const uploadPath = await uploadFile(req.files.file, "products/small", { height: 40, width: 40 });
        const uploadPath1 = await uploadFile(req.files.file, "products/normal", { height: 200, width: 200 });
        const uploadPath2 = await uploadFile(req.files.file, "products/large", { height: 400, width: 400 });
        const uploadPath3 = await uploadFile(req.files.file, "products/extra_large", { height: 800, width: 800 });

        res.json({
            small: uploadPath,
            normal: uploadPath1,
            large: uploadPath2,
            extra_large: uploadPath3
        });

    }
}
