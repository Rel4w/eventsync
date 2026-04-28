'use client';

import { 
  List, Datagrid, TextField, DateField, NumberField, 
  EditButton, DeleteButton, Create, Edit, SimpleForm, 
  TextInput, DateTimeInput, NumberInput 
} from 'react-admin';

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Titre" />
      <TextField source="track" label="Track" />
      <TextField source="roomName" label="Salle" />
      <DateField source="startTime" label="Début" showTime />
      <DateField source="endTime" label="Fin" showTime />
      <NumberField source="capacity" label="Capacité" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" fullWidth />
      <TextInput source="description" label="Description" multiline fullWidth />
      <TextInput source="track" label="Track" />
      <TextInput source="roomName" label="Salle" />
      <DateTimeInput source="startTime" label="Début" />
      <DateTimeInput source="endTime" label="Fin" />
      <NumberInput source="capacity" label="Capacité" />
      <TextInput source="roomColor" label="Couleur Salle" />
      <TextInput source="tags" label="Tags" />
    </SimpleForm>
  </Edit>
);

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" fullWidth required />
      <TextInput source="description" label="Description" multiline fullWidth />
      <TextInput source="track" label="Track" />
      <TextInput source="roomName" label="Salle" />
      <DateTimeInput source="startTime" label="Début" required />
      <DateTimeInput source="endTime" label="Fin" required />
      <NumberInput source="capacity" label="Capacité" defaultValue={100} />
      <TextInput source="roomColor" label="Couleur Salle" defaultValue="#A8FF3E" />
      <TextInput source="tags" label="Tags" defaultValue="[]" />
    </SimpleForm>
  </Create>
);