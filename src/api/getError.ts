export const getError = (error: Error) => {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    throw new Error("Network error occurred. Please check your internet connection.");
  } else {
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};
