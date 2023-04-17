import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <MantineProvider withNormalizeCSS>
        <QueryClientProvider client={client}>
          <Pages />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
