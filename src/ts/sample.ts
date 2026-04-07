import { MODULE_ID } from "./constants.ts";

export function mySampleMigrationModule(): void {
    Hooks.once("migrations.setup", (migrations: any) => {
        const migrationsTyped = migrations as Migrations;
        migrationsTyped.register({ moduleId: MODULE_ID });

        migrationsTyped.addMigration({
            moduleId: MODULE_ID,
            migration: {
                key: `2025-11-12-${MODULE_ID}`,
                date: new Date("2025-11-12"),
                func: async () => {
                    console.log("Running my sample migration from 2025-11-12 for", MODULE_ID);
                    return true;
                },
            },
        });

        migrationsTyped.addMigrations({
            moduleId: MODULE_ID,
            migrations: [
                {
                    key: `2025-11-10-${MODULE_ID}`,
                    date: new Date("2025-11-10"),
                    func: async () => {
                        console.log("Running my sample migration from 2025-11-10 for", MODULE_ID);
                        return true;
                    },
                },
            ],
        });
    });

    Hooks.once("migrations.ready", async (migrations: any) => {
        const migrationsTyped = migrations as Migrations;
        await migrationsTyped.clearAllRan({
            moduleId: MODULE_ID,
        });
        await migrationsTyped.runAll({ moduleId: MODULE_ID });
    });
}
