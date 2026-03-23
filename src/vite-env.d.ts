/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CARD_SIDE?: "bride" | "groom";
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_RSVP_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
