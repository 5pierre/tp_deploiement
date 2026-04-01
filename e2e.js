

const http = require("http");
const app = require("./app");

const PORT = 3001; // Port dédié aux tests E2E
let server;

// Fonction utilitaire pour faire une requête HTTP
function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ status: res.statusCode, body: JSON.parse(data) });
      });
    }).on("error", reject);
  });
}

// Lancer le serveur avant les tests
server = app.listen(PORT, async () => {
  console.log("=== Tests E2E ===\n");
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ ${name}`);
      passed++;
    } catch (err) {
      console.log(`  ❌ ${name}`);
      console.log(`     → ${err.message}`);
      failed++;
    }
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  // Test 1 : Disponibilité de l'app via /health
  await test("L'application est disponible (GET /health)", async () => {
    const res = await get("/health");
    assert(res.status === 200, `Status attendu 200, reçu ${res.status}`);
    assert(res.body.status === "ok", `Body.status attendu "ok"`);
  });

  // Test 2 : Page d'accueil
  await test("GET / retourne un message", async () => {
    const res = await get("/");
    assert(res.status === 200, `Status attendu 200, reçu ${res.status}`);
    assert(res.body.message === "Hello World", `Message inattendu`);
  });

  // Test 3 : Fonctionnalité /add
  await test("GET /add calcule correctement 10 + 5 = 15", async () => {
    const res = await get("/add?a=10&b=5");
    assert(res.status === 200, `Status attendu 200, reçu ${res.status}`);
    assert(res.body.result === 15, `Résultat attendu 15, reçu ${res.body.result}`);
  });

  // Test 4 : Gestion d'erreur
  await test("GET /add avec paramètres invalides retourne 400", async () => {
    const res = await get("/add?a=abc&b=3");
    assert(res.status === 400, `Status attendu 400, reçu ${res.status}`);
  });

  // Résumé
  console.log(`\n=== Résultats : ${passed} passés, ${failed} échoués ===`);

  server.close();

  if (failed > 0) {
    process.exit(1); // Fait échouer la CI si un test échoue
  }
});