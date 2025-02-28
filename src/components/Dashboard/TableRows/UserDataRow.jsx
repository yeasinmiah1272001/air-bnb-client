import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = (selected) => {
    setIsOpen(false);
    console.log("ami hote cai", selected);
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
