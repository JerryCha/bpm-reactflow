import { useState } from 'react';
import './App.css';
import { AppShell, Header, Navbar } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { NavMenu } from './components/NavMenu';

function App() {
  return (
    <BrowserRouter>
      <AppShell
        padding='md'
        header={
          <Header height={60} p='md'>
            Universal BPM DEMO
          </Header>
        }
        navbar={
          <Navbar width={{ base: 180 }}>
            <NavMenu />
          </Navbar>
        }
      >
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
