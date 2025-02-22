import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utility";

const AddRoom = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const handleDate = (item) => {
    // console.log(item);
    setDates(item.selection);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const price = form.price.value;
    const guest = form.total_guest;
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
    const imageUrl = await imageUpload(image);

    // console.log("imgeurl", imageUrl);

    const roomData = {
      location,
      category,
      title,
      price,
      formDate,
      endDate,
      guest,
      bathrooms,
      description,
      bedrooms,
      host,
      image: imageUrl,
    };
    console.log("formData", roomData);
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
