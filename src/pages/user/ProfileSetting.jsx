import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";

const ProfileSetting = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      zip: "",
      address: "",
      joiningDate: null,
      avatar: null,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = {
        firstName: "Hasnain",
        lastName: "Abbas",
        username: "HasnainAbbas3051",
        gender: "male",
        dob: "2000-01-01",
        email: "hasnainabbas110@gmail.com",
        phone: "+92",
        country: "Pakistan",
        city: "",
        zip: "",
        address: "",
        joiningDate: new Date("2025-05-26T12:14:00"),
        avatar: null,
      };
      reset(data);
      setAvatarPreview(null);
    };

    fetchUser();
  }, [reset]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatar = () => {
    setAvatarPreview(null);
    setValue("avatar", null);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-md bg-[#2d495a] text-white h-[42px] border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400 focus:border-cyan-400";

  const labelClass = "text-sm font-medium mb-1 text-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5"
    >
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Profile Settings</p>
      </div>

      {/* Avatar Upload */}
      <div className="mb-6">
        <label htmlFor="avatar-upload" className={labelClass}>
          Avatar:
        </label>

        {avatarPreview ? (
          <div className="relative w-40 h-40">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={clearAvatar}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <label
            htmlFor="avatar-upload"
            className="w-40 h-40 border-2 border-dashed border-cyan-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-800/30 transition"
          >
            <FaCloudUploadAlt className="text-2xl mb-2 text-cyan-400" />
            <span className="text-cyan-300">Update Avatar</span>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className={labelClass}>First Name</label>
          <input {...register("firstName")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Last Name</label>
          <input {...register("lastName")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Username</label>
          <input {...register("username")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className={labelClass}>
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className={inputClass}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className={inputClass}
                placeholderText="Select date"
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Email Address</label>
          <input {...register("email")} className={inputClass} readOnly />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Phone</label>
          <input {...register("phone")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Country</label>
          <input {...register("country")} className={inputClass} readOnly />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>City</label>
          <input {...register("city")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Zip</label>
          <input {...register("zip")} className={inputClass} />
        </div>

        <div className="flex flex-col ">
          <label className={labelClass}>Address</label>
          <input {...register("address")} className={inputClass} />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Joining Date</label>
          <Controller
            name="joiningDate"
            control={control}
            render={({ field }) => (
              <Calendar
                {...field}
                disabled
                showTime
                showIcon
                className="w-full"
                inputClassName={inputClass}
                panelClassName="bg-[#2d495a]"
                style={{ height: "42px" }}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          label="Save Changes"
          className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md"
        />
      </div>
    </form>
  );
};

export default ProfileSetting;
