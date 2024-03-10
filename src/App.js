import './App.css';
import {
  MantineProvider,
  AppShell,
  createTheme,
  AppShellNavbar,
  AppShellMain,
} from '@mantine/core';
import { HeaderSimple } from './HeaderSimple';
import { DoubleNavbar } from './DoubleNavbar';
import MyForm from './MyForm';
import { FooterCentered } from './FooterCentered';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { Routes, Route } from 'react-router-dom'; // Import for routing
import LandingPage from './routes/LandinPage';
import BasicUsageExample from './components/BasicUsageExample';
import { ColumnPropertiesExample, NestedTables } from './components/Nested/Nested';

function App() {
  const [opened, { toggle }] = useDisclosure();

  const theme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    defaultRadius: 'md',
  });

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 70 }}
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        footer={{ height: 60, pos: 'bottom' }}
        padding="md"
      >

        <AppShell.Main className="content" style={{ disply: 'flex', alignItems: 'center' }}>
          <AppShell.Header p="md">
            <HeaderSimple />
          </AppShell.Header>
          <AppShellNavbar>
            <DoubleNavbar />
          </AppShellNavbar>
          <AppShellMain>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/form" element={<MyForm />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/table" element={<BasicUsageExample />} />
              <Route path="/nested-table" element={<ColumnPropertiesExample />} />
              <Route path="/table-expanded" element={<NestedTables />} />
            </Routes>

          </AppShellMain>


          <AppShell.Footer height={60} padding="md" pos="bottom">
            <FooterCentered />
          </AppShell.Footer>

        </AppShell.Main>
      </AppShell >
    </MantineProvider >
  );
}

export default App;
