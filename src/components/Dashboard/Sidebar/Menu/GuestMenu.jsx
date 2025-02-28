import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../../hooks/useRole";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import HostModal from "../../../Modal/HostModal";

const GuestMenu = () => {
  const [role] = useRole();

  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // host handler
  const modalHandler = async () => {
    // console.log("ami hot hote cai");
    setIsModalOpen(false);
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      if (data.modifiedCount > 0) {
        toast.success("Success! Pleace wait for admin confirmation");
        console.log("data", data);
      } else {
        toast.success("Pleace! wait for admin approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {role === "guest" && (
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
        </div>
      )}

      <HostModal
        closeModal={closeModal}
        isOpen={isModalOpen}
        modalHandler={modalHandler}
      />
    </>
  );
};

export default GuestMenu;
