import React from "react";

import { useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import GradientButton from "../../components/GradientButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

// ✅ Yup schema with all validations
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .nullable()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return value && value.type?.startsWith("image/");
    }),
});

const SupportTicket = () => {
  const [visible, setVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setVisible(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setValue("image", null);
    setImagePreview(null);
  };
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Support Tickets</p>
        <Button
          label="Add Withdraw"
          className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md"
          onClick={() => setVisible(true)}
        />
      </div>

      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">Add Ticket</div>
        }
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-white rounded-xl  shadow-lg w-full max-w-md "
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3 ">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description")}
              className="bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg resize-none"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Attach Image (optional)
            </label>

            {imagePreview ? (
              <div className="relative w-auto h-40">
                <img
                  src={imagePreview}
                  alt="Attachment Preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label
                htmlFor="ticket-image-upload"
                className="w-full h-40 border-2 border-dashed border-cyan-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-800/30 transition"
              >
                <FaCloudUploadAlt className="text-2xl mb-2 text-cyan-400" />
                <span className="text-cyan-300">Attach Image</span>
                <input
                  type="file"
                  id="ticket-image-upload"
                  accept="image/*"
                  className="hidden "
                  onChange={handleImageChange}
                />
              </label>
            )}

            {errors.image && (
              <span className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </span>
            )}
          </div>

          <GradientButton type="submit">Add New Ticket</GradientButton>
        </form>
      </Dialog>

      <div>
        <CustomTable data={[]} columns={columns} />
      </div>
    </div>
  );
};

export default SupportTicket;
