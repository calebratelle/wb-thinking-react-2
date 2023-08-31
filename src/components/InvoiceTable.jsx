import { useState } from 'react';
import formatCurrency from '../utils/formatCurrency.js';
import idGenerator from '../utils/idGenerator.js';
import './InvoiceTable.css';

const getId = idGenerator(4); // start at 4 because we already have 4 rows of test data

function InvoiceTableHeader() {
  return (
    <tr>
      <th></th>
      <th>Description</th>
      <th>Rate</th>
      <th>Hours</th>
      <th>Amount</th>
    </tr>
  );
}

function EditableRowModeButtons({ isEditing, onEditClick, onSaveClick, onDeleteClick }) {
  return isEditing ? (
    <td>
      <button onClick={onSaveClick}>Save</button>
    </td>
  ) : (
    <td>
      <button onClick={onDeleteClick}>Delete</button>
      <button onClick={onEditClick}>Edit</button>
    </td>
  );
}

function EditableDescriptionCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  );
}

function EditableRateCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      $<input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
      /hr
    </td>
  ) : (
    <td>{formatCurrency(value)}/hr</td>
  );
}

function EditableHoursCell({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <td>
      <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  );
}

function InvoiceTableRow({ initialInvoiceData, initialIsEditing, onDeleteRow }) {
  const [isEditing, setIsEditing] = useState(initialIsEditing);

  const [description, setDescription] = useState(initialInvoiceData.description);
  const [rate, setRate] = useState(initialInvoiceData.rate);
  const [hours, setHours] = useState(initialInvoiceData.hours);

  const setEditMode = () => setIsEditing(true);
  const setNormalMode = () => setIsEditing(false);

  return (
    <tr>
      <EditableRowModeButtons
        isEditing={isEditing}
        onEditClick={setEditMode}
        onSaveClick={setNormalMode}
        onDeleteClick={onDeleteRow}
      />
      <EditableDescriptionCell
        value={description}
        isEditing={isEditing}
        onValueChange={setDescription}
      />
      <EditableRateCell value={rate} isEditing={isEditing} onValueChange={setRate} />
      <EditableHoursCell value={hours} isEditing={isEditing} onValueChange={setHours} />
      <td>{formatCurrency(rate * hours)}</td>
    </tr>
  );
}

function InvoiceTableAddButton({ onClick }) {
  return (
    <tr>
      <td></td>
      <td colSpan="4">
        <button onClick={onClick}>Add</button>
      </td>
    </tr>
  );
}

function InvoiceTable({ initialInvoiceList }) {
  const [invoiceList, setInvoiceList] = useState(initialInvoiceList);

  const addInvoiceRow = () => {
    const newInvoiceList = [...invoiceList];
    newInvoiceList.push({
      id: getId.next().value,
      description: 'Description',
      rate: '',
      hours: '',
      isEditing: true,
    });
    setInvoiceList(newInvoiceList);
  };

  const deleteInvoiceRow = (id) => {
    const newInvoiceList = [...invoiceList];
    const index = newInvoiceList.findIndex((invoice) => invoice.id === id);
    newInvoiceList.splice(index, 1);
    setInvoiceList(newInvoiceList);
  };

  const rows = invoiceList.map(({ id, description, rate, hours, isEditing }) => (
    <InvoiceTableRow
      key={id}
      initialInvoiceData={{ description, rate, hours }}
      initialIsEditing={isEditing}
      onDeleteRow={() => deleteInvoiceRow(id)}
    />
  ));

  return (
    <table>
      <thead>
        <InvoiceTableHeader />
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <InvoiceTableAddButton onClick={addInvoiceRow} />
      </tfoot>
    </table>
  );
}

export default InvoiceTable;
