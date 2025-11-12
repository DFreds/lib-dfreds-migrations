import { MODULE_ID } from "./constants.ts";

class Settings {
    // Settings keys
    // #RAN_MIGRATIONS = "ranMigrations";

    register(): void {
        // this.#registerRanMigrations();
    }

    addMigrationSetting({ moduleId }: { moduleId: string }): void {
        try {
            game.settings.get(MODULE_ID, moduleId) as string[];
        } catch (error) {
            console.log("Adding migration setting for", moduleId);
            game.settings.register(MODULE_ID, moduleId, {
                name: `Ran Migrations for ${moduleId}`,
                scope: "world",
                config: false,
                default: [],
                type: Array,
            });
        }
    }

    getRanMigrations({ moduleId }: { moduleId: string }): string[] {
        return game.settings.get(MODULE_ID, moduleId) as string[];
    }

    async addRanMigration({
        moduleId,
        migration,
    }: {
        moduleId: string;
        migration: string;
    }): Promise<void> {
        let ranMigrations = this.getRanMigrations({ moduleId });
        ranMigrations.push(migration);
        ranMigrations = [...new Set(ranMigrations)]; // remove duplicates

        await game.settings.set(MODULE_ID, moduleId, ranMigrations);
    }

    async clearRanMigrations({ moduleId }: { moduleId: string }): Promise<void> {
        await game.settings.set(MODULE_ID, moduleId, []);
    }
}

export { Settings };
