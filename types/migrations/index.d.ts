import { ApplicationV2 } from "types/foundry/client-esm/applications/_types.js";

export {};

declare global {
    interface Window {
        migrations: Migrations;
    }

    /**
     * The Migrations class
     */
    export interface Migrations {
        /**
         * Register a migration to the migrations list
         * @param moduleId The ID of the module registering the migration
         * @param migration The migration to register
         */
        register({moduleId, migration}: {moduleId: string, migration: MigrationType}): void;

        /**
         * Register multiple migrations to the migrations list
         * @param moduleId The ID of the module registering the migration
         * @param migrations The migrations to register
         */
        registerAll({moduleId, migrations}: {moduleId: string, migrations: MigrationType[]}): void;

        /**
         * Check if a migration has been run
         * @param moduleId The ID of the module registering the migration
         * @param key The key of the migration
         * @returns true if the migration has been run, false otherwise
         */
        hasRan({moduleId, key}: {moduleId: string, key: string}): boolean;

        /**
         * Run the migrations
         * @param moduleId The ID of the module registering the migrations
         * @returns true if all the migrations were successfully run, false otherwise
         */
        runAll({moduleId}: {moduleId: string}): Promise<boolean>;

        /**
         * Run a specific migration
         * @param moduleId The ID of the module registering the migrations
         * @param key The key of the migration
         * @returns true if the migration was successfully run, false otherwise
         */
        run({moduleId, key}: {moduleId: string, key: string}): Promise<boolean>;

        /**
         * Clear all ran migrations
         * @param moduleId The ID of the module registering the migrations
         */
        clearAllRan({moduleId}: {moduleId: string}): Promise<void>;

        /**
         * Clear a ran migration
         * @param moduleId The ID of the module registering the migrations
         * @param key The key of the migration
         */
        clearRan({moduleId, key}: {moduleId: string, key: string}): Promise<void>;

        /**
         * Get the ran migrations
         * @param moduleId The ID of the module registering the migrations
         * @returns the ran migrations
         */
        getRanMigrations({moduleId}: {moduleId: string}): MigrationType[];
    }

    export interface MigrationType {
        /**
         * The identifier for the migration. Successfully run migrations are saved
         * using this key
         */
        key: string;

        /**
         * The date of the migration. Migrations run from oldest to newest in order
         */
        date: Date;

        /**
         * The migration function
         */
        func: () => Promise<boolean>;
    }

    namespace Hooks {
        type HookParamsMigrationsInit = HookParameters<
            "migrations.init",
            Migrations
        >;
        type HookParamsMigrationsSetup = HookParameters<
            "migrations.setup",
            Migrations
        >;
        type HookParamsMigrationsRun = HookParameters<
            "migrations.run",
            MigrationType,
            boolean
        >;
        /**
         * Register a callback handler which should be triggered when a hook is triggered.
         *
         * @param hook The unique name of the hooked event
         * @param fn   The callback function which should be triggered when the hook event occurs
         */
        function on(...args: HookParamsMigrationsInit): number;
        function on(...args: HookParamsMigrationsSetup): number;
        function on(...args: HookParamsMigrationsRun): number;
        /**
         * Register a callback handler for an event which is only triggered once the first time the event occurs.
         * After a "once" hook is triggered the hook is automatically removed.
         *
         * @param hook  The unique name of the hooked event
         * @param fn    The callback function which should be triggered when the hook event occurs
         */
        function once(...args: HookParamsMigrationsInit): number;
        function once(...args: HookParamsMigrationsSetup): number;
        function once(...args: HookParamsMigrationsRun): number;
    }
}
