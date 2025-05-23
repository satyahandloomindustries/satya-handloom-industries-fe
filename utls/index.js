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
