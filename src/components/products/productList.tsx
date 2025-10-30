import {useQuery} from '@tanstack/react-query';

// --- Data Fetching and Interface ---
async function getProducts(){
    const response = await fetch(
        "https://fakestoreapi.com/products",
        {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
    )
    return response.json()
}

interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductCard = ({product}: { product: Product }) =>{

  return (
    // Card container styling
    <div className='bg-white rounded-lg shadow-md p-6 w-80'>
        
        <div className='w-full'>
            <img 
            src={product.image} 
            alt={product.title}
            className='w-full h-48 object-contain mx-auto'
            />
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <h4 className="mt-6">
              <a href="text-gray-900 font-semibold">{product.title}</a>
          </h4>
          <span className="text-green-600">${product.price.toFixed(2)}</span>
        </div>
      
      {/* Price and Button */}
  
    </div>
  );
}


// --- ProductList Component (Centering and Flex Container) ---

function ProductList(){

    const {data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    if(isLoading) return <div className="text-center p-10 text-xl font-medium">Loading...</div>
    if(error) return <div className="text-center p-10 text-xl text-red-500 font-medium">Error loading products</div>

    return (
        // Main container: Basic background and padding
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            
            {/* 1. Centered Div: max-w-7xl ensures a maximum width, and mx-auto **centers the div** horizontally. */}
            <div className="max-w-7xl mx-auto py-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Featured Products 🛍️</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {data.map((product: Product) => (
                        <ProductCard
                            key={product.id}
                            product={product as Product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList;