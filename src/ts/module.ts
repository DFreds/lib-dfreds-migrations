import "../styles/style.scss"; // Keep or else vite will not include this
import { HooksMigrations } from "./hooks/index.ts";
import { mySampleMigrationModule } from "./sample.ts";

HooksMigrations.listen();

if (BUILD_MODE === "development") {
    mySampleMigrationModule();
}
