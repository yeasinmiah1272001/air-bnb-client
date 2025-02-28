import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();

  // console.log(user);
  const [role] = useRole();
  // console.log("role", role);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-xl w-4/5 max-w-lg">
        <div className="relative">
          <img
            alt="cover"
            src="https://wallpapercave.com/wp/wp10784415.jpg"
            className="w-full h-40 object-cover rounded-t-xl"
          />
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
            <img
              alt="profile"
              src={user?.photoURL || "https://via.placeholder.com/150"}
              className="rounded-full h-24 w-24 border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-16 p-6">
          <p className="bg-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full mb-2">
            {role}
          </p>
          <p className="text-xl font-semibold text-gray-800">
            User ID: {user?.uid || "N/A"}
          </p>
          <div className="w-full mt-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-bold text-gray-800">
                  {user?.displayName || "Anonymous"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-bold text-gray-800">
                  {user?.email || "example@email.com"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 mt-6">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg shadow-sm transition">
                Update Profile
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-lg shadow-sm transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
