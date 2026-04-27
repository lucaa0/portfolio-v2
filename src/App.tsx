import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './components/Portfolio';

export default function App() {
  return (
    <PortfolioProvider>
      <Portfolio />
    </PortfolioProvider>
  );
}
