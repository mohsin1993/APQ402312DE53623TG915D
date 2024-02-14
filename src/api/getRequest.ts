export const getRequest = async (url: string) => {
  return fetch(url).then(async (response) => {
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  });
};
