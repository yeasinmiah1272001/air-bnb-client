import { useState } from "react";
import { categories } from "../Categories/CategoriesData";
import { DateRange } from "react-date-range";

const AddRoomForm = ({
  handleDate,
  dates,
  handleFormSubmit,
  handleImageChange,
  selectedImage,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="category"
              >
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              {/* Calender */}
              <DateRange
                rangeColors={["#F6536D"]}
                editableDateInputs={true}
                onChange={(item) => handleDate(item)}
                moveRangeOnFirstSelection={false}
                ranges={[dates]}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3  border border-rose-300 focus:outline-rose-500 rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
            </div>

            <div className="p-6 bg-gray-50 w-full max-w-md mx-auto rounded-xl shadow-md flex flex-col items-center space-y-4">
              <div className="file_upload w-full px-6 py-4 relative border-2 border-dashed border-[#F6536D] rounded-lg">
                <div className="flex flex-col items-center text-center space-y-2">
                  <label>
                    <input
                      className="hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="bg-blue-500 text-white text-sm font-medium rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
              {selectedImage && (
                <div className="w-24 h-24 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="total_guest"
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bedrooms"
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bathrooms"
                  id="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
