import makeRequest from './helpers/makeRequest';

const fetchProducts = () => {
    return makeRequest('products/all.php');
}

export { fetchProducts };
