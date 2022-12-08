import { useFormikContext } from "formik";
import { memo } from "react";
import { useEffect } from "react";

function FormObserver({ onChange }) {
  const { values } = useFormikContext();

  useEffect(() => {
    onChange(values);
  }, [values]);

  return null;
}

export default memo(FormObserver);
