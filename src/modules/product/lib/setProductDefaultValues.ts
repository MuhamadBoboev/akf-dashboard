import { IProduct } from '@modules/product'
import { UpdateProductFormData } from '@modules/product/model/updateProduct/UpdateProductFormData'

export function setProductDefaultValues(product: IProduct): UpdateProductFormData {

  return {
    title: product.title,
    content: product.content,
    date: product.date,
    img: product.img,
    link_video: product.link_video,
    // quantity: product.quantity,
    // product_type_id: product.product_type?.id,
    category_id: product.category_id,
    // subcategory_id: [Number(product.subcategories)],
    // subcategory_id: product.subcategories?.id ? [product.subcategories?.id] : [],
    // collection_id: product.collection?.id ? [product.collection?.id] : [],
    // service_ids: product.excluded_services.map(({id}) => id),
    // unit: product.unit,
  }
}
