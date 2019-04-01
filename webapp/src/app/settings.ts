export const subdir = '';


export const subdirI = subdir.length > 0 ? subdir + '/' : '';
export const api = '/' + subdirI + 'api';
export const url = (s: string) => {
  if (s.length === 0) {
    return subdir;
  } else {
    return subdirI + s;
  }
};
