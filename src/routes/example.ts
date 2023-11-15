import { Router, Request, Response } from "express";
import PostgresDataSource from "../db/connection";
import { Contact } from "../db/Contact";

const router = Router();

// Add CRUD API implementation here

router.get("/agenda", async (req: Request, res: Response) => {
  const allContact = await PostgresDataSource.getRepository(Contact)
    .createQueryBuilder("contact")
    .getMany();

  res.send(allContact);
});

router.get("/agenda/:id", async (req: Request, res: Response) => {
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

router.post("/agenda", async (req: Request, res: Response) => {
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

router.delete("/agenda/:id", async (req: Request, res: Response) => {
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

router.put("/agenda/:id", async (req: Request, res: Response) => {
  const { name, email, phoneNumber } = req.body;

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
export default router;
