import _ from 'lodash';
import axios from 'axios';


const apiKey = "cd8ff5193bbd492ea78b3a1d3f177137";
const baseURL = 'https://api.spoonacular.com';

export const getSearch = _.memoize(async params => {
    let items = params.items;
    let ingredients = items.join(",+");

    const res = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=5`)
    if (res.status !== 200) return [];
    const recipes = await res.json();
    console.log(recipes.response)
    return recipes;
});


export const fetchUPCItem = (upc, callback) => {
  const searchUrl = `${baseURL}/food/products/upc/${upc}?apiKey=${apiKey}`;
  axios.get(searchUrl)
    .then(result => {
      if (result.data) {
        if (result.data.status === 'failure') {
          callback('Spoonacular request failed');
        } else {
          callback(null, result.data);
        }
      }
    })
    .catch(err => {
      callback(err);
    });
};

export const fetchProductDetails = (productId, successCb) => {
  const searchUrl = `${baseURL}/food/products/upc/${productId}?apiKey=${apiKey}`;

  axios.get(searchUrl)
    .then(result => {
      if (result) {
        console.log(result.data['nutrition']);
        successCb(result.data['nutrition']);
      } else {
        return null;
      };
    })
    .catch(err => {
      console.error(err);
    });
};

export const searchProductsByName = (searchString, callback) => {
  const searchLimit = 5;
  const searchUrl = `${baseURL}/food/products/search?query=${searchString}&number=${searchLimit}&apiKey=${apiKey}`;

  axios.get(searchUrl)
    .then(result => (
      Promise.all(result.data.products.map(product => (
        axios.get(`${baseURL}/food/products/${product['id']}?apiKey=${apiKey}`)
      )))
    ))
    .then(detailedProducts => {
      if (detailedProducts) {
        callback(detailedProducts.map(p => formatProductForQuickcart(p.data)));
      }
    })
    .catch(err => {
      console.error(err);
    });
};