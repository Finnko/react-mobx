import makeRequest from './helpers/makeRequest';

const load = (token) => {
    let url = 'cart/load.php' + ( token !== null ? `?token=${token}` : '' );
    return makeRequest(url);
}

const add = (token, id) => {
    return makeRequest(`cart/add.php?token=${token}&id=${id}`);
}

const remove = (token, id) => {
    return makeRequest(`cart/remove.php?token=${token}&id=${id}`);
}

const change = (token, id, cnt) => {
    return makeRequest(`cart/change.php?token=${token}&id=${id}&cnt=${cnt}`);
}

const clean = (token) => {
    return makeRequest(`cart/clean.php?token=${token}`);
}

export { load, add, remove, change, clean };
