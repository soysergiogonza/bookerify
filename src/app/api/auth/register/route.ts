import {NextResponse} from "next/server";
import {prisma} from "@/libs/db";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
   try {
       const data = await request.json();

       const emailFounded = await prisma.user.findUnique({
           where: {
               email: data.email
           }
       })

       if(emailFounded) {
           return NextResponse.json({message: 'Email already exists'}, {status:
                   400})
       }

       console.log(data)
       const hashedPassword = await bcrypt.hash(data.password, 10);

       const newUser = await prisma.user.create({
           data: {
               name: data.name,
               email: data.email,
               password: hashedPassword
           }
       })

       const {password: _, ...user} = newUser;

       return NextResponse.json({user}, {status: 200});
   }
    catch (error) {
         return NextResponse.json({message: error.message}, {status: 500});
    }
}
