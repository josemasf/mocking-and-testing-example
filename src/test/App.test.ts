import { render } from "@testing-library/vue";
import PrimeVue from "primevue/config";
import { describe, expect, it } from "vitest";
import App from "@/App.vue";
import router from "@/router";

describe("App", () => {
  describe("Rendering", () => {
    it("should have link to from Api", () => {
      const { getByText } = render(App, {
        global: {
          plugins: [PrimeVue, router],
        },
      });

      expect(getByText(/From api/i));
      expect(getByText(/default/i));
    });
  });
});
