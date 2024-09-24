export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  headshotId: string;
  description: string;
  isAdmin: boolean;
};

export function cleanUsers(users: Record<string, any>[]): UserData[] {
  return users.map(cleanUser);
}

function cleanUser(user: Record<string, any>): UserData {
  return {
    _id: user._id ?? "",
    firstName: user.profile.first_name ?? "",
    lastName: user.profile.last_name ?? "",
    name: `${user.profile.first_name} ${user.profile.last_name}`.trim(),
    headshotId: user.profile.headshot ?? "",
    description: user.profile.description ?? "",
    isAdmin: user.roles?.__global_roles__.includes("admin") ?? false,
  };
}
