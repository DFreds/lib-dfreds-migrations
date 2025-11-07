import "../styles/style.scss"; // Keep or else vite will not include this
import { HooksMigrations } from "./hooks/index.ts";

HooksMigrations.listen();
