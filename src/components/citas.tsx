import { useState } from 'react';
import './AppointmentSystem.css';

interface Appointment {
  date: string;
  time: string;
  customerName: string;
  serviceType: string;
}

const serviceTimes: { [key: string]: number } = {
  'Corte de cabello': 30,
  'Pintado de cabello': 90,
  'Peinado': 60,
  'Pintado de unas': 120,
};

const AppointmentSystem: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    date: '',
    time: '',
    customerName: '',
    serviceType: '',
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const isTimeSlotAvailable = (selectedTime: string): boolean => {
    const availableSlots: string[] = [];

    // Lógica para verificar la disponibilidad y actualizar availableSlots

    setAvailableTimeSlots(availableSlots);

    return !appointments.some(appointment => {
      const appointmentEndTime = new Date(appointment.date + 'T' + appointment.time);
      appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + serviceTimes[appointment.serviceType]);
      const selectedTimeEnd = new Date(newAppointment.date + 'T' + selectedTime);
      selectedTimeEnd.setMinutes(selectedTimeEnd.getMinutes() + serviceTimes[newAppointment.serviceType]);
      return (
        new Date(appointment.date + 'T' + appointment.time) <= selectedTimeEnd &&
        appointmentEndTime >= new Date(newAppointment.date + 'T' + selectedTime)
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleAddAppointment = async () => {
    if (
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.customerName &&
      newAppointment.serviceType
    )
      if (isTimeSlotAvailable(newAppointment.time)) {
        try {
          // Enviar la nueva cita al servidor

          alert('Cita agregada');
          setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
          setNewAppointment({
            date: '',
            time: '',
            customerName: '',
            serviceType: '',
          });
          await fetch('http://localhost:3001/citaas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
          });
          // Limpiar las horas disponibles después de agregar una cita
        } catch (error) {
          console.error('Error al agregar la cita:', error);
        }
      } else {
        alert('La hora seleccionada no esta disponible, favor de cambiarlo');
      }
  };

  return (
    <div className="appointment-system">
      <h1>Gestor de citas</h1>
      <div className="appointment-form">
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={newAppointment.date}
          onChange={handleInputChange}
        />
        <label>Hora:</label>
        <input
          type="time"
          name="time"
          value={newAppointment.time}
          onChange={handleInputChange}
        />
        {availableTimeSlots.length > 0 && (
          <div>
            <p>Horas disponibles:</p>
            <ul>
              {availableTimeSlots.map(slot => (
                <li key={slot}>{slot}</li>
              ))}
            </ul>
          </div>
        )}
        <label>Nombre y apellido del cliente:</label>
        <input
          type="text"
          name="customerName"
          value={newAppointment.customerName}
          onChange={handleInputChange}
        />
        <label >Tipo de servicio:</label>
        <select className="appointment-form"
          name="serviceType"
          value={newAppointment.serviceType}
          onChange={handleInputChange}
        >
          <option value="" >Seleccione el servicio que necesita</option>
          <option value="Corte de cabello">Corte de cabello (30 minutos aprox.)</option>
          <option value="Pintado de cabello">Pintado de cabello (1 hora y media aprox.)</option>
          <option value="Peinado">Peinado (1 hora aprox.)</option>
          <option value="Pintado de unas">Pintado de unas (2 horas aprox.)</option>
        </select>
        <br></br><br></br>
        <button onClick={handleAddAppointment}>Agregar cita</button>
      </div>

    </div>

  );
};

export default AppointmentSystem;


