import "./App.css";
import InfiniteScroll from "react-infinite-scroller"
import {useInfiniteQuery} from "@tanstack/react-query"



async function fetchData (url){
  const productsData = await fetch(url);
  if (!productsData.ok) {
    throw new Error(`HTTP error! status: ${productsData.status}`);
  }
  const data = await productsData.json();
  return data
}

function App() {
  
const BASE_URL = import.meta.env.VITE_BASE_URL

 const {
   data = {},
   fetchNextPage,
   hasNextPage,
   isFetching,
   isLoading,
   isError,
   error,
 } = useInfiniteQuery({
   queryKey: ["cursor"],
   queryFn: ({ pageParam = BASE_URL }) => fetchData(pageParam),
   getNextPageParam: (lastPage) => lastPage.next || undefined,
 });



  return (
    
    <div className="wrapper">
      <h1>Order Details</h1>
    <div className="filters">
  <div className="sort">
    <select>
      <option value="asc">low-to-high</option>
      <option value="desc">high-to-low</option>
    </select>
  </div>
</div>


      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>Error: {error}</p>}

      {!isLoading && !isError && (
         <InfiniteScroll
         pageStart={0}
         hasMore={hasNextPage}
         loadMore={()=>{
          if(!isFetching){
            fetchNextPage()
          }
         }}
         >
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Items</th>
            </tr>
          </thead>
         
            {data.pages.map((page, index) => (
              <tbody key={index} >
                  {
                    page.results.map((el)=>{
                      return ( <tr key={el._id}>
                        <td data-cell="name" >{el.customerName}</td>
                        <td data-cell="total" >${el.orderAmount.toFixed(2)}</td>
                        <td data-cell="status" >{el.status}</td>
                        <td data-cell="date" >{new Date(el.createdAt).toLocaleString()}</td>
                        <td data-cell="items" >
                          
                            <ul>
                            {el.items.map((item) => (
                              <li key={item._id}>
                                {item.name} (Qty: {item.quantity}, ${item.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>)
                    })
                  }
              </tbody>
             
            ))}
        </table>
            </InfiniteScroll>
            
      )}
      {
        isFetching && <p>Loding....</p>
      }
    </div>
   
  );
}

export default App;
