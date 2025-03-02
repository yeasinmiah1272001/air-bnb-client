import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { format } from "date-fns";

import { Fragment } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISIABLE_KEY);

const BookingModal = ({ closeModal, isOpen, bookingInfo }) => {
  // console.log(bookingInfo);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Reserve
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Room: {bookingInfo?.title}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Location: {bookingInfo?.location}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Guest: {bookingInfo?.guest?.name}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    From: {format(new Date(bookingInfo?.formDate), "PP")} - To:{" "}
                    {format(new Date(bookingInfo?.endDate), "PP")}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Price: $ {bookingInfo?.price}
                  </p>
                </div>
                <hr className="mt-8 " />
                {/* checkout form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    closeModal={closeModal}
                    bookingInfo={bookingInfo}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
