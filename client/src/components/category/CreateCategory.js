import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { createCategory , getCategory} from '../../action/category';
import { connect } from 'react-redux';

const CreateCategory = ({createCategory, getCategory, match, loading, category, history}) => {
    const [categoryName, setCategory] = useState({catname: ''});

    // let categoryId = match.params.categoryId

    // useEffect(() => {
    //     // console.log(match.params.categoryId)
    //     getCategory(categoryId)
    //     setCategory({
    //         catname: loading || !category.catname ? '' : category.catname
    //     })
    // }, [loading, getCategory, categoryId])

    const { catname } = categoryName

    const onChangeHandler = e => {
        setCategory({...categoryName, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log(categoryName, {catname})
        createCategory({catname}, history)
        setCategory({catname: ''})
    }

    return (
        <div>
            <div className="row">
            <div className="col s9 push-s1 l4 push-l4">
            <blockquote>
            <h4>Add Category</h4>
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
                        <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Add Catgory</button>
                    </p>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}

CreateCategory.propTypes = {
    createCategory: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    category: state.category.category,
    loading: state.category.loading
})

export default connect(mapStateToProps, {createCategory, getCategory})(CreateCategory) 
