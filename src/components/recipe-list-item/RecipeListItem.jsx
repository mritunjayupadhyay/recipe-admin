import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { navigationRouter } from '../../helpers/navigation-router';
import DropdownComponent from '../dropdown/Dropdown';
import './recipe-list-item.scss';
import Checkbox from '../checkbox/Checkbox';
function RecipeListItem({ recipe, deleteRecipe, selectRecipe }) {
  const clickAction = (text) => {
    if (text.toLowerCase() === 'edit') {
      navigationRouter.navigate(`${recipe?.id}/edit`)
    }
    else if (text.toLowerCase() === 'delete') {
      deleteRecipe(recipe?.id);
    }
  }

  return (
    <li className='RecipeListItem' key={recipe?.id}>
      <div className='recipe-item-container'>
      <Checkbox
          title={''}
          name={recipe?.id} 
          handleCheckboxClick={(data) => selectRecipe(data)}
        />
      <div className='text-container'>
        
        <span>{recipe?.name}</span>
      </div>
      </div>
      <div className='recipe-item-container tabletView'>
        <div className='text-container'>
          <span>{recipe?.description}</span>
        </div>
      </div>
      <div className='recipe-item-container'
      >
        <div className="image-container"
            style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL_PREFIX}/${recipe?.recipePic})`}}
        >
          <Link to={`${recipe?.id}`}>
            {/* <img src={`${process.env.REACT_APP_S3_URL_PREFIX}/${recipe?.recipePic}`} alt="" /> */}
          </Link>
        </div>
      </div>
      <div className='recipe-item-container mobileView'>
        {/* <Link to={`${recipe?.id}/edit`}>Edit</Link> */}
        <DropdownComponent
          title={'Actions'}
          list={['Edit', 'Delete']}
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