import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";

const AddRoom = () => {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const handleDate = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  return (
    <div>
      <AddRoomForm dates={dates} handleDate={handleDate} />
    </div>
  );
};

export default AddRoom;
