import prisma from "../db/db.js";

export async function createUser(req, res) {
    try {

        const { name } = req.body;

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                error: "Name must be a non-empty string."
            });
        }

        const user = await prisma.user.create({
            data: {
                name
            }
        })

        return res.status(201).json({
            message: "Created user successfully.",
            user
        });

    } catch(err) {
        console.error("User Creation Error: ", err);

        return res.status(500).json({
            error: "Failed to create user."
        });
    }
}