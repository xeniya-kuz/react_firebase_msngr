import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "../Button";

describe("Button tests", () => {
    it("matches snaphot", () => {
        const result = render(<Button onClick={() => { }} />);

        expect(result).toMatchSnapshot();
    });

    it("calls onClick when btn clicked", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick} type='button' />);

        const btn = screen.getByRole("button");
        fireEvent(
            btn,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});