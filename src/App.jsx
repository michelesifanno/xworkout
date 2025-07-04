import { RouterProvider } from 'react-router-dom';
import router from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "./components/ui/provider";

export default function App() {
  return (
    <Provider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}
