import Rotas from './src/Routes';
import { AppContextProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <Rotas />
    </AppContextProvider>
  );
}