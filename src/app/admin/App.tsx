'use client';

import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';

import { SessionList, SessionEdit, SessionCreate } from './resources/sessions';

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    requireAuth
    title="EventSync Admin"
  >
    <Resource 
      name="sessions" 
      list={SessionList} 
      edit={SessionEdit} 
      create={SessionCreate} 
    />
    <Resource name="speakers" list={ListGuesser} edit={EditGuesser} />
    <Resource name="questions" list={ListGuesser} edit={EditGuesser} />
    <Resource name="users" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;