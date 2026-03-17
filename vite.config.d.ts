declare const _default: import("vite").UserConfigFnObject;
export default _default;
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
