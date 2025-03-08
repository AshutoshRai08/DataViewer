import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Routes } from "react-router-dom";
import TopNav from "./TopNav";

test("renders the navigation bar with title", () => {
  render(
    <Routes>
      <TopNav />
    </Routes>
  );
  expect(screen.getByText(/Data Viewer/i)).toBeInTheDocument();
//   expect(screen.getByText("Logout")).toBeInTheDocument();
});