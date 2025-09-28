import { arrObjectMap } from '@/utls';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

const useFormValidation = (shape = {}) => {
  const [error, setError] = useState({});
  const schema = Yup.object().shape(shape);
  const validation = useCallback(
    (data = {}) =>
      schema.validate(data).catch((err) => setError(arrObjectMap(err.inner))),
    [shape]
  );
  const validateAt = useCallback(
    (path, value) => {
      console.log(path, value, typeof value);

      schema
        .validateAt(path, { [path]: value })
        .catch((err) => setError({ ...error, [path]: err.message }));
    },
    [shape]
  );
  const resetError = useCallback(() => setError({}), []);
  const noError = useMemo(() => Object.keys(error).length === 0, [error]);

  return { validation, error, resetError, noError, validateAt };
};

export default useFormValidation;
