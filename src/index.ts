import express, { Request, Response } from "express";
import "reflect-metadata";
import { Contact } from "./db/Contact";
import bodyParser from "body-parser";
import cors from "cors";
import PostgresDataSource from "./db/connection";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

//routes

app.get("/v1/agenda", async (req, res) => {
  const allContact = await PostgresDataSource.getRepository(Contact)
    .createQueryBuilder("contact")
    .getMany();

  res.send(allContact);
});

app.get("/v1/agenda/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const find = await PostgresDataSource.getRepository(Contact)
      .createQueryBuilder("contact")
      .where("contact.id = :id", { id: id })
      .getOne();

    res.send(find);
  } catch (error) {
    res.send(error);
  }
});

app.post("/v1/agenda", async (req: Request, res: Response) => {
  const { name, email, phoneNumber } = req.body;
  const contact = new Contact();
  contact.name = name;
  contact.email = email;
  contact.phoneNumber = phoneNumber;

  try {
    await PostgresDataSource.manager.save(contact);
    res.send("created");
  } catch (error) {
    res.send(error);
  }
});

app.delete("/v1/agenda/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await PostgresDataSource.createQueryBuilder()
      .delete()
      .from(Contact)
      .where("id = :id", { id: id })
      .execute();

    res.send("deleted");
  } catch (error) {
    res.send(error);
  }
});

app.put("/v1/agenda/:id", async (req: Request, res: Response) => {
  const { name, email, phoneNumber } = req.body;
  console.log(req.body);

  const { id } = req.params;

  const paramId = parseInt(id);

  try {
    const contactRepository = PostgresDataSource.getRepository(Contact);

    const contactToUpdate = await contactRepository.findOneBy({
      id: paramId,
    });

    if (contactToUpdate) {
      contactToUpdate.name = name;
      contactToUpdate.email = email;
      contactToUpdate.phoneNumber = phoneNumber;
      await contactRepository.save(contactToUpdate);
    }
    res.send("updated");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
