import { v4 as uuidv4 } from "uuid";

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente iure nihil dolor ut dignissimos est. Cupiditate unde tempora nam, magnam non dignissimos, mollitia asperiores praesentium eligendi, atque tenetur veniam accusantium.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente iure nihil dolor ut dignissimos est. Cupiditate unde tempora nam, magnam non dignissimos, mollitia asperiores praesentium eligendi, atque tenetur veniam accusantium.",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente iure nihil dolor ut dignissimos est. Cupiditate unde tempora nam, magnam non dignissimos, mollitia asperiores praesentium eligendi, atque tenetur veniam accusantium.",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
