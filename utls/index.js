import { Dancing_Script } from "next/font/google";

export const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export function* range(start, end, step = 1) {
  let i;
  if (step > 0) {
    for (i = start; i < end; i += step) {
      yield i;
    }
  } else {
    for (i = start; i > end; i -= step) {
      yield i;
    }
  }
}

export const arrObjectMap = (arr, key1, key2) => {
  const newObj = {};
  arr.forEach((item) => {
    newObj[item[key1]] = item[key2];
  });

  return newObj;
};

export const convertFormValues = (formRef)=>{

  const formData = new FormData(formRef);
  const formObj = {};
  for(let[k , v] of formData.entries()){
    formObj[k] = v
  }

  return formObj
}

export const removeWhiteSpaces = (str = "")=>{
  const normalized = str.trim().replace(/\s{2,}/g, " ");
  return normalized
}

export const matchesSearch  = (text, query)=> {
  const tokens = removeWhiteSpaces(query).toLowerCase().trim().split(/\s+/);
  const lowerText = text.toLowerCase();

  return tokens.every(token => lowerText.includes(token));
}


export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})