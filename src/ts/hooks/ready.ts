import { Listener } from "./index.ts";
import { MigrationsImpl } from "../migrations.ts";

const Ready: Listener = {
    listen(): void {
        Hooks.once("ready", () => {
            MigrationsImpl.ready();
        });
    },
};

export { Ready };
