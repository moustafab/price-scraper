import {
    JSDOM,
} from 'jsdom';
import axios from 'axios';

export default (PAGE_URL, OUTPUT_METHOD) => {
    const getPage = url => axios.get(url);

    const parseResponse = ({
        data,
        status,
    }) => {
        if (status === 200) {
            return data;
        }
        throw new Error('not a 200, could be something else');
    };

    const parsePage = responseHTML => new JSDOM(responseHTML);

    const getMetas = dom => [...dom.window.document.head.getElementsByTagName('meta')];

    const findMetaByProperty = property => meta => meta.getAttribute('property') === property;

    const getPriceMetas = metas => metas.filter(findMetaByProperty('og:price:amount'));

    const getContentFromMeta = meta => meta.getAttribute('content');

    const getPricesFromPriceMetas = priceMetas => priceMetas.map(getContentFromMeta);

    const formatOutput = (price, itemId) => `price for ${itemId} is ${price}`;

    const logPrice = price => OUTPUT_METHOD(formatOutput(price, PAGE_URL));

    const outputPrices = priceList => priceList.forEach(logPrice);


    return getPage(PAGE_URL)
        .then(parseResponse)
        .then(parsePage)
        .then(getMetas)
        .then(getPriceMetas)
        .then(getPricesFromPriceMetas)
        .then(outputPrices)
        .catch(console.error);
};
