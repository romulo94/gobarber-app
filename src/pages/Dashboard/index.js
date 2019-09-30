import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointmets, setAppointments] = useState([]);

  const loadAppointments = useCallback(async () => {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, loadAppointments]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointmets.map(appointmet =>
        appointmet.id === id
          ? {
              ...appointmet,
              canceled_at: response.data.canceled_at,
            }
          : appointmet
      )
    );
    loadAppointments();
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointmets}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
