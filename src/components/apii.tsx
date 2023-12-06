import React, { useEffect, useState } from 'react';
import { reqResApi } from '../api/api';
import { ResReqListado } from '../interface/resreq';

const apiicontainer: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  margin: '20px 0', // Añadir margen
};

const apiitable: React.CSSProperties = {
  width: '100%',
};

const tableHeaderCell: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
  background: '#f4f4f4',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tableBodyCell: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
};

export const Apii: React.FC = () => {
  const [usuarios, setUsuarios] = useState<ResReqListado[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const cargarComentarios = async () => {
      try {
        const resp = await reqResApi.get<ResReqListado[]>(`/comments`);
        setUsuarios(resp.data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    cargarComentarios();
  }, []);

  const renderItem = (usuario: ResReqListado) => {
    const { id, body, name } = usuario;
    return (
      <tr key={id.toString()}>
        <td style={tableBodyCell}>{`${name}`}</td>
        <td style={tableBodyCell}>{body}</td>
      </tr>
    );
  };

  const handleNextComments = () => {
    setStartIndex((prev) => prev + 10);
  };

  const handlePrevComments = () => {
    setStartIndex((prev) => Math.max(prev - 10, 0));
  };

  return (
    <div style={apiicontainer}>
      <table style={apiitable}>
        <thead>
          <tr>
            <th style={tableHeaderCell}>Nombre</th>
            <th style={tableHeaderCell}>Comentario</th>
          </tr>
        </thead>
        <tbody>{usuarios.slice(startIndex, startIndex + 10).map(renderItem)}</tbody>
      </table>
      <div>
        <button onClick={handlePrevComments}>Anteriores</button>
        <button onClick={handleNextComments}>Siguientes</button>
      </div>
    </div>
  );
};
