import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { differenceInCalendarDays } from "date-fns";
import BookingModal from "../Modal/BookingModal";
import useAuth from "../../hooks/useAuth";

const RoomReservation = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [state, setState] = useState([
    {
      startDate: new Date(room?.formDate),
      endDate: new Date(room?.endDate),
      key: "selection",
    },
  ]);
  // days * price
  const totalPrice =
    parseInt(
      differenceInCalendarDays(new Date(room.endDate), new Date(room.formDate))
    ) * room?.price;

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
          showDateDisplay={false}
          rangeColors={["#F6536D"]}
          // editableDateInputs={true}
          // onChange={(item) => setState([item.selection])}
          onChange={(item) => {
            setState([
              {
                startDate: new Date(room?.formDate),
                endDate: new Date(room?.endDate),
                key: "selection",
              },
            ]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div onClick={() => setIsOpen(true)} className="p-4">
        <Button label={"Reserve"} />
      </div>
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        bookingInfo={{
          ...room,
          price: totalPrice,
          guest: { name: user?.displayName },
        }}
      />

      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default RoomReservation;
