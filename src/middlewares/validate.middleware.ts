import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import type { ZodTypeAny } from "zod";

declare global {
  namespace Express {
    interface Request {
      validated: {
        body: any;
        query: any;
        params: any;
      };
    }
  }
}

export const validate = (Schema: ZodTypeAny) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    //it take time to validate thats why promise
    try {
      const parsed = (await Schema.parseAsync({
        //validate the schema that we have given
        body: req.body,
        query: req.query,
        params: req.params,
      })) as any;

      req.validated = {
        body: parsed.body,
        query: parsed.query,
        params: parsed.params,
      };
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => ({
          field: err.path.join(".").replace("body.", ""),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errorMessages,
        });
        return;
      }

      console.error("Unexpected error during validation:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
};
