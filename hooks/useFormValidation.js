import { arrObjectMap } from '@/utls';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

const useFormValidation = (shape = {}) => {
  const [error, setError] = useState({});
  const schema = Yup.object().shape(shape);
  const validation = useCallback(
     (data = {}) => 
      schema.validate(data  , { abortEarly: false }).then(()=> ({invalid:false})).catch((err) => {
        const normalisedData = arrObjectMap(err.inner , 'path' , 'message')
        setError(normalisedData)
        return {normalisedData , invalid: true}
      }
      ),
    [shape]
  );
  const validateAt = useCallback(
    (path, value) => {

      schema
        .validateAt(path, { [path]: value }).then(()=>{
          const newError  = {...error};
          delete newError[path]
          setError(newError)
        })
        .catch((err) => setError({ ...error, [path]: err.message }));
    },
    [shape]
  );
  const resetError = useCallback(() => setError({}), []);
  const noError = useMemo(() => Object.keys(error).length === 0, [error]);

  return { validation, error, resetError, noError, validateAt };
};

export default useFormValidation;
