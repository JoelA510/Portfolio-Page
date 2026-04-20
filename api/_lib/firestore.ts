import { Firestore } from "@google-cloud/firestore";

const projectId =
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  process.env.FIRESTORE_PROJECT_ID;

const useFirestore = process.env.USE_FIRESTORE === "true" && !!projectId;

let client: Firestore | null = null;

export function getFirestore(): Firestore | null {
  if (!useFirestore) return null;
  if (!client) {
    client = new Firestore({ projectId: projectId as string });
  }
  return client;
}

let warned = false;
export function logStoreMode() {
  if (warned) return;
  warned = true;
  if (useFirestore) {
    console.log(
      `[api] Firestore enabled for rate-limits + lock state (project: ${projectId})`,
    );
  } else {
    console.warn(
      "[api] Using in-memory stores. Fine for dev or a single Vercel function instance; " +
        "for durable rate-limit / lock state across restarts + regions set USE_FIRESTORE=true " +
        "(and provide GCP creds via GOOGLE_APPLICATION_CREDENTIALS or ADC).",
    );
  }
}
