// Keep or else Foundry globals like game and Hooks will not resolve
/// <reference types="@dfreds/foundry-types" />

import { HooksMigrations } from "./hooks/index.ts";
import { mySampleMigrationModule } from "./sample.ts";

HooksMigrations.listen();

if (BUILD_MODE === "development") {
    mySampleMigrationModule();
}
