import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../../hooks/useRole";

const GuestMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />
    </>
  );
};

export default GuestMenu;
