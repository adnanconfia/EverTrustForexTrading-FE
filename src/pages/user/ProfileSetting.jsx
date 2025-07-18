import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useUsers } from "../../context/UserContext";
import { countries } from "../../helper/countryList";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { updateUserProfile } from "../../services/profileService";
import { useLoading } from "../../context/LoaderContext";

const ProfileSetting = () => {
  const { users, updateUserInContext } = useUsers() || {};
  const user = users?.[0];
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();

  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);

  // Reset form with user data when user changes
  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        gender: user.gender || "",
        date_of_birth: user.date_of_birth || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        country: user.country || "",
        city: user.city || "",
        zip_code: user.zip_code || "",
        address: user.address || "",
        photo: user.photo || null,
      });
      setPhotoPreview(user.photo || null);
    }
  }, [user, reset]);

  // Submit handler sends only dirty fields as FormData
  const onSubmit = async (data) => {
    if (!user?.id) {
      toast.error("User ID is missing");
      return;
    }

    const formData = new FormData();
    for (const key in dirtyFields) {
      const value = data[key];
      if (value instanceof Date) {
        formData.append(key, value.toISOString().split("T")[0]);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    if ("photo" in dirtyFields && data.photo === null) {
      formData.append("photo", "");
    }

    try {
      setLoading(true);
      const response = await updateUserProfile(user.id, formData);
      toast.success("Profile updated successfully");
      if (response.data) {
        updateUserInContext(response.data);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Photo upload handlers
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setValue("photo", file, { shouldDirty: true });
    }
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    setValue("photo", null, { shouldDirty: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5"
    >
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Profile Settings</p>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label htmlFor="photo-upload" className="custom-label">
          Photo:
        </label>
        {photoPreview ? (
          <div className="relative w-40 h-40">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <label
            htmlFor="photo-upload"
            className="w-40 h-40 border-2 border-dashed border-cyan-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-800/30 transition"
          >
            <FaCloudUploadAlt className="text-2xl mb-2 text-cyan-400" />
            <span className="text-cyan-300">Update photo</span>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="custom-label">First Name</label>
          <input {...register("first_name")} className="custom-input" />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Last Name</label>
          <input {...register("last_name")} className="custom-input" />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Username</label>
          <input {...register("username")} className="custom-input" />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="custom-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="custom-error">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Date of Birth</label>
          <Controller
            name="date_of_birth"
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
                className="custom-input"
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Email Address</label>
          <input {...register("email")} className="custom-input" readOnly />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Phone Number</label>
          <input
            {...register("phone_number", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers are allowed",
              },
            })}
            className="custom-input"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Country</label>
          <select {...register("country")} className="custom-input">
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="custom-label">City</label>
          <input {...register("city")} className="custom-input" />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Zip Code</label>
          <input {...register("zip_code")} className="custom-input" />
        </div>

        <div className="flex flex-col">
          <label className="custom-label">Address</label>
          <input {...register("address")} className="custom-input" />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" disabled={!isDirty} className="add-button">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileSetting;
