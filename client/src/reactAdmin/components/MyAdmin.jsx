import { AdminUI, Authenticated, CustomRoutes, Resource } from 'react-admin';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import entities from '../../entities/entities';
import MyLayout from './MyLayout';
import SignUp from '../../custom-views/Signup';
import Scan from '../../custom-views/Reports/Scan';
import Invite from '../../custom-views/Reports/Invite';

// =======================================================
export default function MyAdmin() {
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem('user'))?.type || 'Admin'
  );
  useEffect(() => {
    window.addEventListener('login', () => {
      setType(JSON.parse(localStorage.getItem('user'))?.type || 'Admin');
    });
  }, []);
  return (
    <ToastProvider>
      <AdminUI layout={MyLayout} loginPage={<SignUp />}>
        {entities.map(({ label, ...rest }) => {
          if (label === 'User' && !['Admin', 'SuperAdmin'].includes(type)) {
            const { create, ...others } = rest;
            return <Resource key={label} option={{ label }} {...others} />;
          }
          if (label === 'Compound' && type !== 'SuperAdmin') {
            const { show, list, name } = rest;
            return (
              <Resource
                key={label}
                option={{ label }}
                show={show}
                list={list}
                name={name}
              />
            );
          }
          return <Resource key={label} option={{ label }} {...rest} />;
        })}
        <CustomRoutes>
          <Route
            path="/reports/scan"
            element={
              <Authenticated>
                <Scan />
              </Authenticated>
            }
          />

          <Route
            path="/reports/invite"
            element={
              <Authenticated>
                <Invite />{' '}
              </Authenticated>
            }
          />
        </CustomRoutes>
      </AdminUI>
    </ToastProvider>
  );
}
