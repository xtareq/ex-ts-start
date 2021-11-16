import sharp from "sharp";
import crypto from "crypto";
import path from "path";
import fs from "fs";


const defaultOption ={
    height:200,
    width:200
}
export const uploadFile = async (file:any,savePath:any,options=defaultOption)=>{
    const transportar= sharp(file.data)
    .resize(options.width,options.height, {
        kernel: sharp.kernel.nearest,
        fit: 'contain',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toFormat('jpeg')
    const savePath1=path.join(__dirname, '../../../public/uploads/'+savePath)
    const fileName = crypto.randomBytes(16).toString('hex') + '.jpg';
    if(!fs.existsSync(savePath1)){
        fs.mkdirSync(savePath1);
    }
    await transportar.toFile(path.join(savePath1,fileName));
    return "/uploads/"+savePath+"/"+fileName;
}