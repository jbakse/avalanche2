export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  headshot: string;
  description: string;
  isAdmin: boolean;
};

export function cleanUsers(users: Record<string, any>[]): User[] {
  return users.map(cleanUser);
}

export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getHeadshotURL(user: User): string {
  const blackPixel =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";
  return user.headshot
    ? `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_64/v1/${user.headshot}`
    : blackPixel;
}

function cleanUser(user: Record<string, any>): User {
  return {
    _id: user._id ?? "",
    firstName: user.profile.first_name ?? "",
    lastName: user.profile.last_name ?? "",
    headshot: user.profile.headshot ?? "",
    description: user.profile.description ?? "",
    isAdmin: user.roles?.__global_roles__.includes("admin") ?? false,
  };
}
