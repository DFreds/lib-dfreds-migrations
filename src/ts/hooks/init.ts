import { MigrationsImpl } from "../migrations.ts";
import { Settings } from "../settings.ts";
import { Listener } from "./index.ts";

const Init: Listener = {
    listen(): void {
        Hooks.once("init", () => {
            new Settings().register();
            MigrationsImpl.init();
        });
    },
};

export { Init };
