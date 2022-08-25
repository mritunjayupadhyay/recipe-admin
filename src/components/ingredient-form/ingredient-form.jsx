import React, { useState } from 'react';
import Swal from "sweetalert2";
import './ingredient-form.scss';
import Button from '../button/Button';

function IngredientForm({ getIngredientFormData, formData, cancelFunc }) {
  const propName = formData?.name || '';
  const propDes = formData?.description || '';
  const propAmount = formData?.amount || '';
  const [name, setName] = useState(propName);
  const [description, setDescription] = useState(propDes);
  const [amount, setAmount] = useState(propAmount);
  // const [recipePic, setRecipePic] = useState('')

  const submitFunc = () => {
    if (!name) {
      Swal.fire({
        title: 'Name can not be empty',
        icon: 'error',
      });
    }
    if (!amount) {
      Swal.fire({
        title: 'Amount can not be empty',
        icon: 'error',
      });
    }
    return getIngredientFormData({
      name, description, amount,
      id: formData?.id
    });
  }
  return (
    <form className='IngredientFormComponent'>
      <div className="whiteContainerForm">
        <div className='component-heading'>
          <h1>{formData?.id ? 'Edit Ingredient' : 'Add Ingredient'}</h1>
        </div>
        <div className="form-container">
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type={"text"}
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={amount}
            placeholder="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className='buttonContainer'>
            <Button
              size={'small'}
              buttonText={'Cancel'}
              buttonType={'default'}
              onClickFunc={() => cancelFunc()}
            />
            <Button
              size={'small'}
              buttonText={'Add'}
              buttonType={'primary'}
              onClickFunc={() => submitFunc()}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default IngredientForm;