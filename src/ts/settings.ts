import { MODULE_ID } from "./constants.ts";

class Settings {
    // Settings keys
    #SAMPLE = "sample";

    #RAN_MIGRATIONS = "ranMigrations";

    register(): void {
        this.#registerRanMigrations();
    }

    #registerRanMigrations(): void {
        game.settings.register(MODULE_ID, this.#RAN_MIGRATIONS, {
            name: "Ran Migrations",
            scope: "world",
            config: false,
            default: {},
            type: Object,
        });
    }

    get sample(): boolean {
        return game.settings.get(MODULE_ID, this.#SAMPLE) as boolean;
    }

    async setSample(value: boolean): Promise<unknown> {
        return game.settings.set(MODULE_ID, this.#SAMPLE, value);
    }
}

export { Settings };
