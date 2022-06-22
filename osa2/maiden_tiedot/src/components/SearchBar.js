const SearchBar = ({search, handleSearchChange}) => {
    return ( 
        <div>
        find countries
            <input 
            value = {search}
            onChange = {handleSearchChange}
            />
        </div>
        
    )
}
 
export default SearchBar