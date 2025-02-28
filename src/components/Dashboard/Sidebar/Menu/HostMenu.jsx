import { BsFillHouseAddFill, BsGraphUp } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const HostMenu = () => {
  return (
    <>
      {/* Add room */}
      <MenuItem
        label={"Add Room"}
        address={"add-room"}
        icon={BsFillHouseAddFill}
      />
      {/* my-listings */}
      <MenuItem
        label={"My Listing"}
        address={"my-listings"}
        icon={MdHomeWork}
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Bookings"
        address="manage-bookings"
      />
    </>
  );
};

export default HostMenu;
