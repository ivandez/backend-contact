import { HttpResponse } from "../interfaces/HttpResponse";

export default interface Controller {
  index(): Promise<HttpResponse>;
  get(id: string): Promise<HttpResponse>;
  create(payload: any): Promise<HttpResponse>;
  update(payload: any, id: any): Promise<HttpResponse>;
  delete(id: string): Promise<HttpResponse>;
}
