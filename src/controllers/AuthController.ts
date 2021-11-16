import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cap, checkHash, isEmpty, makeHash, randNumber, Validate } from "ex-helpers";
import { Mailer, SMTPOption } from "../lib/mailer";
import { PasswordReset } from "../models/PasswordReset";
import { User } from "../models/User";
import { EmailVerifyTemplate } from "../templates/EmailVerify";
import { ResetPasswordLink } from "../templates/ResetPasswordLink";
const JWT_KEY =
  process.env.JWT_KEY || "sdfsdf8903)8s9df0#&)08_DSf8S_)8DF*SDF^*&S";

export class AuthController {
  @Validate(["email:type=email", "password:min=6"])
  async login({ body }: Request, res: Response): Promise<any> {
    try {
      const { email, password } = body;

export class AuthController {

      //if not registered
      if (!isUser) return res.status(404).json({ message: "User not Found!" });

    @Validate(['email:type=email', 'password!:min=6'])
    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body

            // find user by email
            const isUser = await User.findOne({ where: { email } })

            // if not registered
            if (!isUser) return res.status(404).json({ message: "User not Found!" })

            // is verified
            if (!isUser.verified) return res.status(401).json({ message: "User not verified" })

            // check password
            if (!checkHash(password, isUser.password)) return res.status(401).json({ message: "Incorrect Password" })

            // generate token 
            const token = jwt.sign({ userId: isUser.id }, JWT_KEY, { expiresIn: 3600 })
            isUser.password = ""
            return res.json({
                token,
                user: isUser
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Something going wrong!Please contact your provider'
            })
        }

      //generate token
      const token = jwt.sign({ userId: isUser.id }, JWT_KEY, {
        expiresIn: 3600,
      });
      isUser.password = "";
      return res.json({
        token: token,
        user: isUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something going wrong!Please contact your provider",
      });
    }
  }

    @Validate([
        'name',
        'email:type=email',
        'phone:pattern=^(?:\\+?88|0088)?01[15-9]\\d{8}$',
        'password',
        'confirm_password:match=password'
    ])
    async register({ body }: Request, res: Response) {
        const foundUser = await User.findOne({ where: { email: body.email } })

        if (foundUser) return res.status(400).json({ message: "Email already exits!" })

        body = {
            ...body,
            password: makeHash(body.password),
            verify_code: randNumber(111111, 999999)
        }
        try {
            const isUser = await User.create(body)
            const mailer = new Mailer("smtp")
            const template = EmailVerifyTemplate(isUser.name, isUser.verify_code)
            const option: SMTPOption = {
                test: true,
                sender: "Saxon Prime <register@saxonprime.com>",
                receiver: isUser.name + " <" + isUser.email + ">",
                subject: "Email Verification Code",
                html: template
            }
            await mailer.send(option)
            return res.json({
                data: isUser,
                message: "Registered Successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Something going wrong!"
            })
        }

    }
  }

    @Validate(['email:type=email', 'verify_code'])
    async verify({ body }: Request, res: Response): Promise<any> {
        const isUser = await User.findOne({ where: { email: body.email } })

        // if not registered
        if (!isUser) return res.status(404).json({ message: "User not Found!" })

        // is verified
        if (isUser.verified) return res.status(400).json({ message: "Already verified" })

        // check code 
        if (isUser.verify_code !== body.verify_code) return res.status(400).json({ message: "Invalid code!" })

        try {

            const isVerified = await User.update({
                verify_code: null,
                verified: true
            }, {
                where: {
                    email: body.email
                }
            })

            return res.json({
                message: 'Verified Successfully!',
                email: body.email
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Something going wrong!',
                email: body.email
            })
        }
      );

      return res.json({
        message: "Verified Successfully!",
        email: body.email,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something going wrong!",
        email: body.email,
      });
    }
  }

    @Validate(['email:type=email'])
    async reVerifyRequest({ body }: Request, res: Response): Promise<any> {
        let isUser = await User.findOne({ where: { email: body.email } })

        // if not registered
        if (!isUser) return res.status(404).json({ message: "User not Found!" })

        // is verified
        if (isUser.verified) return res.status(400).json({ message: "Already verified" })

        try {
            const isVerified = await User.update({
                verify_code: randNumber(111111, 999999)
            }, {
                where: {
                    email: body.email
                }
            })
            isUser = await isUser.reload()
            const mailer = new Mailer("smtp")
            const template = EmailVerifyTemplate(isUser.name, isUser.verify_code)
            const option: SMTPOption = {
                test: true,
                sender: "Saxon Prime <register@saxonprime.com>",
                receiver: isUser.name + " <" + isUser.email + ">",
                subject: "Email Verification Code",
                html: template
            }
            await mailer.send(option)

            return res.json({
                message: 'Resend verify code!',
                email: body.email
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Something going wrong!',
                email: body.email
            })
        }
    }

    @Validate(['email'])
    async forgetPasswordRequest({ body }: Request, res: Response): Promise<any> {
        try {
            const urlToken = makeHash(body.email)
            // agent 
            const clientUrl = process.env.CLIENT_URL || null
            if (!clientUrl || clientUrl === "") {
                res.status(400)
                return res.json({
                    message: "Client url no defined!"
                })
            }
            const saveToken = await PasswordReset.create({
                email: body.email,
                token: urlToken
            })
            const isUser = await User.findOne({ where: { email: body.email } })
            if (!isUser) return res.status(404).json({ message: "User not Found!" })
            const forgetPasswordLink = `${clientUrl}/forget-password?email=${body.email}&t=${saveToken.token}`
            const mailer = new Mailer("sendgrid")
            const template = ResetPasswordLink(isUser.name, forgetPasswordLink)
            const option: SMTPOption = {
                test: true,
                sender: "Saxon Prime <register@saxonprime.com>",
                receiver: isUser.name + " <" + isUser.email + ">",
                subject: "Password Reset Link",
                html: template
            }
            await mailer.send(option)

            return res.json({
                message: "Check your email for password reset link.",
                redirectUrl: forgetPasswordLink
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something going wrong!',
                email: body.email
            })
        }
    }
  }

<<<<<<< HEAD
  @Validate(["email"])
  async forgetPasswordRequest({ body }: Request, res: Response): Promise<any> {
    try {
      let urlToken = makeHash(body.email);
      //agent
      let clientUrl = process.env.CLIENT_URL || null;
      if (!clientUrl || clientUrl == "") {
        res.status(400);
        return res.json({
          message: "Client url no defined!",
        });
      }
      let saveToken = await PasswordReset.create({
        email: body.email,
        token: urlToken,
      });
      let isUser = await User.findOne({ where: { email: body.email } });
      if (!isUser) return res.status(404).json({ message: "User not Found!" });
      let forgetPasswordLink = `${clientUrl}/forget-password?email=${body.email}&t=${saveToken.token}`;
      const mailer = new Mailer("sendgrid");
      let template = ResetPasswordLink(isUser.name, forgetPasswordLink);
      let option: SMTPOption = {
        test: true,
        sender: "Saxon Prime <register@saxonprime.com>",
        receiver: isUser.name + " <" + isUser.email + ">",
        subject: "Password Reset Link",
        html: template,
      };
      await mailer.send(option);

      return res.json({
        message: "Check your email for password reset link.",
        redirectUrl: forgetPasswordLink,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something going wrong!",
        email: body.email,
      });
=======
    @Validate(['email', 'token'])
    async checkResetPasswordToken(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body
            const isValid = await PasswordReset.findOne({
                where: {
                    email: body.email,
                    token: body.token,
                    expired: false
                }
            })
            // if not registered
            if (!isValid) return res.status(401).json({ message: "Invalid Token" })
            return res.json({
                email: body.email,
                token: body.token
            })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something going wrong!',
            })
        }
>>>>>>> 2ba9a55c8e69c48e0974272275d3e474af3ede47
    }
  }

<<<<<<< HEAD
  @Validate(["email", "token"])
  async checkResetPasswordToken(req: Request, res: Response): Promise<any> {
    try {
      let body = req.body;
      let isValid = await PasswordReset.findOne({
        where: {
          email: body.email,
          token: body.token,
          expired: false,
        },
      });
      //if not registered
      if (!isValid) return res.status(401).json({ message: "Invalid Token" });
      return res.json({
        email: body.email,
        token: body.token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something going wrong!",
      });
    }
  }

  @Validate([
    "email",
    "token",
    "new_password:min=6",
    "confirm_password:match=new_password",
  ])
  async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      let body = req.body;
      let isUser = await User.findOne({ where: { email: body.email } });
      //if not registered
      if (!isUser) return res.status(404).json({ message: "User not Found!" });
      let isValid = await PasswordReset.findOne({
        where: {
          email: body.email,
          token: body.token,
          expired: false,
        },
      });
      //if not registered
      if (!isValid) return res.status(401).json({ message: "Invalid Token" });

      let isUpdate = await User.update(
        {
          password: makeHash(body.new_password),
        },
        { where: { email: body.email } }
      );
      let expireToken = await PasswordReset.update(
        {
          expired: true,
        },
        { where: { email: body.email } }
      );
=======
    @Validate(['email', 'token', 'new_password:min=6', 'confirm_password:match=new_password'])
    async resetPassword(req: Request, res: Response): Promise<any> {
        try {
            const body = req.body
            const isUser = await User.findOne({ where: { email: body.email } })
            // if not registered
            if (!isUser) return res.status(404).json({ message: "User not Found!" })
            const isValid = await PasswordReset.findOne({
                where: {
                    email: body.email,
                    token: body.token,
                    expired: false
                }
            })
            // if not registered
            if (!isValid) return res.status(401).json({ message: "Invalid Token" })

            const isUpdate = await User.update({
                password: makeHash(body.new_password)
            }, { where: { email: body.email } })
            const expireToken = await PasswordReset.update({
                expired: true,
            }, { where: { email: body.email } })

            return res.json({
                message: "Password reset successfully!"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something going wrong!',
            })
        }
    }
>>>>>>> 2ba9a55c8e69c48e0974272275d3e474af3ede47

      return res.json({
        message: "Password reset successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something going wrong!",
      });
    }
  }
}
