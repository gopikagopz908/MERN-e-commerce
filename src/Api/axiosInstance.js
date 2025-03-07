// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // Use the BASE_URL from .env
//   withCredentials: true,
//   timeout: 30000,
//   headers: {
//     "Content-Type": "application/json",
    
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// axiosInstance.interceptors.response.use(  //handles errors and responses globally
//     (response) => response,
//     async (error) => {
//         console.log("interfce mmmmmmm vvbnnd mnhh bbghhbgh ghbbgh ggg")
//         const originalRequest = error.config;


//         // Handle 401 errors for expired tokens
//         console.log(error.response?.status,"response error")
//         console.log(originalRequest._retry,"originalRequest._retry")
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             console.log("kjhgf mnbv")
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;
// console.log('object')
//             try {
//                 const res= await axiosInstance.post("/refreshtoken");
//                 console.log(res.data)
//                 // Retry the original request after refreshing the token
//                 isRefreshing = false;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 isRefreshing = false;
//                 processQueue(refreshError, null);

//                 // Redirect to login if refresh fails
//                 if (refreshError.response?.status === 401) {
//                     window.location.href = "/login";
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the BASE_URL from .env
  withCredentials: true,
  timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors for expired tokens
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("user/refreshtoken");

                // Retry the original request after refreshing the token
                isRefreshing = false;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                // Redirect to login if refresh fails
                if (refreshError.response?.status === 401) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;