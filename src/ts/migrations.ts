import { error, log } from "./logger.ts";
import { Settings } from "./settings.ts";

class MigrationsImpl implements Migrations {
    #migrations: Record<string, MigrationType[]>;
    #settings: Settings;

    constructor() {
        this.#migrations = {};
        this.#settings = new Settings();
    }

    static init(): void {
        const migrations = new MigrationsImpl();
        window.migrations = migrations as Migrations;

        Hooks.callAll("migrations.init", window.migrations);
    }

    static setup(): void {
        Hooks.callAll("migrations.setup", window.migrations);
    }

    static ready(): void {
        Hooks.callAll("migrations.ready", window.migrations);
    }

    register({ moduleId }: { moduleId: string }): void {
        this.#settings.addMigrationSetting({ moduleId });
    }

    addMigration({
        moduleId,
        migration,
    }: {
        moduleId: string;
        migration: MigrationType;
    }): void {
        if (!this.#migrations[moduleId]) {
            this.#migrations[moduleId] = [];
        }

        this.#migrations[moduleId].push(migration);
    }

    addMigrations({
        moduleId,
        migrations,
    }: {
        moduleId: string;
        migrations: MigrationType[];
    }): void {
        for (const migration of migrations) {
            this.addMigration({ moduleId, migration });
        }
    }

    hasRan({ moduleId, key }: { moduleId: string; key: string }): boolean {
        const ranMigrations = this.#settings.getRanMigrations({ moduleId });
        return ranMigrations.includes(key);
    }

    async runAll({ moduleId }: { moduleId: string }): Promise<boolean> {
        try {
            const sortedMigrations = this.#migrations[moduleId].sort(
                (a, b) => a.date.getTime() - b.date.getTime(),
            );

            for (const migration of sortedMigrations) {
                if (this.hasRan({ moduleId, key: migration.key })) {
                    continue;
                }

                log(
                    `Running migration ${migration.key} for module ${moduleId}`,
                );

                const success = await migration.func();
                if (success) {
                    await this.#settings.addRanMigration({ moduleId, migration: migration.key });
                } else {
                    error(
                        `Failed to run migration ${migration.key} for module ${moduleId}. Halting migration process.`,
                    );
                    return false;
                }

                log(
                    `Successfully ran migration ${migration.key} for module ${moduleId}`,
                );
            }

            return true;
        } catch (e: any) {
            error(
                "Something went wrong while running migrations for module ${moduleId}: ${e}",
            );
            return false;
        }
    }

    async clearAllRan({ moduleId }: { moduleId: string }): Promise<void> {
        await this.#settings.clearRanMigrations({ moduleId });
    }

    getRanMigrations({ moduleId }: { moduleId: string }): string[] {
        return this.#settings.getRanMigrations({ moduleId });
    }
}

export { MigrationsImpl };
