export function mySampleMigrationModule(): void {
    // @ts-expect-error Type mismatch
    Hooks.once("migrations.setup", (migrations: Migrations) => {
        testMigration({ moduleId: "my-sample-migration-module", migrations });
        testMigration({ moduleId: "my-sample-migration-module-2", migrations });
    });

    // @ts-expect-error Type mismatch
    Hooks.once("migrations.ready", async (migrations: Migrations) => {
        await migrations.clearAllRan({
            moduleId: "my-sample-migration-module",
        });
        await migrations.runAll({ moduleId: "my-sample-migration-module" });

        await migrations.clearAllRan({
            moduleId: "my-sample-migration-module-2",
        });
        await migrations.runAll({ moduleId: "my-sample-migration-module-2" });
    });
}

function testMigration({moduleId, migrations}: {moduleId: string, migrations: Migrations}): void {
    migrations.register({ moduleId });
    migrations.addMigration({
        moduleId,
        migration: {
            key: `2025-11-12-${moduleId}`,
            date: new Date("2025-11-12"),
            func: async () => {
                console.log("Running my sample migration from 2025-11-12");
                return true;
            },
        },
    });

    migrations.addMigrations({
        moduleId,
        migrations: [
            {
                key: `2025-11-10-${moduleId}`,
                date: new Date("2025-11-10"),
                func: async () => {
                    console.log("Running my sample migration from 2025-11-10");
                    return true;
                },
            },
        ],
    });
}
