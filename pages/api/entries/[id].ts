import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../model";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import { useRouter } from "next/router";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El Id no es valido" + id });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Metodo no Existe" });
  }
}
//GetEntry
const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log(id)
  await db.connect();
  const entryInDB = await Entry.findById(id);
  if (!entryInDB) {
    return res.status(400).json({ message: "No hay entrada con ese ID:" + id });
  }
  return res.status(200).json(entryInDB);
};

//UpDateEntry
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).send({ message: "No hay entrada con esa ID" + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
//DeleteEntry
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToDelete = await Entry.findById(id);
  if (!entryToDelete) {
    await db.disconnect();
    return res.status(400).send({ message: "No hay entrada con esa ID" + id });
  }
  try {
    const entryToDelete = await Entry.findByIdAndDelete(id);
    res.status(200).json(entryToDelete!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
