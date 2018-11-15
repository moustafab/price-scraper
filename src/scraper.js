import {
    JSDOM,
} from 'jsdom';
import axios from 'axios';

export default (PAGE_URL, OUTPUT_METHOD) => {
    const config = {
        method: 'get',
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36',
        },
    };

    const getPage = (url) => {
        console.log('GETTING');
        return axios.get(url, config).catch(error => console.log(`THERE WAS AN ERROR ${error}`));
    };

    const parseResponse = ({
        data,
        status,
    }) => {
        if (status === 200) {
            console.log(`GOT DATA for ${PAGE_URL}`);
            return data;
        }
        throw new Error('not a 200, could be something else');
    };

    const parsePage = responseHTML => new JSDOM(responseHTML);

    const getMetas = (dom) => {
        const metas = dom.window.document.head.getElementsByTagName('meta');
        console.log(`FOUND ${metas.length} META TAGS`);
        return [...metas];
    };

    const findMetaByProperty = property => meta => meta.getAttribute('property') && meta.getAttribute('property').includes(property);

    const getPriceMetas = (metas) => {
        const priceMetas = metas.filter(findMetaByProperty('price:amount'));
        console.log(`FOUND ${priceMetas.length} PRICE META TAGS`);
        return priceMetas;
    };

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
