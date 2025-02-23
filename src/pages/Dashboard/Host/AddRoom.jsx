import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utility";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddRoom = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const handleDate = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post("/room", roomData);
      return data;
    },
    onSuccess: () => {
      console.log("Data saved successfully");
    },
    onError: (error) => {
      console.error("Error saving data:", error);
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const price = form.price.value;
    const guests = form.total_guest.value; // Fixed field access
    const formDate = dates.startDate;
    const endDate = dates.endDate;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };

    try {
      // Upload image and get the URL
      const imageUrl = await imageUpload(image);
      // console.log("Image URL:", imageUrl);

      // Prepare room data
      const roomData = {
        location,
        category,
        title,
        price,
        formDate,
        endDate,
        guests,
        bathrooms,
        description,
        bedrooms,
        host,
        image: imageUrl,
      };

      // Save to database
      await mutateAsync(roomData);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(URL.createObjectURL(image)); // Create a preview URL for the image
    }
  };

  return (
    <div>
      <AddRoomForm
        dates={dates}
        handleDate={handleDate}
        handleFormSubmit={handleFormSubmit}
        selectedImage={selectedImage}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default AddRoom;
