import { UserData, getHeadshotURL } from "../../data/data";

interface UserProfileProps {
  user: UserData;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center my-8">
      <img
        src={getHeadshotURL(user.headshotId, "large")}
        alt={user.name}
        className="w-64 h-64 rounded-full object-cover border-2 border-black "
      />
      <h2 className="text-4xl font-bold mt-4">{user.name}</h2>
      <p className="text-center mt-2 max-w-md text-xl">{user.description}</p>
    </div>
  );
};
