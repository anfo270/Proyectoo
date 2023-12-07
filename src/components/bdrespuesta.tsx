import { useEffect, useState } from 'react';
import { Citas } from '../interface/bdlista';
import { basedatos } from '../bd/bd';

const tableContainerStyle: React.CSSProperties = {
    margin: '20px',
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
};

const tableHeaderCellStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '2px solid #ddd',
    background: '#f4f4f4',
    fontWeight: 'bold',
    textAlign: 'left',
};

const tableBodyCellStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};

const buttonContainerStyle: React.CSSProperties = {
    marginTop: '10px',
};

export const Dbrespuesta: React.FC = () => {
    const [citas, setCitas] = useState<Citas[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [reloadKey, setReloadKey] = useState(0);

    const cargarCitas = async () => {
        try {
            const resp = await basedatos.get<Citas[]>(`/citaas`);
            // Ordenar las citas por fecha y hora de menor a mayor
            const citasOrdenadas = resp.data.sort((a, b) => {
                const fechaA = new Date(a.date + ' ' + a.time);
                const fechaB = new Date(b.date + ' ' + b.time);
                return fechaA.getTime() - fechaB.getTime();
            });
            setCitas(citasOrdenadas);
        } catch (error) {
            console.error('Error al cargar las citas:', error);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, [reloadKey]);

    const handleReload = () => {
        // Incrementar el valor de reloadKey para forzar la recarga
        setReloadKey((prev) => prev + 1);
    };

    const renderItem = (cita: Citas) => {
        const { _id, date, customerName, serviceType, time } = cita;
        return (
            <tr key={_id} style={tableBodyCellStyle}>
                <td>{customerName}</td>
                <td>{serviceType}</td>
                <td>{date.toString()}</td>
                <td>{time}</td>
            </tr>
        );
    };

    const handleNextCitas = () => {
        setStartIndex((prev) => prev + 10);
    };

    const handlePrevCitas = () => {
        setStartIndex((prev) => Math.max(prev - 10, 0));
    };

    const hasNextPage = startIndex + 10 < citas.length;
    const hasPrevPage = startIndex > 0;

    return (
        <div style={tableContainerStyle}>
            <div>
                <button onClick={handleReload}>Recargar</button>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={tableHeaderCellStyle}>Nombre del Cliente</th>
                        <th style={tableHeaderCellStyle}>Tipo de Servicio</th>
                        <th style={tableHeaderCellStyle}>Fecha</th>
                        <th style={tableHeaderCellStyle}>Hora</th>
                    </tr>
                </thead>
                <tbody>{citas.slice(startIndex, startIndex + 10).map(renderItem)}</tbody>
            </table>
            <div style={buttonContainerStyle}>
                <button onClick={handlePrevCitas} disabled={!hasPrevPage}>
                    Anteriores
                </button>
                <button onClick={handleNextCitas} disabled={!hasNextPage}>
                    Siguientes
                </button>
            </div>
        </div>
    );
};
