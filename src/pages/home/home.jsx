import React, { useEffect, useState } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import QRCode from 'qrcode';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import LoadingOne from '../../components/loading/LoadingOne';
import RecipeListItem from '../../components/recipe-list-item/RecipeListItem';
import { navigationRouter } from '../../helpers/navigation-router';
import { recipesActions } from '../../store/recipe.slice';
import './home.scss';

function Home() {
    const dispatch = useDispatch();
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const { recipes, loading } = useSelector(x => x.recipes);
    const deleteRecipe = (recipeId) => {
        return dispatch(recipesActions.deleteRecipe(recipeId));
    }
    const selectRecipe = (data) => {
        if (data.value === true) {
            if (!selectedRecipes.includes(data.id)) {
                const arr = [...selectedRecipes, data.id]
                setSelectedRecipes(arr);
            }
        } else {
            if (selectedRecipes.includes(data.id)) {
                const arr = selectedRecipes.filter((r) => r !== data.id);
                setSelectedRecipes(arr);
            }
        }
    }
    const createRecipe = () => {
        navigationRouter.navigate('/create')
    }
    const printQr = async () => {
        console.log("selected recipes", selectedRecipes);
        if (selectedRecipes.length === 0) {
            Swal.fire({
                title: 'No recipe is selected',
                icon: 'error',
              });
        }
        const urls = selectedRecipes.map((recipeId) => `recipe/${recipeId}`);
        const images = await Promise.all(
            urls.map((url) =>
                QRCode.toString(url, {
                    margin: 2
                })
            )
        );
    
        // download svg
        images.forEach((image, index) => {
            saveSvg(image, `${selectedRecipes[index]}.svg`);
        });
    }

    // Qr code generation
    function saveSvg(svg, name) {
        const svgElement = htmlToElement(svg);
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgElement.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }


    useEffect(() => {
        dispatch(recipesActions.getRecipes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="HomePage">
            <Container>
                <div className='component-heading'>
                    <h1>Recipe List</h1>
                </div>
                <div className='listContainer'>
                    {loading && <LoadingOne />}
                    <div className='list-heading'>
                        <Button
                            buttonText={'Generate Qr'}
                            buttonType="primary"
                            size={'medium'}
                            onClickFunc={printQr}
                         />
                         <Button
                            buttonText={'Add New Recipe'}
                            buttonType="primary"
                            size={'medium'}
                            onClickFunc={createRecipe}
                         />
                    </div>
                    <div className='recipe-list'>
                    {recipes?.length ?
                        <ul>
                            <li className='list-header'>
                                <div style={{ paddingLeft: 35 }}>
                                <span>name</span>
                                </div>
                                <div className='tabletView'>
                                <span>description</span>
                                </div>
                                <div style={{ justifyContent: 'center'}}>
                                <span>picture</span>
                                </div>
                                <div className='action-button-header'>
                                <span></span>
                                </div>
                            </li>
                            {recipes.map(recipe =>
                                <RecipeListItem 
                                    key={recipe.id}
                                    recipe={recipe}
                                    selectRecipe={(data) => selectRecipe(data)} 
                                    deleteRecipe={(id) => deleteRecipe(id)} 
                                />
                            )}
                        </ul>
                        : <div><p>No Recipe</p></div>
                    }
                    </div>                   
                </div>
            </Container>

        </div>
    );
}

export { Home };
