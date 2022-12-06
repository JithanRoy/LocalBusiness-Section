import authAxios from "../apis/api-client";
import Cookies from "js-cookie";

// export const fileUploadConfig = {
//     headers: { 'content-type': 'form-data' },
//     onUploadProgress: (event) => {
//       console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
//     },
// };

function paginationQueryBuilder(state) {
  // console.log("STATE: " + state)
  let query = "";
  Object.keys(state).forEach((key, index) => {
    if (state[key] && String(state[key].length)) {
      if (query.length === 0) {
        query += key + "=" + String(state[key]);
      } else {
        query += "&" + key + "=" + String(state[key]);
      }
    }
  });
  // console.log("QUERY: " + query)
  return query;
}

export async function paginationClient(state) {
  console.log("STATE: " + JSON.stringify(state));
  const query = paginationQueryBuilder(state);
  const response = await authAxios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/companySearch?${query}`
  );
  // console.log("PAGINATION RESPONSE", response.data)
  return response.data;
}

export async function userInfoClient() {
  const response = await authAxios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/self/profile`
  );
  return response.data;
}

export async function fileUploadClient(id, file) {
  const response = await authAxios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logo-upload?${id}`,
    file
  );
  return response.data;
}

export async function serviceRequestClient(payload) {
  console.log("PAYLOAD: " + JSON.stringify(payload));
  const response = await authAxios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/history/service-request`,
    payload
  );
  return response.data;
}
