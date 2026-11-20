const onSubmitHandler = (e) =>{
e.preventDefault();
const product = e.target.productName.value


const obj = {
    'productName': product,
}

axios.post('http://localhost:3000/api/products', obj).then((result)=>{
    console.log(result.data.value)
})
}