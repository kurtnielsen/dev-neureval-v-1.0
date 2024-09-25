import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

import { createClient } from '@supabase/supabase-js';

// ----------------------------------------------------------------------

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ----------------------------------------------------------------------
// create global baseUrl so that API routes are appended to a common root
const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

// Add request interceptor for response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Logging out...');
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong!')
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(async (config) => {
  // Fetch the current session from Supabase
  const { data: { session } } = await supabase.auth.getSession();
// getSession > GoTrueClient: IMPORTANT: This method loads values directly from the storage attached to the client. If that storage is based on request cookies for example, the values in it may not be authentic and therefore it's strongly advised against using this method and its results in such circumstances. A warning will be emitted if this is detected. Use #getUser() instead.


  if (session) {
    // Attach the Supabase token to the Authorization header
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  // The access token jwt. It is recommended to set the JWT_EXPIRY to a shorter expiry value.

  return config;
}, (error) => Promise.reject(error));

// ----------------------------------------------------------------------
// Fetcher utility for GET requests
export const fetcher = async (args: string | [string, AxiosRequestConfig],) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    
    // Use the axiosInstance to perform a GET request
    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// Extend fetcher for POST, PUT, DELETE requests
export const fetcherPost = async (url: string, data: any, config?: AxiosRequestConfig) => {
  try {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  } catch (error) {
    console.error('Failed to post data:', error);
    throw error;
  }
};

export const fetcherPut = async (url: string, data: any, config?: AxiosRequestConfig) => {
  try {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
  } catch (error) {
    console.error('Failed to update data:', error);
    throw error;
  }
};

export const fetcherDelete = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  } catch (error) {
    console.error('Failed to delete data:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  user: {
    root: '/api/user',
    profile: '/api/user/profile',
    cards: '/api/user/cards',
    addressBook: '/api/user/address-book',
    notifications: '/api/user/notifications',
    account: '/api/user/account',
  },
  product: {
    root: '/api/product',
    details: '/api/product/details',
    search: '/api/product/search',
    checkout: '/api/product/checkout',
  },
  googleCalendar: '/api/google-calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
    create: '/api/post/create',
  },

};
