import { Request, Response } from "express";
import { IRequest } from "../types";
import { checkHash, makeHash, Validate } from "ex-helpers";
import { User } from "../models/User";


export class AccountController {

    // tslint:disable-next-line: no-empty
    async uploadAvatar(req: Request, res: Response) {}

    @Validate(['old_password', 'new_password', 'confirm_password:match=new_password'])
    async changePassword(req: IRequest, res: Response) {

        try {
            const body = req.body
            const isUser = await User.findByPk(req.userId)
            if (!isUser) return res.status(401).json({ message: "User not found!" })
            const checkPassword = checkHash(body.old_password, isUser.password)
            if (!checkPassword) return res.status(400).json({ message: "Incorrect old Password." })
            isUser.password = makeHash(body.new_password)
            await isUser.save();
            isUser.password = ""
            return res.json({
                message: "Password Changed.",
                user: isUser
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something going wrong!"
            })
        }
    }

    async getProfile(req: IRequest, res: Response) {
        try {
            const isUser = await User.findByPk(req.userId, {
                attributes: { exclude: ['password'] }
            })
            return res.json({
                message: "Get Profile",
                user: isUser
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something going wrong!"
            })
        }


    }
}
