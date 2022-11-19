import { Field } from "formik";
import React, { memo, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import bucket from "../../utils/bucket";

function ProfileImageUpload({ name, className, size = "100px" }) {
  const inputRef = useRef();

  const onChange = (file, setFieldValue) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: "skin-hospital",
      Key: file.name,
    };

    bucket
      .putObject(params)
      .on("success", (res) => {
        setFieldValue(
          name,
          res["request"]["httpRequest"]["stream"]["responseURL"]
        );
      })
      .send((err) => {
        if (err) {
          toast("Амжилтгүй");
        }
      });
  };

  return (
    <div className={`profile_image_upload_wrapper ${className}`}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue }, meta }) => (
          <>
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => onChange(e.target.files[0], setFieldValue)}
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
            <p className="error_message">{meta.error}</p>
            <ToastContainer />
          </>
        )}
      </Field>
    </div>
  );
}

export default memo(ProfileImageUpload);
