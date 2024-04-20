const Url = `http://localhost:8080`;

const apiRequest = async (method, endpoint, data = {}, isAuthAPI = false) => {
  const url = `${Url}/${endpoint}`;
  const token = localStorage.getItem("token");

  let requestOptions = {
    method: method,
    headers: {},
  };

  if (!isAuthAPI) {
    requestOptions.headers["Authorization"] = `Bearer ${token}`;
  }
  if (method === "POST") {
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    const res = await response.json();
    return res;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
