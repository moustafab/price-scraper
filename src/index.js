import scraper from './scraper';
import {
    PAGE_URLS,
    DEFAULT_OUTPUT_METHOD,
} from './input';

PAGE_URLS.forEach(
    ({
        url,
    }) => scraper(url, DEFAULT_OUTPUT_METHOD),
);
