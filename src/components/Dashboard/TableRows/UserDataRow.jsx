import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user: loginUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/user/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("user updated success");
      refetch();
      //   console.log(data);
      setIsOpen(false);
    },
  });

  const modalHandler = async (selected) => {
    setIsOpen(false);
    const currentUser = {
      email: user?.email,
      role: selected,
      status: "veryfied",
    };
    try {
      await mutateAsync(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </div>
        {/* Update User Modal */}
        <UpdateUserModal
          setIsOpen={setIsOpen}
          user={user}
          isOpen={isOpen}
          modalHandler={modalHandler}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
