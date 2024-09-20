import { User, getFullName, getHeadshotURL } from "../../data/data";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center my-8">
      <img
        src={getHeadshotURL(user)}
        alt={getFullName(user)}
        className="w-64 h-64 rounded-full object-cover"
      />
      <h2 className="text-3xl font-bold mt-4">{getFullName(user)}</h2>
      <p className="text-center mt-2 max-w-md">{user.description}</p>
    </div>
  );
};
