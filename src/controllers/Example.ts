import { HttpResponse } from "../interfaces/HttpResponse";
import Controller from "./Controller";
import PostgresDataSource from "../db/connection";
import { Contact } from "../db/Contact";

export default class ExampleController implements Controller {
  constructor(private database: typeof PostgresDataSource) {}

  async index(): Promise<HttpResponse> {
    const allContact = await this.database
      .getRepository(Contact)
      .createQueryBuilder("contact")
      .getMany();

    return { code: 200, message: null, response: allContact };
  }

  async get(id: string): Promise<HttpResponse> {
    const find = await this.database
      .getRepository(Contact)
      .createQueryBuilder("contact")
      .where("contact.id = :id", { id: id })
      .getOne();
    return { code: 200, message: null, response: find };
  }

  async create(payload: any): Promise<HttpResponse> {
    const { name, email, phoneNumber } = payload;
    const contact = new Contact();
    contact.name = name;
    contact.email = email;
    contact.phoneNumber = phoneNumber;

    await this.database.manager.save(contact);

    return { code: 200, message: null, response: null };
  }

  async update(payload: any, id: string): Promise<HttpResponse> {
    const { name, email, phoneNumber } = payload;

    const paramId = parseInt(id);

    const contactRepository = this.database.getRepository(Contact);

    const contactToUpdate = await contactRepository.findOneBy({
      id: paramId,
    });

    if (contactToUpdate) {
      contactToUpdate.name = name;
      contactToUpdate.email = email;
      contactToUpdate.phoneNumber = phoneNumber;
      await contactRepository.save(contactToUpdate);
    }
    return { code: 200, message: null, response: contactToUpdate };
  }

  async delete(id: string): Promise<HttpResponse> {
    await PostgresDataSource.createQueryBuilder()
      .delete()
      .from(Contact)
      .where("id = :id", { id: id })
      .execute();

    return { code: 200, message: "record deleted", response: null };
  }
}
