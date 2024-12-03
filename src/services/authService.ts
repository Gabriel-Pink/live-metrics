import jwt from "jsonwebtoken";
import { config } from "../config/config";



export const authenticateAdmin = (token: string) => {
    try {
        // Valide se o JWT_SECRET está definido
        const secret = config.JWT_SECRET;
    
        if (!secret) {
          throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
        }
    
        // Use o valor da variável segura como Secret
        return jwt.verify(token, secret) as jwt.JwtPayload;
      } catch (error) {
        throw new Error("Authentication failed");
      }
};