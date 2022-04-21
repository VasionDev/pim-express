// internal import 
const Category = require("./Category")

// ******* start helper services **********

// generate category slug
const generateCategorySlug = (catName) => {
    const filterString = catName.replace(/[^a-zA-Z0-9 ]/g, '')
    return filterString.split(" ").join('-').toLowerCase()
}

// get category Ids from category array list
const getCatIdsOnly = (data=[]) => {
    const IdsArray = []
    data.forEach(list=>{
        IdsArray.push(list.id)
    })

    return IdsArray
}

// create category basic data format
const createMultipleCatMeta = (catList=[]) => {
    const metaData = []
    catList.forEach(cat => {
        metaData.push({name: cat, isChild: true, slug: generateCategorySlug(cat)})
    })
    return metaData
}

// create bulk categories
const createBulkCategories = async (data =[]) => {
    try {
        const result = await Category.insertMany(data, {populate:'subCategories'})
        return result
    }catch (err) {
        return []
    }
}

// create category data format with subCategories
const createCatMetaWithChild = async (data=[]) => {
    const metaData = []
    for(const cat of data) {
        if(cat.subCategories && cat.subCategories.length) {
            const data = await createMultipleCatMeta(cat.subCategories)
            const subCats = await createBulkCategories(data)
            metaData.push({name: cat.name, slug: generateCategorySlug(cat.name), subCategories: getCatIdsOnly(subCats)})
        }else {
            metaData.push({name: cat.name, slug: generateCategorySlug(cat.name)})
        }
    }
    return metaData
}

//******* end helper services ***********

/**
 * Create new Category
 * @param categoryData 
 * @returns Successful message or Error
 */
const add = async (categoryData) => {
    let newCategory
    const slug = generateCategorySlug(categoryData.name)
    try {
        if(categoryData.subCategories && categoryData.subCategories.length) {
            const data = await createMultipleCatMeta(categoryData.subCategories)
            const subCats = await createBulkCategories(data)
            const subIds = await getCatIdsOnly(subCats)
            newCategory = new Category({
                ...categoryData,
                slug: slug,
                subCategories: subIds
            })
        }else {
            newCategory = new Category({
                ...categoryData,
                slug: slug
            })
        }
        const createdCategory = await newCategory.save()
        await createdCategory.populate({path: 'subCategories'})
        return {data: {...createdCategory._doc}, success: 'Category added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * add bulk categories
 * @param {*} data 
 * @returns category data list or error
 */
const addMany = async (data) => {
    const catData = await createCatMetaWithChild(data)
    const result = await createBulkCategories(catData)
    if(result) {
        return {data: result, success: 'Category added successfully', status: 200}
    }else {
        return {msg: 'Something went wrong!', status: 500}
    }
}

const addSubCategory = async (parentId, cat) => {
    const parentData = await Category.findById(parentId)
    const slug = generateCategorySlug(cat.name)
    const newSubCategory = new Category({
        ...cat,
        slug: slug,
        isChild: true
    })
    const childData = await newSubCategory.save()

    await Category.findByIdAndUpdate(parentId, {
        subCategories: [...parentData.subCategories, childData.id]
    }, {new: true})

    return {data: childData, success: 'Sub Category added successfully.', status: 200}
}

/*const createCatMetaChild = (data=[]) => {
    const onlyData = []
    data.forEach(cat => {
        console.log(cat.name)
        if(cat.sub) {
            const f = createCatMeta(cat.subCategories)
            console.log(f)
            onlyData.push({name: cat.name, slug: generateCategorySlug(cat.name), subCategories: genID(f)})
        }else {
            onlyData.push({name: cat.name, slug: generateCategorySlug(cat.name)})
        }
    })
    return onlyData
}*/

/**
 * Edit/Update Category
 * @param categoryID 
 * @param categoryData 
 * @returns Updated category data or error message
 */

const edit = async (categoryID, categoryData) => {
   
    try {
        let updatedData
        const result = await Category.findOne({name: new RegExp(`^${categoryData.name}$`, 'i')})
        if(result !== null) {
            if(result.id !== categoryID) {
                throw Error(`${result.name} category is already exist`)
            }
        }
        if(categoryData.name) {
            const slug = generateCategorySlug(categoryData.name)
            updatedData = {...categoryData, slug: slug}
        }else {
            updatedData = {...categoryData}
        }
        
        const category = await Category.findByIdAndUpdate(categoryID, {
            ...updatedData
        }, {new: true}).populate('subCategories')
        

        return {data: {...category._doc}, success: 'Category updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Categories
 * @returns All Categories data
 */
const getList = async () => {
    try {
        categories = await Category.find({isChild: false}).sort({name:1})
        return {data: [...categories], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/*const createList = (data=[], idsList=[]) => {
    data.forEach(cat=> {
        if(idsList.indexOf(cat._id) === -1) {
            idsList.push(cat._id)
            if(cat.subCategories) {
                createList(cat.subCategories, idsList)
            }
        }
    })
    return idsList
}*/

/**
 * Get all Categories by category ID
 * @param categoryID 
 * @returns category data / Error message
 */
const getOne = async (categoryID, query) => {

    try {
        const category = await Category.findById(categoryID)
        if(category !== null ){
            await category.populate('subCategories')
            return {data: {...category._doc}, status: 200}
        }
        throw Error('Category not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param categoryID 
 * @returns Deleted category data or error message
*/
const deleteOne = async (categoryID) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryID)
        if(deletedCategory !== null ){
            await Category.updateMany({subCategories: categoryID}, {$pull: {subCategories: categoryID}})
            return {data: {...deletedCategory._doc}, success: `${deletedCategory.name} Team deleted successfully`, status: 200}
        }
        throw Error('Category not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    add,
    addMany,
    addSubCategory,
    edit,
    getList,
    getOne,
    deleteOne
}