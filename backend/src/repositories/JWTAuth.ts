import { sign, verify } from "jsonwebtoken";
import moment from "moment";

interface IPayload {
    email: string;
    exp: Date;
}

interface IToken {
    token: string;
    exp: Date;
}

export interface IFullToken {
    token: string;
    refreshToken: string;
    exp: Date;
}

export class JWTAuth {

    public static getAllToken(email: string): IFullToken {
        return {
            exp: moment().add(7, "days").toDate(),
            refreshToken: this.encode({ email }, "30d"),
            token: this.encode({ email }),
        };
    }

    public static decodeToken(token: string): string {
        try {
            const result = verify(token, process.env.JWT_SECRET) as IPayload;
            if (!result.email) {
                throw new Error("Cannot decode email from bearer token");
            }
            return result.email;
        } catch (error) {
            throw error;
        }
    }

    public static getToken(email: string): IToken {
        return {
            exp: moment().add(7, "days").toDate(),
            token: this.encode({ email }),
        };
    }

    private static encode(payload: string | object, expiresIn = "7d"): string {
        return sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

}
