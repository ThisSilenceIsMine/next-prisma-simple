// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Contact as Person } from "@lib/types";
import prisma from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const validateData = (value) => {
        if (Object.values(value).some((x) => typeof x !== "boolean" && !x)) {
            throw { message: "Invalid data", code: 400 };
        }
    };
    const { id, firstName, lastName, phoneNumber, isFavorite } = JSON.parse(
        req.body
    ) as Person;

    switch (req.method) {
        case "POST":
            try {
                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                };

                validateData(data);

                const person = await prisma.person.create({
                    data,
                });
                return res.status(200).json({ person });
            } catch (error) {
                if (error.status) {
                    return res.status(error.status).json(error.message);
                }
                return res.status(500).json({ error });
            }

        case "PUT":
            try {
                const data: Omit<Person, "id"> = {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    isFavorite: isFavorite,
                };

                console.log(data);

                validateData(data);

                const person = await prisma.person.update({
                    data,
                    where: { id },
                });

                return res.status(200).json(person);
            } catch (error) {
                return res.status(500).json(error);
            }

        default:
            res.status(402).send({});
            break;
    }

    // res.status(200).json({ name: "John Doe" });
};
