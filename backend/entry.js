// entry.js
// This wraps the import in an async function to bypass the "require" limitation
// for deploying typescript project to cPanel.
(async () => {
  try {
    await import("./dist/server.js");
    console.log("App loaded successfully from entry.js");
  } catch (err) {
    console.error("Failed to start app:", err);
  }
})();
