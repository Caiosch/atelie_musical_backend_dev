import "./assets/fonts/default/stylesheet.css";
import "./styles/global.css";

import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import PreloadProvider from "./components/providers/PreloadProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import CommonRoutes from "./routes/Common.routes";
import { queryClient } from "./services/clients/query";
import AuthProvider from "./components/providers/AuthProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PreloadProvider />
        <ThemeProvider>
          <BrowserRouter>
            <CommonRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
