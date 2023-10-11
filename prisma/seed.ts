import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const usersTab = [];

  for (let i = 0; i < 10; i++) {
    const user = {
      username: faker.internet.userName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      link: faker.internet.url(),
    } satisfies Prisma.UserCreateInput;
    const dbUser = await prisma.user.create({ data: user });
    usersTab.push(dbUser);
  }

  const posts = [];
  for (let i = 0; i < 50; i++) {
    const randomIndex = faker.number.int({
      min: 0,
      max: usersTab.length - 1,
    });

    const wordCountrandom = faker.number.int({
      min: 5,
      max: 15,
    });

    const post = {
      content: faker.lorem.sentence(wordCountrandom),
      usetId: usersTab[randomIndex].id,
    } satisfies Prisma.PostUncheckedCreateInput;

    const dbpost = await prisma.post.create({ data: post });
    posts.push(dbpost);
  }
  for (let i = 0; i < 50; i++) {
    const randomUserIndex = faker.number.int({
      min: 0,
      max: usersTab.length - 1,
    });

    const randomPostIndex = faker.number.int({
      min: 0,
      max: posts.length - 1,
    });
    const like = {
      postId: posts[randomPostIndex].id,
      userId: usersTab[randomUserIndex].id,
    } satisfies Prisma.LikeUncheckedCreateInput;
    await prisma.like.create({ data: like });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    process.exit();
  });
