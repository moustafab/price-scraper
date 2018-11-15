import scraper from './scraper';
import {
    PAGE_URLS,
    DEFAULT_OUTPUT_METHOD,
} from './input';

const instantiateScraper = ({
    url,
}) => {
    console.log(`scrapping: ${url}`);
    return scraper(url, DEFAULT_OUTPUT_METHOD);
};

PAGE_URLS.forEach(instantiateScraper);
