"use strict";

const os = require("node:os");
const { spawn } = require("node:child_process");
const nextCli = require.resolve("next/dist/bin/next");

const addresses = Object.entries(os.networkInterfaces()).flatMap(
  ([name, interfaces]) =>
    (interfaces ?? [])
      .filter(
        (networkInterface) =>
          (networkInterface.family === "IPv4" || networkInterface.family === 4) &&
          !networkInterface.internal,
      )
      .map((networkInterface) => ({ name, address: networkInterface.address })),
);
const lanAddress =
  addresses.find(({ name }) => /wi-?fi|wlan/i.test(name))?.address ??
  addresses[0]?.address;

const next = spawn(
  process.execPath,
  [nextCli, "dev", "--hostname", "0.0.0.0", ...process.argv.slice(2)],
  { stdio: ["inherit", "pipe", "inherit"] },
);

let pending = "";
next.stdout.setEncoding("utf8");
next.stdout.on("data", (chunk) => {
  pending += chunk;
  const lines = pending.split(/(?<=\n)/);
  pending = lines.pop() ?? "";
  for (const line of lines) {
    process.stdout.write(
      lanAddress
        ? line.replace(/http:\/\/0\.0\.0\.0:(\d+)/g, `http://${lanAddress}:$1`)
        : line,
    );
  }
});
next.stdout.on("end", () => {
  if (pending) {
    process.stdout.write(
      lanAddress
        ? pending.replace(/http:\/\/0\.0\.0\.0:(\d+)/g, `http://${lanAddress}:$1`)
        : pending,
    );
  }
});
next.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
next.on("exit", (code) => {
  process.exitCode = code ?? 1;
});