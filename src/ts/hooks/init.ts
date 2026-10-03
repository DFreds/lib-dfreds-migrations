import { MigrationsImpl } from "../migrations.ts";
import { Listener } from "./index.ts";

const Init: Listener = {
    listen(): void {
        Hooks.once("init", () => {
            MigrationsImpl.init();
        });
    },
};

export { Init };
