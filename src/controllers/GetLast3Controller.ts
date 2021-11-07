import { Request, Response } from "express";
import { GetLast3Service } from "../services/GetLast3Service";

class GetLast3Controller {
  async handle(request: Request, response: Response) {
    const service = new GetLast3Service();
    const result = await service.execute();
    return response.status(200).json(result);
  }
}

export { GetLast3Controller };
