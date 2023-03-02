import { PrismaClient, Prisma} from "@prisma/client";
const prisma = new PrismaClient()

async function insertField(field: Prisma.FieldCreateInput) {
    const insertFieldPayload: Prisma.FieldCreateArgs = {data: field};
    await prisma.field.create(insertFieldPayload);
}