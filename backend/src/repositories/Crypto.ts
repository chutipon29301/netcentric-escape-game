import { AES, enc } from "crypto-js";

export class Crypto {
    public static encrypt(value: string): string {
        return AES.encrypt(value, process.env.AES_SECRET).toString();
    }

    public static decrypt(value: string): string {
        return AES.decrypt(value, process.env.AES_SECRET).toString(enc.Utf8);
    }

    public static equals(encryptValue: string, decryptValue: string): boolean {
        return this.decrypt(encryptValue) === decryptValue;
    }
}
