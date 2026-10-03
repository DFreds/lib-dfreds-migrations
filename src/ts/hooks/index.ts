import { HotReload } from "./hot-reload.ts";
import { Init } from "./init.ts";
import { Setup } from "./setup.ts";
import { Ready } from "./ready.ts";

interface Listener {
    listen(): void;
}

const HooksMigrations: Listener = {
    listen(): void {
        const listeners: Listener[] = [HotReload, Init, Setup, Ready];

        for (const listener of listeners) {
            listener.listen();
        }
    },
};

export { HooksMigrations };
export type { Listener };
