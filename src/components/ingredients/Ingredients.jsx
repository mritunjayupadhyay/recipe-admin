import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsActions } from '../../store/ingredient.slice';
import IngredientShow from '../ingredient-show/IngredientShow';
import IngredientForm from '../ingredient-form/ingredient-form';
import Button from '../button/Button';
import './ingredient.scss';
import LoadingOne from '../loading/LoadingOne';

function Ingredients({ recipeId }) {
  const dispatch = useDispatch();

  // const [editIngredientId, setEditIngredientId] = useState(0);
  // const [createNew, setCreateNew] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(ingredientsActions.getIngredients(recipeId));
    // eslint-disable-next-line
  }, [recipeId]);

  const deleteIngredient = (ingredientId) => {
    return dispatch(ingredientsActions.deleteIngredient({ recipeId, ingredientId }));
  }
  const createIngredientForm = (booleanValue) => {
    return dispatch(ingredientsActions.readyToCreate(booleanValue));
  }
  const editIngredientForm = (ingredientId) => {
    return dispatch(ingredientsActions.readyToEdit(ingredientId));
  }

  // const editIngredient = (ingredientId) => {
  //   setEditIngredientId(ingredientId);
  // }

  const getIngredientFormData = (formData) => {
    console.log("only edit is remaining", formData)
    if (formData.id) {
      return dispatch(ingredientsActions.editIngredient({
        recipeId: recipeId,
        ingredientId: formData.id,
        formData
      }));
    }
    return dispatch(ingredientsActions.createIngredient({
      recipeId: recipeId,
      formData
    }));
  }

  const { ingredients, readyToCreate, readyToEdit, loading } = useSelector(x => x.ingredients);

  return (
    <div className='IngredientComponent'>
      <div className="whiteContainer">
      {loading && <LoadingOne />}
        <div className='component-heading'>
          <h1>Ingredients</h1>
        </div>
        <div className='ingredient-list-container'>
          {ingredients?.length ?
            <ul className='ingredient-list'>
              {ingredients.map(ingredient =>
                <li className='ingredient-list-item' key={ingredient?.id}>
                  {ingredient.id === readyToEdit
                    ? <IngredientForm
                      getIngredientFormData={getIngredientFormData}
                      formData={{
                        name: ingredient?.name,
                        description: ingredient?.description,
                        amount: ingredient?.amount,
                        id: ingredient?.id
                      }}
                      cancelFunc={() => editIngredientForm(0)}
                      />
                    : <IngredientShow
                      ingredient={ingredient}
                      editIngredient={(ingredientId) => editIngredientForm(ingredientId)}
                      deleteIngredient={(ingredientId) => deleteIngredient(ingredientId)}
                    />}
                </li>
              )}
            </ul>
            : null
          }
          <div className="create-ingredient-container">
          {readyToCreate
            ? <IngredientForm
              cancelFunc={() => createIngredientForm(false)}
              getIngredientFormData={getIngredientFormData}
            />
            : <Button
              size={'large'}
              buttonText={'Add Ingredient'}
              buttonType={'primary'}
              onClickFunc={() => createIngredientForm(true)}
            />
          }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Ingredients;