import { fireEvent, render, waitFor } from "@testing-library/vue";
import PrimeVue from "primevue/config";
import { describe, expect, it } from "vitest";
import FromApiView from "../FromApiView.vue";
import { rest } from "../../mocks/handlers";
import { server } from "@/mocks/server";

describe("FromApiView", () => {
  describe("Rendering", () => {
    it("should print url api", () => {
      const { getByText } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      expect(getByText(/URL API:/i));
    });

    it("should has a table", async () => {
      const { getAllByRole } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      expect(getAllByRole("table")[0]);
    });

    it("should has data", async () => {
      const { getByText } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      await waitFor(() => expect(getByText("James Butt")));
    });

    it("should render no data", async () => {
      server.use(
        rest.get("/api/data", (req, res, context) => {
          return res(context.status(404));
        })
      );

      const { getByText } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      await waitFor(() => expect(getByText("No customers found.")));
    });

    it("should has searcher input", async () => {
      const { getByPlaceholderText } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });
      await waitFor(() => expect(getByPlaceholderText("Keyword Search")));
    });
  });
  describe("Searching", () => {
    it("should search", async () => {
      const { getByPlaceholderText, getByText } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      await waitFor(async () => {
        getByText("Art Venere");
        const input = getByPlaceholderText("Keyword Search");
        await fireEvent.update(input, "James Butt");
        getByText("Showing 1 to 1 of 1 entries");
      });
    });
  });
  describe("Select customer", () => {
    it("should be selectable by row", async () => {
      const { getByText, getAllByRole } = render(FromApiView, {
        global: {
          plugins: [PrimeVue],
        },
      });

      await waitFor(
        async () => {
          expect(getByText(/Selected customers: 0/i));
          const check = getAllByRole("checkbox");

          await fireEvent.click(check[1]);
          await fireEvent.click(check[2]);

          expect(getByText(/Selected customers: 2/i));
        },
        { timeout: 2000 }
      );
    });
  });
  describe("Filtering", () => {
    it("should filter using heading", async () => {
      const { getByPlaceholderText, getByText, getAllByRole, getByLabelText } =
        render(FromApiView, {
          global: {
            plugins: [PrimeVue],
          },
        });

      const buttons = getAllByRole("button");
      await waitFor(async () => {
        await fireEvent.click(buttons[1]);

        const input = getByPlaceholderText("Search by country");

        await fireEvent.update(input, "Algeria");

        const buttonApply = getByLabelText("Apply");

        await fireEvent.click(buttonApply);
        getByText("Showing 1 to 1 of 1 entries");
      });
    });
  });
});
