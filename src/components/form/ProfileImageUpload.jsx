import { Field } from "formik";
import React, { memo } from "react";
import bucket from "../../utils/bucket";

function ProfileImageUpload({ name }) {
  return (
    <div className="profile_image_upload_wrapper">
      <Field name={name}>
        {({ field: value, form, meta }) => (
          <img className="image" src={value} alt={value} />
        )}
      </Field>
    </div>
  );
}

export default memo(ProfileImageUpload);
