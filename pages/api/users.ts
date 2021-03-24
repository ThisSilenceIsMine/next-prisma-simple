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

    switch (req.method) {
        case "GET": {
            try {
                const persons = await prisma.person.findMany({});
                return res.status(200).json(persons);
            } catch (error) {
                return res.status(500).json({ error });
            }
        }
        case "POST":
            try {
                const { firstName, lastName, phoneNumber } = JSON.parse(
                    req.body
                ) as Person;

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
                const {
                    id,
                    firstName,
                    lastName,
                    phoneNumber,
                    isFavorite,
                } = JSON.parse(req.body) as Person;

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
        case "DELETE":
            try {
                const { id } = JSON.parse(req.body) as Person;
                if (!id) {
                    throw new Error("No id specified");
                }
                const person = await prisma.person.delete({
                    where: { id },
                });
                res.status(200).json(person);
            } catch (error) {
                res.status(500).json(error);
            }
            break;
        default:
            res.status(402).send({});
            break;
    }
};
