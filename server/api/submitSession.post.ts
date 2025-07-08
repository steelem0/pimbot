export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = usePrisma();
  const session = await prisma.session.create({ data: body });
  return { success: true, id: session.id };
});