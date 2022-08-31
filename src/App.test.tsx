import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe("with not parameters to setup", () => {
    it('throws "Exceeded timeout of 5000 ms for a test.', async () => {
      const callback = jest.fn();
      const user = userEvent.setup();

      render(<App callback={callback} />);

      await user.click(screen.getByRole("button"));

      expect(callback).toHaveBeenCalledWith(0);
    });
  });

  describe("with advabceTimers set to jest.advanceTimersByTime", () => {
    it("advances all timers too fast", async () => {
      const callback = jest.fn();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<App callback={callback} />);

      await user.click(screen.getByRole("button"));

      expect(callback).toHaveBeenCalledWith(0);
      expect(callback).not.toHaveBeenCalledWith(1);
    });
  });

  describe("with delay set to null", () => {
    it("allows to manage the timers on your own", async () => {
      const callback = jest.fn();
      const user = userEvent.setup({ delay: null });

      render(<App callback={callback} />);

      await user.click(screen.getByRole("button"));

      expect(callback).toHaveBeenCalledWith(0);
      expect(callback).not.toHaveBeenCalledWith(1);

      jest.runAllTimers();

      expect(callback).toHaveBeenCalledWith(1);
    });
  });
});
