import { MODULE_ID } from "./constants.ts";
import { log } from "./logger.ts";

class Settings {
    addMigrationSetting({ moduleId }: { moduleId: string }): void {
        if (game.settings.settings.has(`${MODULE_ID}.${moduleId}`)) return;

        log(`Adding migration setting for ${moduleId}`);
        game.settings.register(MODULE_ID, moduleId, {
            name: `Ran Migrations for ${moduleId}`,
            scope: "world",
            config: false,
            default: [],
            type: Array,
        });
    }

    getRanMigrations({ moduleId }: { moduleId: string }): string[] {
        return game.settings.get(MODULE_ID, moduleId) as unknown as string[];
    }

    async addRanMigration({ moduleId, migration }: { moduleId: string; migration: string }): Promise<void> {
        const ranMigrations = new Set([...this.getRanMigrations({ moduleId }), migration]);
        await game.settings.set(MODULE_ID, moduleId, [...ranMigrations]);
    }

    async clearRanMigrations({ moduleId }: { moduleId: string }): Promise<void> {
        await game.settings.set(MODULE_ID, moduleId, []);
    }
}

export { Settings };
