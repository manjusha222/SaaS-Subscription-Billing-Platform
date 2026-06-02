import {render, screen,fireEvent} from "@testing-library/react";
import Register from "../pages/Register";
import { BrowserRouter } from "react-router-dom";
describe("Register component", ()=>{
    test("renders Register heading" ,()=>{
        render(
        <BrowserRouter>
        <Register/>
        </BrowserRouter>
        )
        const heading = screen.getByRole("heading",{name:"Register"}) 
        expect(heading).toBeInTheDocument;

    });
    test("updates email input value",()=>{
        render(
         <BrowserRouter>
         <Register/>
         </BrowserRouter>   
        )
        const emailInput = screen.getByPlaceholderText("Enter email");
        fireEvent.change(emailInput,{target: {value:"manju@gmail.com"}});
        expect(emailInput).toHaveValue("manju@gmail.com");
    });
});
