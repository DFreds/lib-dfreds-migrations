import { MODULE_ID } from "./constants.ts";

function log(message: string): void {
    console.log(`${MODULE_ID} | ${message}`);
}

function error(message: string): void {
    console.error(`${MODULE_ID} | ${message}`);
}

export { log, error };
