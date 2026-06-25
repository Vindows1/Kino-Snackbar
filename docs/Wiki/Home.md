# Kino-Snackbar — Developer Wiki

## Project Overview & Purpose
Kino-Snackbar is a small snack-ordering demo for a cinema environment. It provides:
- A frontend UI (TypeScript/React or similar) for browsing snacks and drinks and managing a cart.
- A small Java (Spring Boot) backend that exposes REST endpoints to list products and create/persist orders.
- An embedded H2 database (data/meine_db.*) for quick local demos.

The goal is to be easy to run locally, easy to extend (new products/categories), and suitable as a learning project for full-stack development.

---

## Stack
- Language(s): Java (backend), TypeScript (frontend), CSS, JavaScript, HTML
- Frameworks / runtimes: Spring Boot (backend, Maven), Node/npm-based frontend (TypeScript)
- Notable libraries: Spring Data / JPA, H2 (embedded DB), Lombok

---

## Architecture & Project Structure

Top-level layout (annotated):

```
README.md
frontend/
  learning-fronted/                # Frontend app (TS/React or similar) — inspect src/ here
  package-lock.json
data/
  meine_db.mv.db                   # H2 DB file
  meine_db.lock.db
  meine_db.trace.db
learning/
  pom.xml
  mvnw, mvnw.cmd
  src/
    main/
      java/
        com/example/learning/
          LearningApplication.java
          controller/               # REST controllers (SnacksController, GetraenkeController, BestellungController, AuthController, TestController)
          dto/                      # DTOs (BestellungDTO, BestellPositionDTO, NeueBestellungRequest, etc.)
          model/                    # JPA entities (Snacks, Getraenke, Bestellung, BestellPosition, AppUser, SecurityUser)
          repository/               # Spring Data repositories (SnacksRepository, GetraenkeRepository, BestellungRepository, etc.)
          service/                  # (optional) additional business logic
      resources/                    # application.properties (db & server config)
.idea/                              # IDE files (ignore)
```

How it fits together (runtime shape)
- Frontend calls backend REST endpoints for product lists and order submission.
- Backend controllers map incoming requests to DTOs, use repositories to read/write the H2 database, and return DTOs to the frontend.
- Orders are persisted to the H2 files in data/.

---

## Key files / entry points (examples)

- Backend Spring Boot main:
  - learning/src/main/java/com/example/learning/LearningApplication.java

- Controllers:
  - learning/src/main/java/com/example/learning/controller/SnacksController.java
  - learning/src/main/java/com/example/learning/controller/GetraenkeController.java
  - learning/src/main/java/com/example/learning/controller/BestellungController.java

- Entities:
  - learning/src/main/java/com/example/learning/model/Snacks.java
  - learning/src/main/java/com/example/learning/model/Getraenke.java
  - learning/src/main/java/com/example/learning/model/Bestellung.java
  - learning/src/main/java/com/example/learning/model/BestellPosition.java

- Data:
  - data/meine_db.mv.db
  - data/meine_db.lock.db
  - data/meine_db.trace.db

---

## Core Features & How They Work

### Product listing (snacks & drinks)
- Endpoints:
  - GET /snacks/all — returns all snack products.
  - GET /getraenke/all — returns all drinks.

Representative controller code (returns DTOs mapped from JPA entities):

```java
@RestController
public class SnacksController {
    @Autowired
    private SnacksRepository snacksRepository;
    @GetMapping("/snacks/all")
    public ResponseEntity<List<SnacksDTO>> GetAllSnacks(){
        return ResponseEntity.ok(snacksRepository.findAll().stream().map(SnacksDTO::new).toList());
    }
}
```

```java
@RestController
public class GetraenkeController {
    @Autowired
    private GetraenkeRepository getraenkeRepository;
    @GetMapping("/getraenke/all")
    public ResponseEntity<List<GetraenkeDTO>>GetAllGetraenke(){
        return ResponseEntity.ok(getraenkeRepository.findAll().stream().map(GetraenkeDTO::new).toList());
    }
}
```

Entities (table ↔ entity examples):

```java
@Data
@Entity
@Table(name = "snacks")
public class Snacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, nullable = false, updatable = false)
    private UUID publicId;

    private String name;
    private int preis;
}
```

```java
@Data
@Entity
@Table(name = "getraenke")
public class Getraenke {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, nullable = false, updatable = false)
    private UUID publicId;

    private String name;
    private float groeße;
    private float preis;
}
```

### Orders (checkout)
- Endpoint to create an order: POST /bestellungen/add
- Endpoints to query orders:
  - GET /bestellungen/{publicId}
  - GET /bestellungen/all

The `BestellungController` accepts a `NeueBestellungRequest` DTO, iterates the request position list, maps each position either to a `Getraenke` or `Snacks` entity (based on `typ` == "GETRAENK" or "SNACK"), builds `BestellPosition` entities, appends them to a new `Bestellung`, and finally saves using `BestellungRepository`.

Representative code (order creation logic):

```java
@PostMapping("/bestellungen/add")
public ResponseEntity<BestellungDTO> createBestellung(@RequestBody NeueBestellungRequest request) {
    Bestellung neueBestellung = new Bestellung();

    for (NeueBestellungRequest.PositionRequest posReq : request.getPositionen()) {
        if (posReq.getMenge() <= 0) continue;
        if (posReq.getProduktId() == null) continue;

        BestellPosition position = new BestellPosition();
        position.setMenge(posReq.getMenge());
        position.setBestellung(neueBestellung);

        try {
            UUID produktUuid = UUID.fromString(posReq.getProduktId());

            if ("GETRAENK".equals(posReq.getTyp())) {
                Getraenke g = getraenkeRepository.findByPublicId(produktUuid);
                position.setGetraenk(g);
            } else if ("SNACK".equals(posReq.getTyp())) {
                Snacks s = snacksRepository.findByPublicId(produktUuid);
                position.setSnack(s);
            }

            neueBestellung.getPositionen().add(position);
        } catch (IllegalArgumentException e) {
            // invalid UUID, skip
        }
    }

    bestellungRepository.save(neueBestellung);
    return ResponseEntity.ok().build();
}
```

Entity for orders:

```java
@Data
@Entity
@Table(name = "bestellung")
public class Bestellung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    @Column(updatable = false)
    private OffsetDateTime erstellt_am;

    @Column(unique = true, nullable = false)
    private String publicId = java.util.UUID.randomUUID().toString();

    @OneToMany(mappedBy = "bestellung", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BestellPosition> positionen = new ArrayList<>();
}
```

---

## Code Flow Example

"What happens code-wise when a user adds popcorn to the cart and checks out?"

1. Frontend: user clicks "Add" on a snack. The frontend updates local cart state (client side).
   - (Frontend code location) frontend/learning-fronted/src/... (component name depends on the frontend app; search for Cart or ProductCard).
2. When user chooses Checkout, frontend composes an order DTO and calls:
   - POST /bestellungen/add
   - Example request body (shape used by controller):
     ```json
     {
       "positionen": [
         { "produktId": "e.g. UUID-string-of-snack", "typ": "SNACK", "menge": 2 },
         { "produktId": "UUID-of-drink", "typ": "GETRAENK", "menge": 1 }
       ]
     }
     ```
3. Backend: `BestellungController.createBestellung(...)` receives the DTO, builds a `Bestellung` entity, converts each position to a `BestellPosition` referencing a `Snacks` or `Getraenke` entity by publicId, and persists the whole order using `BestellungRepository`.
4. Backend returns a response (currently 200 OK after save). The order can be fetched by its `publicId` at GET /bestellungen/{publicId}.

---

## Configuration & Environment

Important files to inspect/edit:
- Backend:
  - learning/pom.xml — Maven dependencies
  - learning/src/main/resources/application.properties — Spring Boot and datasource settings
  - learning/mvnw, mvnw.cmd — Maven wrappers

- Frontend:
  - frontend/learning-fronted/package.json — scripts (install/start/build)
  - frontend/learning-fronted/.env or config (if present) — API base URL settings

Database files:
- The repository currently contains H2 DB files under `data/`:
  - data/meine_db.mv.db
  - data/meine_db.lock.db
  - data/meine_db.trace.db

Typical datasource configuration to look for in application.properties (adjust if the file differs):

```
spring.datasource.url=jdbc:h2:file:./data/meine_db;AUTO_SERVER=TRUE
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

Environment variables you may want to expose:
- FRONTEND
  - REACT_APP_API_BASE_URL (or equivalent) — e.g. http://localhost:8080
- BACKEND
  - SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD
  - SERVER_PORT (or spring.server.port) — 8080 default

How to run locally (quick path)
- Backend:
  ```bash
  cd learning
  ./mvnw spring-boot:run
  # On Windows:
  # mvnw.cmd spring-boot:run
  ```
- Frontend (example):
  ```bash
  cd frontend/learning-fronted
  npm ci
  npm start
  ```
Open frontend dev server (commonly http://localhost:3000) and ensure API base URL points to the backend (http://localhost:8080).

Resetting DB for fresh seed:
- Stop backend, delete the files in `data/` and restart the backend (if `ddl-auto=update` or schema initialization is configured, tables will be recreated). Consider migrating to seed SQL scripts for reproducibility.

---

## Future Expansion Tips

Adding new snack categories / product types
- Data model:
  - Option A (simple): add `category` String field to `Snacks` and `Getraenke`.
    - Edit: learning/src/main/java/com/example/learning/model/Snacks.java
  - Option B (normalized): add `ProductCategory` entity and a FK in `products`.
- Backend:
  - Add repository (e.g., `CategoryRepository`) and controller endpoint(s):
    - GET /categories, POST /categories
  - Update product DTOs to include category info.
- Frontend:
  - Add a category filter component and update product list to call GET /snacks/all?category=<name> or filter client-side.
  - Keep product card generic — support additional fields (size, options, images) via DTOs.

Where to add new logic:
- Business logic: learning/src/main/java/com/example/learning/service/
- REST endpoints: learning/src/main/java/com/example/learning/controller/
- Persistence: learning/src/main/java/com/example/learning/repository/ and model/

Testing & CI
- Backend unit and integration tests — add under learning/src/test/java/
- Frontend unit tests — add under frontend/learning-fronted/src/__tests__/
- Add a GitHub Actions workflow to run `./mvnw -DskipTests=false test` and `npm ci && npm test` on PRs.

Production hardening suggestions
- Replace embedded H2 with Postgres/MySQL and externalize DB config.
- Add authentication/authorization (AuthController exists — inspect it).
- Add input validation and explicit error responses for endpoints.
- Add DB migrations (Flyway/Liquibase) instead of relying on `hibernate.ddl-auto=update`.
- Do not commit runtime DB files to the repo — replace with seed SQL and .gitignore the data/*.mv.db files.

---

## API Reference (quick)

- GET /snacks/all
  - Returns: List<SnacksDTO>
  - Implementation: learning/src/main/java/com/example/learning/controller/SnacksController.java

- GET /getraenke/all
  - Returns: List<GetraenkeDTO>
  - Implementation: learning/src/main/java/com/example/learning/controller/GetraenkeController.java

- POST /bestellungen/add
  - Accepts: NeueBestellungRequest (JSON)
  - Behavior: creates Bestellung with BestellPosition(s) by mapping produktId + typ to entities
  - Implementation: learning/src/main/java/com/example/learning/controller/BestellungController.java

- GET /bestellungen/{publicId}
  - Returns: BestellungDTO
  - Implementation: learning/src/main/java/com/example/learning/controller/BestellungController.java

- GET /bestellungen/all
  - Returns: List<BestellungDTO>
  - Implementation: learning/src/main/java/com/example/learning/controller/BestellungController.java

---

## Useful Code References (open these for details)

- Bestellung controller (order handling):
  - https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/controller/BestellungController.java

- Snacks controller (snacks listing):
  - https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/controller/SnacksController.java

- Getraenke controller (drinks listing):
  - https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/controller/GetraenkeController.java

- Entity examples:
  - Snacks.java — https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/model/Snacks.java
  - Getraenke.java — https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/model/Getraenke.java
  - Bestellung.java — https://github.com/Vindows1/Kino-Snackbar/blob/main/learning/src/main/java/com/example/learning/model/Bestellung.java

---

## Onboarding checklist for new contributors
- [ ] Clone repo and run backend: `cd learning && ./mvnw spring-boot:run`.
- [ ] Run frontend dev server: `cd frontend/learning-fronted && npm ci && npm start`.
- [ ] Use Postman or curl to test:
  - GET http://localhost:8080/snacks/all
  - GET http://localhost:8080/getraenke/all
  - POST http://localhost:8080/bestellungen/add with the JSON shape described above.
- [ ] Inspect `learning/src/main/resources` for app properties and DB settings.
- [ ] Read controllers and DTOs under `learning/src/main/java/com/example/learning/controller` and `dto`.

---

If you'd like, I can:
- Create this as a `Home.md` file in the repository's wiki or a Markdown file in the repo (paste-ready).
- Add a small "Frontend quick reference" section after I scan frontend/learning-fronted/src to extract actual component names and the cart implementation.
- Draft Flyway migration and a small category API and frontend filter component to demonstrate extensibility.
