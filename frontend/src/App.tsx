import { HashRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome!</h1>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
