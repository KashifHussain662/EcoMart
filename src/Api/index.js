const API_BASE_URL = 'http://192.168.1.7/zk-mart/public/api/';

const API_URLS = {
  REGISTER_USER: `${API_BASE_URL}Register/register.php`,
  LOGIN_USER: `${API_BASE_URL}Login/login.php`,
  GET_PRODUCT: `${API_BASE_URL}Products/products.php`,
  GET_PRODUCT1: `${API_BASE_URL}Category/products.php`,
  ORDER_BOOK: `${API_BASE_URL}Booking/bookOrder.php`,
};

export default API_URLS;