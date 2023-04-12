
class ProductDto {
    id;
    title;
    desc;

    constructor(data:any){
        this.id = data.id
        this.title = data.title
        this.desc = data.desc
    }
}

export default ProductDto