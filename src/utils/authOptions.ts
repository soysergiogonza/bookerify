import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const userFounded = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                })

                if (!userFounded)  throw new Error("User not found");

                console.log({userFounded})

                // @ts-ignore
                const matchPassword = bcrypt.compare(credentials.password, userFounded.password)
                console.log({matchPassword})

                if (!matchPassword) throw new Error("Wrong Password");

                return {
                    id: userFounded.id,
                    email: userFounded.email,
                    name: userFounded.name,
                }

            }
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
}
