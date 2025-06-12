import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Layout from "../../components/Layout";

vi.mock("../../components/Header", () => ({
  default: () => <div data-testid="mock-header"></div>,
}));

vi.mock("../../components/Footer", () => ({
  default: () => <div data-testid="mock-footer"></div>,
}));

it("deve renderizar o conteúdo filho", () => {
  const testContent = "Este é o conteúdo do teste";

  render(
    <Layout>
      <p>{testContent}</p>
    </Layout>
  );

  expect(screen.getByText(testContent)).toBeInTheDocument();
});