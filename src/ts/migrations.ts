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
        // TODO this is where you should register settings

        Hooks.callAll("migrations.setup", window.migrations);
    }

    register({
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

    registerAll({
        moduleId,
        migrations,
    }: {
        moduleId: string;
        migrations: MigrationType[];
    }): void {
        for (const migration of migrations) {
            this.register(moduleId, migration);
        }
    }

    hasRan({ moduleId, key }: { moduleId: string; key: string }): boolean {
        // TODO this is where you should check if a migration has been run
        return false;
    }

    async runAll({ moduleId }: { moduleId: string }): Promise<boolean> {
        // TODO this is where you should run all migrations
        return false;
    }

    async run({
        moduleId,
        key,
    }: {
        moduleId: string;
        key: string;
    }): Promise<boolean> {
        // TODO this is where you should run a specific migration
        return false;
    }

    async clearAllRan({ moduleId }: { moduleId: string }): Promise<void> {
        // TODO this is where you should clear all ran migrations
    }

    async clearRan({
        moduleId,
        key,
    }: {
        moduleId: string;
        key: string;
    }): Promise<void> {
        // TODO this is where you should clear a ran migration
    }

    getRanMigrations({ moduleId }: { moduleId: string }): MigrationType[] {
        // TODO this is where you should get all ran migrations
        return [];
    }
}
