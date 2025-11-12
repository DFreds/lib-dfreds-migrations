import { Listener } from "./index.ts";
import { MigrationsImpl } from "../migrations.ts";

const Setup: Listener = {
    listen(): void {
        Hooks.once("setup", () => {
            if (BUILD_MODE === "development") {
                CONFIG.debug.hooks = true;
            }

            MigrationsImpl.setup();
        });
    },
};

export { Setup };
