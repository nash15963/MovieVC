import { render } from "@testing-library/react";
import App from "../src/App";

test("that jest is working", () => {
    render(<App />);
    expect(true).toBe(true);
});



// router 執行的過程來說，當使用者點擊頁面中的連結時，router 會改變，然後 render 出符合 path 的 component
// testing file