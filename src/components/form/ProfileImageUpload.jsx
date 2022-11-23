import { Field } from "formik";
import React, { memo, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteMedia, uploadImage } from "../../utils/upload";

function ProfileImageUpload({ name, className, size = "100px" }) {
  const inputRef = useRef();

  const upload = async (file, setFieldValue) => {
    const url = await uploadImage(file);
    setFieldValue(name, url);
  };

  const onChange = (file, setFieldValue, value) => {
    toast.promise(
      async () => {
        if (value) await deleteMedia(value);
        await upload(file, setFieldValue);
      },
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  return (
    <div className={`profile_image_upload_wrapper ${className}`}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => (
          <>
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                onChange(e.target.files[0], setFieldValue, value)
              }
            />
            <div
              className="image_wrapper"
              style={{ width: size, height: size }}
              onClick={() => inputRef.current.click()}
            >
              <img
                className="image"
                src={value == "" ? "/images/profile_img.jpg" : value}
                alt={value}
              />
              <div className="tip_text">Солих</div>
            </div>
            <ToastContainer />
          </>
        )}
      </Field>
    </div>
  );
}

export default memo(ProfileImageUpload);
