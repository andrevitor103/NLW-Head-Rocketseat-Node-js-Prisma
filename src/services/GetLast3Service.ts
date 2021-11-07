import prismaCliente from "../prisma";

class GetLast3Service {
  async execute() {
    const messages = await prismaCliente.message.findMany({
      take: 3,
      include: {
        user: true,
      },
      orderBy: {
        create_at: "desc",
      },
    });
    return messages;
  }
}

export { GetLast3Service };
