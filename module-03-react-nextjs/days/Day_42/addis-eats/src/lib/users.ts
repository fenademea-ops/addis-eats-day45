import "server-only";

import { scrypt, timingSafeEqual } from "node:crypto";

export type AccountRole = "customer" | "staff";

export type Account = {
  id: string;
  email: string;
  name: string;
  role: AccountRole;
  passwordSalt: string;
  passwordHash: string;
};

const demoAccounts: Account[] = [
  {
    id: "customer-a",
    email: "a@addiseats.local",
    name: "Customer A",
    role: "customer",
    passwordSalt: "8XZbtb_uwWF8D2G-GVCdig",
    passwordHash:
      "1q1VnRkyFRfJmv3pYH1kOmpbRW5M-gixmGrMu3mCLJ28fAWVIul08X8aLQQ1MiDu1GMQJn760dbbb3QK3QnFeQ",
  },
  {
    id: "customer-b",
    email: "b@addiseats.local",
    name: "Customer B",
    role: "customer",
    passwordSalt: "Evim4Kh0JIVLdmTWu80Eig",
    passwordHash:
      "wM7HnLWYJoP4ZKS-ykabxFaFhZgJEVqqzBJXAgf9gH42fb2ptz7seE-3Kr1dwoRajoIBARNKGQLU_OablMtLNA",
  },
  {
    id: "staff",
    email: "staff@addiseats.local",
    name: "Kitchen Staff",
    role: "staff",
    passwordSalt: "DNA6HAemM4iI2B5lCWNUzA",
    passwordHash:
      "N2Nm4J800cjIH8Sh-Se5HFE9uJHxGjSlNOEOtBCG8b_lz-YTDRTZG45kInm7amNlB6ttRFAsCcwK-J4L-elxUA",
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAccountRole(value: unknown): value is AccountRole {
  return value === "customer" || value === "staff";
}

function getConfiguredAccounts(): Account[] {
  const configuredAccounts = process.env.AUTH_USERS_JSON;
  if (!configuredAccounts) {
    return process.env.NODE_ENV === "production" ? [] : demoAccounts;
  }

  const parsed: unknown = JSON.parse(configuredAccounts);
  if (!Array.isArray(parsed)) {
    throw new Error("AUTH_USERS_JSON must contain an array of account records.");
  }

  const entries: unknown[] = parsed;
  const accounts: Account[] = [];
  for (const entry of entries) {
    if (
      !isRecord(entry) ||
      typeof entry.id !== "string" ||
      entry.id.length === 0 ||
      typeof entry.email !== "string" ||
      typeof entry.name !== "string" ||
      !isAccountRole(entry.role) ||
      typeof entry.passwordSalt !== "string" ||
      typeof entry.passwordHash !== "string" ||
      !/^[A-Za-z0-9_-]{20,32}$/.test(entry.passwordSalt) ||
      !/^[A-Za-z0-9_-]{86}$/.test(entry.passwordHash)
    ) {
      throw new Error("AUTH_USERS_JSON contains an invalid account record.");
    }

    accounts.push({
      id: entry.id,
      email: entry.email.trim().toLowerCase(),
      name: entry.name,
      role: entry.role,
      passwordSalt: entry.passwordSalt,
      passwordHash: entry.passwordHash,
    });
  }

  const ids = new Set(accounts.map((account) => account.id));
  const emails = new Set(accounts.map((account) => account.email));
  if (ids.size !== accounts.length || emails.size !== accounts.length) {
    throw new Error("AUTH_USERS_JSON account IDs and emails must be unique.");
  }

  return accounts;
}

export function getAccountById(id: string): Account | null {
  return getConfiguredAccounts().find((account) => account.id === id) ?? null;
}

function derivePasswordHash(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, Buffer.from(salt, "base64url"), 64, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key);
    });
  });
}

export async function authenticateAccount(
  email: string,
  password: string,
): Promise<Omit<Account, "passwordSalt" | "passwordHash"> | null> {
  if (email.length > 320 || password.length === 0 || password.length > 1024) {
    return null;
  }

  const account = getConfiguredAccounts().find(
    (candidate) => candidate.email === email.trim().toLowerCase(),
  );
  if (!account) {
    return null;
  }

  const actualHash = await derivePasswordHash(password, account.passwordSalt);
  const expectedHash = Buffer.from(account.passwordHash, "base64url");
  if (
    expectedHash.length !== actualHash.length ||
    !timingSafeEqual(expectedHash, actualHash)
  ) {
    return null;
  }

  return {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
  };
}
