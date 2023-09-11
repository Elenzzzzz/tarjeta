import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function CreditCardForm() {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const newErrors = {};
    if (!cardData.number) {
      newErrors.number = 'El número de tarjeta es obligatorio';
    }
    if (!cardData.name) {
      newErrors.name = 'El nombre en la tarjeta es obligatorio';
    }
    if (!cardData.expiry) {
      newErrors.expiry = 'La fecha de vencimiento es obligatoria';
    }
    if (!cardData.cvc) {
      newErrors.cvc = 'El CVC es obligatorio';
    }

    setErrors(newErrors);

    // Validación de la fecha de vencimiento (formato MM/YY)
    if (cardData.expiry) {
      const [month, year] = cardData.expiry.split('/');

      // Verifica si el mes está en el rango de 01 a 12
      if (!/^(0[1-9]|1[0-2])$/.test(month)) {
        newErrors.expiry = 'El mes de vencimiento es inválido';
      }

      // Verifica si el año es un número de 4 dígitos
      if (!/^\d{4}$/.test(year)) {
        newErrors.expiry = 'El año de vencimiento debe tener 4 dígitos';
      }

      // Verifica si el año es igual o posterior al año actual y hasta los próximos 11 años
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const parsedYear = parseInt(year, 10);

      if (
        parsedYear < currentYear ||
        (parsedYear === currentYear && parseInt(month, 10) < currentMonth)
      ) {
        newErrors.expiry = 'La fecha de vencimiento es inválida';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Envía el formulario o realiza otras acciones aquí.
    }
  };

  return (
    <div>
      <Cards {...cardData} focused={null} />

      <div className="credit-card-form">
        <h4>Ingrese los datos de su tarjeta de crédito</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Número de tarjeta:</label>
            <input
              type="text"
              name="number"
              value={cardData.number}
              onChange={handleInputChange}
              placeholder="Numero de tarjeta"
            />
            <p className="error">{errors.number}</p>
          </div>
          <div>
            <label>Nombre en la tarjeta:</label>
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={handleInputChange}
              placeholder="Ingrese su nombre"
            />
            <p className="error">{errors.name}</p>
          </div>
          <div>
            <label>Fecha de vencimiento:</label>
            <input
              type="text"
              name="expiry"
              value={cardData.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
            />
            <p className="error">{errors.expiry}</p>
          </div>
          <div>
            <label>CVC:</label>
            <input
              type="text"
              name="cvc"
              value={cardData.cvc}
              onChange={handleInputChange}
              placeholder="Ingrese CVC"
            />
            <p className="error">{errors.cvc}</p>
          </div>
          <div className="space">
            <button className="btn" type="submit">
              Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreditCardForm;
