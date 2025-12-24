import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page"; // <--- The fix is here (was "~/pages")

describe("Home Page", () => {
	it("renders the heading", () => {
		render(<Home />);

		// Check if the heading we added earlier exists
		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
