import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { navigationRouter } from '../../helpers/navigation-router';
import DropdownComponent from '../dropdown/Dropdown';
import './recipe-list-item.scss';
function RecipeListItem({ recipe, deleteRecipe }) {
  const clickAction = (text) => {
    if (text === 'edit') {
      navigationRouter.navigate(`${recipe?.id}/edit`)
    }
    else if (text === 'delete') {
      deleteRecipe(recipe?.id);
    }
  }
  return (
    <li className='RecipeListItem' key={recipe?.id}>
      <div className='recipe-item-container'>
          <span>{recipe?.name}</span>
      </div>
      <div className='recipe-item-container tabletView'>
        <span>{recipe?.description}</span>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <div className='recipe-item-container mobileView'>
      {/* <Link to={`${recipe?.id}/edit`}>Edit</Link> */}
      <DropdownComponent 
       title={'Actions'}
       list= {['Edit', 'Delete']}
       onClickFunc={(text) => clickAction(text)}
      />
      </div>
      <div className='recipe-item-container desktopView'>
        <Button
          buttonText={'Delete'}
          size="small"
          buttonType="danger"
          onClickFunc={() => clickAction('delete')}
        />
        <Button
          buttonText={'Edit'}
          size="small"
          buttonType="primary"
          onClickFunc={() => clickAction('edit')}
        />
      </div>
    </li>
  )
}

export default RecipeListItem