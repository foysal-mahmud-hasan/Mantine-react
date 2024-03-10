import '../App.css'; // Assuming CSS file for layout adjustments
import {
    MantineProvider,
    AppShell,
    Grid,
    Burger,
    Center,
    Box,
    createTheme
} from '@mantine/core';
import { HeaderSimple } from '../HeaderSimple';
import { DoubleNavbar } from '../DoubleNavbar';
import MyForm from '../MyForm';
import { FooterCentered } from '../FooterCentered';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';

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
                <AppShell.Header p="md" >
                    <HeaderSimple />
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <DoubleNavbar />
                </AppShell.Navbar>
                <AppShell.Main p="md" className="content">
                    <Center>
                        <div style={{ width: "60%" }} className='form'>
                            <MyForm />
                        </div>
                    </Center>
                </AppShell.Main>
                <AppShell.Footer height={60} padding="md" pos="bottom">
                    <FooterCentered />
                </AppShell.Footer>
            </AppShell>


        </MantineProvider >
    );
}

export default App;
