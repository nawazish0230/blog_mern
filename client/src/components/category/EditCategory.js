import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { editCategory , getCategory} from '../../action/category';
import { connect } from 'react-redux';

const EditCategory = ({editCategory, getCategory, match, cat:{ category, loading } , history}) => {
    const [categoryName, setCategory] = useState({catname: ''});
    // console.log('outside', match.params.categoryId)
    
    let categoryId = match.params.categoryId;
    console.log(loading, categoryId, category)
    useEffect(() => {

        // console.log('inside', match.params.categoryId)
        getCategory(categoryId)
        // console.log(loading, categoryId, category)
        // console.log(loading || !category)
        setCategory({
            catname: category && category.catname
        })
    }, [categoryId, getCategory, loading])
    // console.log(category && category)
    console.log(categoryName)

    const { catname } = categoryName

    const onChangeHandler = e => {
        setCategory({...categoryName, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log(categoryName, {catname})
        editCategory({catname}, categoryId, history)
        setCategory({catname: ''})
    }

    return (
        <div>
            <div className="row">
            <div className="col s4 push-s4">
            <blockquote>
            <h4>Edit Category</h4>
            </blockquote>
                <form onSubmit={submitHandler} noValidate>
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="category" 
                            name="catname" 
                            type="text" 
                            value={catname}
                            className="validate" 
                            onChange={e => onChangeHandler(e)}
                        />
                        <label htmlFor="category">Enter Category</label>
                    </div>
                    <p >
                        <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Edit Category</button>
                    </p>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}

EditCategory.propTypes = {
    editCategory: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    cat: state.category
})

export default connect(mapStateToProps, {editCategory, getCategory})(EditCategory) 
