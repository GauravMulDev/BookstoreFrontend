

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchBooks = async (page, pageSize, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/books/booklist`,
      {
        page,
        pageSize,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const filterBooks = (filters) => {
  const endpoint = `${BASE_URL}/books/filter`;

  const requestBody = {
    title: filters.title,
    author: filters.author,
    rating: filters.rating,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice
  };

  Object.keys(requestBody).forEach(
    key =>
      (requestBody[key] == null || requestBody[key] === "") &&
      delete requestBody[key]
  );

  return axios.post(endpoint, requestBody);
};

export const signup = (credentials) => {
  const endpoint = `${BASE_URL}/auth/signup`;
  return axios.post(endpoint, credentials);
};
export const login = (credentials) => {
  const endpoint = `${BASE_URL}/auth/login`;
  return axios.post(endpoint, credentials);
};

export const fetchFourStarBooks = async () => {
  const token = localStorage.getItem("jwtToken");
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  };

  try {
      const response = await axios.post(
          `${BASE_URL}/books/filter`,
          { rating: "4" },
          config
      );
      return response.data;
  } catch (error) {
      console.error("Error fetching 4 star books:", error);
      throw error;
  }
};

export const uploadBookFile = async (file, dbName, collectionName) => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append("file", file);

  const apiUrl = `${BASE_URL}/books/import?targetDb=${dbName}&targetCollection=${collectionName}`;
  const token = localStorage.getItem("jwtToken");

  try {
      const response = await axios.post(apiUrl, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};
export const dumpDatabase = async (dbName) => {
  const apiUrl = `${BASE_URL}/books/dump/${dbName}`;
  const token = localStorage.getItem("jwtToken");

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      },
      responseType: "blob"
  };

  try {
      const response = await axios.get(apiUrl, config);
      return response;
  } catch (error) {
      throw error;
  }
};