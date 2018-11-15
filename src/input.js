const {
    INPUT_FILE = 'test.json',
} = process.env;

console.log(`PULLING FROM FILE: ${INPUT_FILE}`);

export const DEFAULT_OUTPUT_METHOD = console.log;

export const PAGE_URLS = require(`../${INPUT_FILE}`).urls;
