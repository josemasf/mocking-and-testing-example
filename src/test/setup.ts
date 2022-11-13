import { server } from "@/mocks/server";
import { afterAll, beforeAll, afterEach } from "vitest";

// Start server before all tests
beforeAll(() => {
  /*
  PARA EVITAR CONFLICTOS CON MODO JSS ACTIVAMOS EL SERVIDOR SOLO EN MODO msw  
  */
  if (import.meta.env.MODE === "msw") {
    server.listen({ onUnhandledRequest: "error" });
  }
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
