import {render,screen} from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
describe("Login component",()=>{
    test("renders Login heading", ()=>{
        render(
        <BrowserRouter>
        <Login/>
        </BrowserRouter>
    );
        const heading =screen.getByRole("heading",{name:"Login",});
        expect(heading).toBeInTheDocument();
    })

})