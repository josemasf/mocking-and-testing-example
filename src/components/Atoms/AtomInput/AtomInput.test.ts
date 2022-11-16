import { AtomInput } from "@/components/";
import { render, fireEvent } from "@testing-library/vue";

import { describe, expect, it } from "vitest";

describe("suite AtomInput", () => {
  it("component exists", () => {
    expect(AtomInput).toBeTruthy();
  });

  it("component should render default", async () => {
    const { getByText } = render(AtomInput, {
      props: {
        label: "Text label",
        value: "",
      },
    });
    getByText("Text label");
  });

  it("component should render with placeholder", async () => {
    const { getByPlaceholderText } = render(AtomInput, {
      props: {
        placeholder: "Placeholder text",
        value: "",
      },
    });
    getByPlaceholderText("Placeholder text");
  });

  it("component should be disabled", async () => {
    const { getByRole, emitted } = render(AtomInput, {
      props: { label: "Text label", value: "", disabled: true },
    });

    const input = getByRole("textbox");

    await fireEvent.click(input);
    expect(emitted()).toContain({});
  });

  it("component should change value", async () => {
    const { getByRole, getByDisplayValue } = render(AtomInput, {
      props: { label: "Text label", value: "" },
    });

    const input = getByRole("textbox");

    await fireEvent.update(input, "new value");
    getByDisplayValue("new value");
  });
});
