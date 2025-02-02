import { UserProfile } from "@clerk/clerk-react";

const UserProfilePage = () => {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <UserProfile />
      </div>
    </div>
  );
};

export default UserProfilePage;
