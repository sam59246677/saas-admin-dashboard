import type {User,CreateUserInput,  UpdateUserInput,} from "../types/user";
let users: User[] = [

  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    status: "Active",
  },

  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Active",
  },

  {
    id: 3,
    name: "David Brown",
    email: "david@example.com",
    status: "Inactive",
  },

];


export async function getUsers(): Promise<User[]> {
  await new Promise((resolve) =>setTimeout(resolve, 1000));
  return users;
}


export async function createUser(
  user: CreateUserInput
): Promise<User> {

  await new Promise((resolve) =>setTimeout(resolve, 1000));
  const newUser: User = {
    id: Date.now(),

    name: user.name,

    email: user.email,

    status: "Active",

  };
  users.push(newUser);
  return newUser;
}

export async function deleteUser(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  users = users.filter(
    (user) => user.id !== id
  );
}

export async function updateUser(
  user: UpdateUserInput
): Promise<User> {

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  const index = users.findIndex(
    (item) => item.id === user.id
  );

  if (index === -1) {
    throw new Error("User not found");
  }

  const updatedUser: User = {
    ...users[index],
    name: user.name,
    email: user.email,
  };

  users[index] = updatedUser;

  return updatedUser;
}